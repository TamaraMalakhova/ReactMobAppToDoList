import React, {useState, useEffect} from 'react';
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native';
import { AddToDo } from '../components/AddToDo';
import { ToDo } from '../components/ToDo';
import { THEME } from '../theme';

export const MainScreen = ({ addToDo, toDos, removeToDo, openToDo }) => {
    const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2);

    useEffect(()=> {
        const update = () => {
            setDeviceWidth(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2);
        }
        Dimensions.addEventListener('change', update);

        return () => {
            Dimensions.removeEventListener('change', update);
        }
    })

    let content = (
        <View style={{ width: deviceWidth }}>
            <FlatList
                keyExtractor={item => item.id}
                data={toDos}
                renderItem={({ item }) => (
                    <ToDo toDo={item} onRemove={removeToDo} onOpen={openToDo} />
                )}
            />
        </View>
    );

    if (!toDos.length) {
        content = (
            <View style={styles.imgWrap}>
                <Image style={styles.image} source={require('../../assets/no-items.png')} />
            </View>
        )
    }

    return (
        <View>
            <AddToDo onSubmit={addToDo} />
            {content}
        </View>);
}

const styles = StyleSheet.create({
    imgWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 300
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
});
import React from 'react';
import { StyleSheet, View, FlatList, Image } from 'react-native';
import { AddToDo } from '../components/AddToDo';
import { ToDo } from '../components/ToDo';

export const MainScreen = ({ addToDo, toDos, removeToDo, openToDo }) => {
    let content = (
        <FlatList
            keyExtractor={item => item.id}
            data={toDos}
            renderItem={({ item }) => (
                <ToDo toDo={item} onRemove={removeToDo} onOpen={openToDo} />
            )}
        />
    );

    if (!toDos.length) {
        content = (
            <View style={styles.imgWrap}>
                <Image style={styles.image} source={require('../../assets/no-items.png')} />
                {/* <Image
                    style={styles.image}
                    source={{
                        uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png'
                    }} /> */}
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
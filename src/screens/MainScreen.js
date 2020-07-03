import React, { useState, useEffect, useContext, useCallback } from 'react';
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native';
import { AddToDo } from '../components/AddToDo';
import { ToDo } from '../components/ToDo';
import { THEME } from '../theme';
import { ToDoContext } from '../context/toDo/toDoContext';
import { ScreenContext } from '../context/screen/screenContext';
import { AppLoader } from '../components/ui/AppLoader';
import { AppText } from '../components/ui/AppText';
import { AppButton } from '../components/ui/AppButton';

export const MainScreen = () => {
    const { addToDo, toDos, removeToDo, fetchToDos, loading, error } = useContext(ToDoContext);
    const { changeScreen } = useContext(ScreenContext);
    const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2);

    const loadToDos = useCallback(async () => await fetchToDos(), [fetchToDos]);
    useEffect(() => {
        loadToDos();
    }, [])

    useEffect(() => {
        const update = () => {
            setDeviceWidth(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2);
        }
        Dimensions.addEventListener('change', update);

        return () => {
            Dimensions.removeEventListener('change', update);
        }
    });

    if (loading) {
        return <AppLoader />
    }

    if (error) {
        return (
            <View style={styles.center}>
                <AppText style={styles.error}>{error}</AppText>
                <AppButton onPress={loadToDos}>Repeat</AppButton>
            </View>
        )
    }

    let content = (
        <View style={{ width: deviceWidth }}>
            <FlatList
                keyExtractor={item => item.id}
                data={toDos}
                renderItem={({ item }) => (
                    <ToDo toDo={item} onRemove={removeToDo} onOpen={changeScreen} />
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
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    error: {
        fontSize: 20,
        color: THEME.DANGER_COLOR
    }
});
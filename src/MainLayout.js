import React, { useContext } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Navbar } from './components/Navbar';
import { THEME } from './theme';
import { MainScreen } from './screens/MainScreen';
import { ToDoScreen } from './screens/ToDoScreen';
import { ScreenContext } from './context/screen/screenContext';

export const MainLayout = () => {
    const {toDoId} = useContext(ScreenContext);

    return (
        <View>
            <Navbar title='Todo App' />
            <View style={styles.container}>
                {toDoId ? <ToDoScreen /> : <MainScreen />}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: THEME.PADDING_HORIZONTAL,
        paddingVertical: 20
    },
});
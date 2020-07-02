import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Alert, Keyboard } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { THEME } from '../theme';

export const AddToDo = ({ onSubmit }) => {

    const [value, setValue] = useState('');

    const pressHandler = () => {
        if (value.trim()) {
            onSubmit(value);
            setValue('');
            Keyboard.dismiss();
        } else {
            Alert.alert('Title of doing should not be empty!');
        }

    }

    return (
        <View style={styles.block}>
            <TextInput
                style={styles.input}
                onChangeText={setValue}
                value={value}
                placeholder='Enter title of doing...'
                autoCorrect={false}
                autoCapitalize='none'
            />
            <Button title="Add" onPress={pressHandler} />
            {/* <AntDesign.Button onPress={pressHandler} name={'pluscircleo'}>
                Add
            </AntDesign.Button> */}
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    input: {
        width: '80%',
        padding: 10,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: THEME.MAIN_COLOR
    }
});
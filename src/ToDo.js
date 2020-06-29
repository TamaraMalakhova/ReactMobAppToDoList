import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export const ToDo = ({ toDo, onRemove }) => {

    return (
        <TouchableOpacity 
        activeOpacity={0.5} 
        onPress={() => console.log('Pressed', toDo.id)} 
        onLongPress={onRemove.bind(null, toDo.id)}>
            <View style={styles.toDo}>
                <Text>{toDo.title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    toDo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 5,
        marginBottom: 10
    }
})
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from './ui/AppText';

export const ToDo = ({ toDo, onRemove, onOpen }) => {

    return (
        <TouchableOpacity 
        activeOpacity={0.5} 
        onPress={() => onOpen(toDo.id)} 
        onLongPress={onRemove.bind(null, toDo.id)}>
            <View style={styles.toDo}>
                <AppText>{toDo.title}</AppText>
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
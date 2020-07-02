import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import {FontAwesome, AntDesign} from '@expo/vector-icons';

import { THEME } from '../theme';
import { AppCard } from '../components/ui/AppCard';
import { EditModal } from '../components/EditModal';
import { AppTextBold } from '../components/ui/AppTextBold';
import { AppButton } from '../components/ui/AppButton';

export const ToDoScreen = ({ goBack, toDo, onRemove, onSave }) => {
    const [modal, setModal] = useState(false);

    const SaveHandler = title => {
        onSave(toDo.id, title);
        setModal(false);
    }

    return (
        <View>
            <EditModal
                value={toDo.title}
                visible={modal}
                onCancel={() => setModal(false)}
                onSave={SaveHandler} />
            <AppCard style={styles.card}>
                <AppTextBold style={styles.title}>{toDo.title}</AppTextBold>
                <AppButton onPress={() => setModal(true)}>
                    {/* <FontAwesome name='edit' size={20} color='#fff' /> */}
                    Edit
                </AppButton>
            </AppCard>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <AppButton onPress={goBack} color={THEME.GREY_COLOR} >
                        Back
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton color={THEME.DANGER_COLOR} onPress={() => onRemove(toDo.id)} >
                        Delete
                        {/* <FontAwesome name='remove' size={20} color='#fff' /> */}
                    </AppButton>
                </View>
            </View>
        </View>);
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    card: {
        marginBottom: 20
    },
    button: {
        /* width: Dimensions.get('window').width / 3 */
        width: Dimensions.get('window').width > 400 ? 150 : 100
    },
    title: {
        fontSize: 20
    }
});
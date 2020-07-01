import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Navbar } from './src/components/Navbar';
import { MainScreen } from './src/screens/MainScreen';
import { ToDoScreen } from './src/screens/ToDoScreen';

export default function App() {
  const [toDoId, setToDoId] = useState(null);
  const [toDos, setToDos] = useState([]);

  const findToDoById = (id) => toDos.find(toDo => toDo.id === id);

  const addToDo = (title) => {
    setToDos((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title
      }
    ]);
  }

  const removeToDo = (id) => {
    Alert.alert(
      'Removing element',
      `Do you really want to delete "${findToDoById(id).title}" ?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setToDoId(null);
            setToDos(prev => prev.filter(toDo => toDo.id !== id));
          }
        },
      ],
      { cancelable: false }
    )
  }

  const updateToDo = (id, title) => {
    setToDos(old =>
      old.map(toDo => {
        if (toDo.id === id) {
          toDo.title = title;
        }

        return toDo;
      }));
  }

  let content = (
    <MainScreen
      toDos={toDos}
      addToDo={addToDo}
      removeToDo={removeToDo}
      openToDo={setToDoId} />
  );

  if (toDoId) {
    content = (
      <ToDoScreen
        onRemove={removeToDo}
        goBack={() => setToDoId(null)}
        toDo={findToDoById(toDoId)}
        onSave={updateToDo} />
    )
  }

  return (
    <View>
      <Navbar title='Todo App' />
      <View style={styles.container}>
        {content}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20
  },
});

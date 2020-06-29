import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { Navbar } from './src/Navbar';
import { AddToDo } from './src/AddToDo';
import { ToDo } from './src/ToDo';

export default function App() {
  const [toDos, setToDos] = useState([]);

  const addToDo = (title) => {
    setToDos((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title
      }
    ]);
  }

  const removeToDo = (id) =>{
    setToDos(prev => prev.filter(toDo => toDo.id !== id));
  }

  return (
    <View>
      <Navbar title='Todo App' />
      <View style={styles.container}>
        <AddToDo onSubmit={addToDo}/>
      </View>
      <FlatList
        keyExtractor={item => item.id}
        data={toDos}
        renderItem={({item}) => (
          <ToDo toDo={item} onRemove={removeToDo} />
        )}
      />
      {/* <ScrollView>
        {toDos.map(toDo => <ToDo toDo={toDo} key={toDo.id}/> ) }
      </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    /* flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center', */
    paddingHorizontal: 30,
    paddingVertical: 20
  },
});

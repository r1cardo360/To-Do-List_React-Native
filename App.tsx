import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  ImageBackground,
  FlatList, 
} from 'react-native';

/*-- COMPONENTES --*/
import Header from './src/components/Header';
import Content from './src/components/List';
import Input from './src/components/Input';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  // Estates
  const [listTask, setListTask] = useState<{id: number; task: string; color: string; isCompleted: boolean}[]>([]);

  /*-- SALVAR AS TAREFAS NO ASYNCSTORAGE --*/
  async function saveToStorage(tasks: {id: number; task: string; color: string; isCompleted: boolean}[]) {
    try {
      const tasksString = JSON.stringify(tasks);
      await AsyncStorage.setItem('tasks', tasksString);
    } catch (error) {
      console.error('Erro ao salvar tarefas no AsyncStorage:', error);
    }
  }

  /*-- FUNÇÃO PARA CARREGAR AS TAREFAS --*/
  async function loadFromStorage() {
    try {
      const tasksString = await AsyncStorage.getItem('tasks');
      if (tasksString) {
        const tasks = JSON.parse(tasksString);
        setListTask(tasks); 
      }
    } catch (error) {
      console.error('Erro ao carregar tarefas do AsyncStorage:', error);
    }
  }

  /*-- CARREGAR AS TAREFAS AO INICIAR O APP --*/
  useEffect(() => {
    loadFromStorage();
  }, []);

  /*-- SALVAR AS TAREFAS NO ASYNCSTORAGE SEMPRE QUE ALTERAR A LISTA --*/
  useEffect(() => {
    if (listTask.length > 0) {
      saveToStorage(listTask);
    }
  }, [listTask]);

  /*FUNÇÃO PARA ADICIONAR UMA TAREFA*/
  function handleAddTask(newTask: { id: number; task: string; color: string }) {
    setListTask((prevList) => {
      const updatedList = [{ ...newTask, isCompleted: false }, ...prevList];
      updatedList.sort((a, b) => (a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1));
      return updatedList;
    });
  }

  /*-- FUNÇÃO QUE DELETA AS TAREFAS --*/
  function handleDeleteTask(id: number) {
    setListTask((prevList) => prevList.filter(task => task.id !== id));
  }

  /*-- FUNÇÃO PARA MARCAR AS TAREFAS COMO CONCLUIDAS*/
  function handleCheckTask(id: number) {
    setListTask((prevList) => {
      const updatedList = prevList.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task 
      );
      updatedList.sort((a, b) => (a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1));
      return updatedList;
    });
  }

  /*-- CODIGO  TSX --*/
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>

      <View style={styles.boxInput}>
        <Input addTask={handleAddTask} />
      </View>

      <View style={styles.boxList}>
        <FlatList
          style={styles.list} 
          data={listTask}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <Content task={item} onCheck={handleCheckTask} onDelete={handleDeleteTask} />}
        />
      </View>
    </View>
  );
}

/*-- FOLHA DE ESTILOS --*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: '10%',
  },
  header: {
    width: '100%',
    padding: 8,
    borderBottomWidth: 0.3,
    shadowColor: '#000',
    elevation: 1,
    height: 50,
    textAlign: 'center',
  },
  boxInput: {
    width: '100%',
  },
  boxList: {
    marginTop: 30,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40%',
    borderWidth: 1,
    borderBlockColor: '#000',
    borderRadius: 15,
    paddingTop: 20,
    backgroundColor: '#ededf2',
  },
  list: {
    width: '90%',
  },
});

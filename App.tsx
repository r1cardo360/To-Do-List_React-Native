/*-- IMPORTS PADRAO --*/
import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

/*-- COMPONENTES --*/
import Header from './src/components/Header';
import Content from './src/components/List';
import Input from './src/components/Input';

/*-- IMPORT ASYNCSTORAGE --*/
import AsyncStorage from '@react-native-async-storage/async-storage';

/*-- IMPORT ROTA DA API --*/
import api from './src/Services/api';

/*-- INTERFACE DAS TASKS DA API --*/
interface ApiTask {
  id: number;
  title: string;
  completed: boolean;
}

/*-- INTERFACE PARA AS TASKS DO SISTEMA */
interface Task {
  id: number;
  task: string;
  color: string;
  isCompleted: boolean;
}

export default function App() {

  /*-- ESTADOS --*/
  const [listTask, setListTask] = useState<Task[]>([]);

  /*-- FUNÇÃO QUE SALVA AS TAREFAS NO ASYNCSTORAGE --*/
  const saveToStorage = useCallback(async (tasks: Task[]) => {
    try {
      const tasksString = JSON.stringify(tasks);
      await AsyncStorage.setItem('tasks', tasksString);
    } catch (error) {
      console.error('Erro ao salvar tarefas no AsyncStorage:', error);
    }
  }, []);

  /*-- FUNÇÃO PARA CARREGAR AS TAREFAS DO ASYNCSTORAGE --*/
  const loadFromStorage = useCallback(async () => {
    try {
      const tasksString = await AsyncStorage.getItem('tasks');
      if (tasksString) {
        setListTask(JSON.parse(tasksString));
      }
    } catch (error) {
      console.error('Erro ao carregar tarefas do AsyncStorage:', error);
    }
  }, []);

  /*-- CARREGAS AS TAREFAS AO INICIAR --*/
  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  /*-- ATUALIZA O ASYNCSTORAGE SEMPRE QUE TIVER UMA MUDANÇA NA LISTA --*/
  useEffect(() => {
    if (listTask.length > 0) {
      saveToStorage(listTask);
    }
  }, [listTask, saveToStorage]);

  /*-- FUNÇÃO QUE ORDENA AS TAREFAS --*/
  const sortTasks = (tasks: Task[]) => {
    return tasks.sort((a, b) => (a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1));
  };

  /*-- FUNÇÃO PARA ADICIONAR TAREFAS DO INPUT --*/
  const handleAddTask = (newTask: { id: number; task: string; color: string }) => {
    setListTask((prevList) => {
      const updatedList = [{ ...newTask, isCompleted: false }, ...prevList];
      return sortTasks(updatedList);
    });
  };

  /*-- FUNÇÃO PARA DELETAR AS TAREFAS --*/
  const handleDeleteTask = (id: number) => {
    setListTask((prevList) => prevList.filter(task => task.id !== id));
  };

  /*-- FUNÇÃO QUE MARCA AS TAREFAS COMO CONCLUIDAS --*/
  const handleCheckTask = (id: number) => {
    setListTask((prevList) => {
      const updatedList = prevList.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      );
      return sortTasks(updatedList);
    });
  };

  /*-- FUNÇÃO QUE CARREGA AS TAREFAS PELA API --*/
  const loadTasksFromApi = async () => {
    try {
      const response = await api.get('/todos');
      const data: ApiTask[] = response.data;

      const mappedTasks = data.map((apiTask) => ({
        id: apiTask.id,
        task: apiTask.title,
        color: 'gray',
        isCompleted: apiTask.completed,
      }));

      setListTask((prevList) => {
        const uniqueTasks = mappedTasks.filter((apiTask) =>
          !prevList.some((task) => task.id === apiTask.id)
        );

        return sortTasks([...prevList, ...uniqueTasks]);
      });
    } catch (error) {
      console.error('Erro ao carregar tarefas da API:', error);
    }
  };

  /*-- FUNÇÃO PARA ZERAR O ASYNCSTORAGE --*/
  const resetApp = async () => {
    try {
      setListTask([]);
      await AsyncStorage.removeItem('tasks');
    } catch (error) {
      console.error('Erro ao resetar o app:', error);
    }
  };

  /*-- CÓDIGO EM TSX --*/
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>

      <View style={styles.boxInput}>
        <Input addTask={handleAddTask} />
      </View>

      <View style={styles.boxButton}>
        <Button title="Carregar API" onPress={loadTasksFromApi} />
      </View>

      <View style={styles.boxButton}>
        <Button title="Zerar App" onPress={resetApp} color="red" />
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
  boxButton: {
    margin: 10,
    width: '50%',
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

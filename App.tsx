import React, {useState} from 'react';
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

export default function App() {

  //Estates
  const [listTask, setListTask] = useState<{id:number; task: string, color:string}[]>([]);

  function handleAddTask(newTask: {id:number; task:string; color:string}){
    setListTask((prevList) => [...prevList, newTask]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>

      <View style={styles.boxInput}>
        <Input addTask={handleAddTask}/>
      </View>

      <View style={styles.boxList}>
        <FlatList
          style={styles.list} 
          data={listTask}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <Content task={item}/>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent:'center',
  },
  header:{
    width:'100%',
    padding:8,
    borderBottomWidth:0.3,
    shadowColor:'#000',
    elevation:1,
    height:50,
    textAlign:'center',
  },
  boxInput:{
    width:'100%',
  },
  boxList:{
    marginTop:30,
    width:'90%',
    alignItems:'center',
    justifyContent:'center',
    height:400,
    borderWidth:1,
    borderBlockColor:'#000',
    borderRadius:15,
    paddingTop:20,
    backgroundColor:'#ededf2',
  },
  list:{
    width:'90%',
  },
});

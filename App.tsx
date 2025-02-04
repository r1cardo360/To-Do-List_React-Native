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
  const [listTask, setListTask] = useState([
    {id:1, task:'Lavar carro', status:'Urgente'},
    {id:2, task:'Retirar o Lixo', status:'Alto'},
    {id:3, task:'Lavar Louça', status:'regular'},
    {id:4, task:'Estudar', status:'regular'},
    {id:5, task:'Fazer a janta', status:'alto'},
    {id:6, task:'Fazer a janta', status:'alto'},
    {id:7, task:'Fazer a janta', status:'alto'},
    {id:8, task:'Fazer a janta', status:'alto'},
    {id:9, task:'Fazer a janta', status:'alto'},
    {id:10, task:'Fazer a janta', status:'alto'},
    {id:11, task:'Fazer a janta', status:'alto'},
    {id:12, task:'Fazer a janta', status:'alto'},
    {id:13, task:'Fazer a janta', status:'alto'},
    {id:14, task:'Fazer a janta', status:'alto'},
    {id:15, task:'Fazer a janta', status:'alto'},
    {id:16, task:'Fazer a janta', status:'alto'},
    {id:17, task:'Fazer a janta', status:'alto'},
    {id:18, task:'Fazer a janta', status:'alto'},

  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>

      <View style={styles.boxInput}>
        <Input />
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
    marginTop:40
  },
  header:{
    padding:8,
    borderBottomWidth:0.3,
    shadowColor:'#000',
    elevation:1,
    height:50,
    textAlign:'center',
  },
  boxInput:{

  },
  boxList:{
    marginTop:30,
    alignItems:'center',
    height:450,
  },
  list:{
    width:'90%',
  },
});

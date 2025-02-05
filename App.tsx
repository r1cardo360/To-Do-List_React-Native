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
    {id:1, task:'Lavar carro pela manhã não', status:'clockcircleo'},
    {id:2, task:'Retirar o Lixo', status:'clockcircleo'},
    {id:3, task:'Lavar Louça', status:'clockcircleo'},
    {id:4, task:'Estudar', status:'clockcircleo'},
    {id:5, task:'Fazer a janta', status:'clockcircleo'},
    {id:6, task:'Fazer a janta', status:'clockcircleo'},
    {id:7, task:'Fazer a janta', status:'clockcircleo'},
    {id:8, task:'Fazer a janta', status:'clockcircleo'},
    {id:9, task:'Fazer a janta', status:'clockcircleo'},
    {id:10, task:'Fazer a janta', status:'clockcircleo'},
    {id:11, task:'Fazer a janta', status:'clockcircleo'},
    {id:12, task:'Fazer a janta', status:'clockcircleo'},
    {id:13, task:'Fazer a janta', status:'clockcircleo'},
    {id:14, task:'Fazer a janta', status:'clockcircleo'},
    {id:15, task:'Fazer a janta', status:'clockcircleo'},
    {id:16, task:'Fazer a janta', status:'clockcircleo'},
    {id:17, task:'Fazer a janta', status:'clockcircleo'},
    {id:18, task:'Fazer a janta', status:'clockcircleo'},

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

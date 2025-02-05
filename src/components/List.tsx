import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";

import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/FontAwesome'

import Checkbox from 'expo-checkbox';

// Tipando as props para que o componente Content receba a task
interface ContentProps {
  task:{
    id: number;
    task: string;
    color: string;
    isCompleted:boolean
  };

  onCheck:(id:number) => void;
  onDelete:(id: number) => void;

}

export default function Content({ task, onCheck, onDelete }: ContentProps) {

  return (
    <View style={styles.boxList}>
      <View style={styles.boxButtons}>
        <TouchableOpacity onPress={() => onCheck(task.id)}>
          <Checkbox 
            value={task.isCompleted}
            onValueChange={() => onCheck(task.id)}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task.id)}>
          <Icon2 name='trash-o' size={20} color="#a50000" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.boxTextTask}>
        <Text style={[styles.textList, task.isCompleted && styles.completedText]}>{task.task}</Text>
      </View>
      <View style={styles.boxTextStatus}>
        <View style={styles.boxIcon}>
          <Text style={styles.statusList}><Icon name='clockcircleo' size={20} color="#000" style={[styles.icon, {color:task.color}]} /></Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxList: {
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingLeft:15,
    borderWidth:0.2,
    borderRadius:20,
    height:40,
    marginBottom:8,
    backgroundColor:'#cfd5e1',
  },
  boxButtons:{
    flexDirection:'row',
    width:'15%',
    justifyContent:'space-around',
    alignItems:'center',
  },
  textList:{
    fontSize:16,
    flexWrap:'wrap',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#a3d9a5',
  },
  statusList:{
    fontSize:18,
    fontWeight:'bold',
  },
  
  boxTextTask:{
    width:'65%',
    alignItems:'center',
    justifyContent:'center',
  },
  boxTextStatus:{
    width:'10%',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:50,
  },
  boxIcon:{
    backgroundColor:'#cfd5e1',
    borderRadius:50,
  },
  icon:{

  }
});

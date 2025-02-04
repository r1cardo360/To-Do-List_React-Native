import React from 'react';
import { StyleSheet, Text, View, TextInput } from "react-native";

// Tipando as props para que o componente Content receba a task
interface ContentProps {
  task:{
    id: number;
    task: string;
    status: string;
  }
}

export default function Content({ task }: ContentProps) {

  return (
    <View style={styles.boxList}>
        <Text style={styles.textList}>{task.task}</Text>
        <Text style={styles.statusList}>{task.status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  boxList: {
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingLeft:15,
    borderWidth:0.2,
    borderRadius:1,
    height:30,
  },
  textList:{
    fontSize:18,
    flexWrap:'wrap'
  },
  statusList:{
    fontSize:20,
    fontWeight:'bold',
  }
});

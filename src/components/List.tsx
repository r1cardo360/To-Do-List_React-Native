/*-- IMPORTE PADRÕES --*/
import React, { memo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

/*-- IMPORTE PARA UTILIZAR ICONES --*/
import Icon from 'react-native-vector-icons/AntDesign';
/*-- IMPORTE PARA USAR OUTRO ESTILO DE ICONES --*/
import Icon2 from 'react-native-vector-icons/FontAwesome';
/*-- IMPORTE DO CHECKBOX --*/
import Checkbox from 'expo-checkbox';

/*-- TIPANDO AS PROPS --*/
interface ContentProps {
  task: {
    id: number;
    task: string;
    color: string;
    isCompleted: boolean;
  };
  onCheck: (id: number) => void;
  onDelete: (id: number) => void;
}

/*-- UTILIZANDO A TIPAGEM DAS PROPS PARA PASSAR TASK E AS FUNCTION POR PARÂMETROS --*/
const Content: React.FC<ContentProps> = ({ task, onCheck, onDelete }) => {
  const handleCheck = () => onCheck(task.id);
  const handleDelete = () => onDelete(task.id);

  /*-- CÓDIGO EM TSX --*/
  return (
    <View style={styles.boxList}>
      <View style={styles.boxButtons}>
        <TouchableOpacity onPress={handleCheck}>
          <Checkbox value={task.isCompleted} onValueChange={handleCheck} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete}>
          <Icon2 name="trash-o" size={20} color="#a50000" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.boxTextTask}>
        <Text style={[styles.textList, task.isCompleted && styles.completedText]}>
          {task.task}
        </Text>
      </View>
      <View style={styles.boxTextStatus}>
        <View style={styles.boxIcon}>
          <Text style={styles.statusList}>
            <Icon name="clockcircleo" size={20} color={task.color} />
          </Text>
        </View>
      </View>
    </View>
  );
};

/*-- FOLHA DE ESTILO --*/
const styles = StyleSheet.create({
  boxList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    borderWidth: 0.2,
    borderRadius: 20,
    height: 40,
    marginBottom: 8,
    backgroundColor: '#cfd5e1',
  },
  boxButtons: {
    flexDirection: 'row',
    width: '15%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textList: {
    fontSize: 16,
    flexWrap: 'wrap',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#757575',
  },
  statusList: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  boxTextTask: {
    width: '65%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxTextStatus: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  boxIcon: {
    backgroundColor: '#cfd5e1',
    borderRadius: 50,
  },
  icon: {},
});

/*-- ESPORTANDO O COMPONENTE PARA USO --*/
export default memo(Content);

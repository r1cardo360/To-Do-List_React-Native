/*-- IMPORT PADRÃO */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

/*-- IMPORT DOS ICONS --*/
import Icon from 'react-native-vector-icons/FontAwesome';

/*-- IMPORT DO PICKER --*/
import {Picker} from '@react-native-picker/picker';

/*-- TIPAGEM DAS PRIORIDADES DAS TAREFAS --*/
enum TaskPriority {
  Regular = 1,
  High = 2,
  Urgent = 3,
}

interface Props {
  addTask: (task: { id: number; task: string; color: string; isCompleted: boolean }) => void;
}

export default function Input({ addTask }: Props) {
  const [inputValue, setInputValue] = useState('');
  const [iconValue, setIconValue] = useState<TaskPriority>(TaskPriority.Regular);

  /*-- DEFININDO AS CORES DO ICONE CONFORME A PRIORIDADE --*/
  const priorityColors = {
    [TaskPriority.Regular]: 'green',
    [TaskPriority.High]: 'yellow',
    [TaskPriority.Urgent]: 'red',
  };

  /*-- FUNÇÃO QUE ADICIONA UMA TAREFA E FAZ A CHECAGEM SE O INPUT É STRING VAZIA --*/
  const adicionar = () => {
    if (inputValue.trim() === '') {
      alert('Adicione alguma tarefa');
      return;
    }

    /*-- UTILIZANDO O MAPEAMENTO DAS CORES CONFORME A PRIORIDADE DA TAREFA --*/
    const newTask = {
      id: new Date().getTime(),
      task: inputValue,
      color: priorityColors[iconValue],
      isCompleted: false,
    };

    addTask(newTask);
    setInputValue('');
  };

  /*-- CÓDIGO EM TSX --*/
  return (
    <View style={styles.boxInput}>
      <View style={styles.boxInputs}>
        <TextInput
          style={styles.inputForm}
          placeholder="O que você vai fazer hoje?"
          underlineColorAndroid="transparent"
          onChangeText={setInputValue}
          value={inputValue}
        />
        <View style={[styles.inputForm, styles.boxPicker]}>
          <Picker
            selectedValue={iconValue}
            onValueChange={(itemValue) => setIconValue(itemValue as TaskPriority)}>
            <Picker.Item label="Regular" value={TaskPriority.Regular} />
            <Picker.Item label="Alto" value={TaskPriority.High} />
            <Picker.Item label="Urgente" value={TaskPriority.Urgent} />
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={styles.btn} onPress={adicionar}>
        <Text style={styles.textBtn}>ADICIONAR</Text>
        <Icon name="plus-square-o" size={25} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

/*-- FOLHA DE ESTILO --*/
const styles = StyleSheet.create({
  boxInput: {
    marginTop: 20,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxInputs: {
    width: '80%',
  },
  inputForm: {
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#cecece',
    borderRadius: 6,
    fontSize: 18,
  },
  boxPicker: {
    marginTop: 15,
  },
  btn: {
    width: 150,
    height: 50,
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 2.5,
    borderColor: '#1c571a',
    borderRadius: 12,
    backgroundColor: '#d6e0d5',
  },
  textBtn: {
    fontSize: 18,
    color: '#1c571a',
    fontWeight: 'bold',
  },
  icon: {
    color: '#1c571a',
    paddingTop: 3,
  },
});

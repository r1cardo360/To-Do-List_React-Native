import React, {useState} from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList} from 'react-native'; 

import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';

interface props{
    addTask:(task:{id:number, task:string, color:string, isCompleted:boolean}) => void;
}

export default function Input({addTask}:props){

    const [inputValue, setInptValue] = useState('');
    const [iconValue, setIconValue] = useState(1);
    const [dataApi, setDataApi] = useState([{id:Number, task:String}]);

    function adicionar(){
        
        let iconColor = '';

        if(iconValue === 1){
            iconColor = 'green';
        }else if(iconValue === 2){
            iconColor = 'yellow'; 
        }else if(iconValue === 3){
            iconColor = 'red';
        }else{
            throw new Error("Era esperado uma cor este campo não pode ser vazio ou conter um ou valor que difere do if desta condição");
        }

        if(inputValue === ''){
            alert('Adicione alguma tarefa');
        }else{
            const newTask = {
                id: new Date().getTime(),
                task: inputValue,
                color: iconColor,
                isCompleted:false,
            };
            addTask(newTask);
            setInptValue('');
        }
    }

    return(
        <View style={styles.boxInput}>

            <View style={styles.boxInputs}>
                <TextInput 
                    style={styles.inputForm}
                    placeholder='O que você vai fazer hoje ?'
                    underlineColorAndroid='transparent'
                    onChangeText={(inputValue) => setInptValue(inputValue)}
                    value={inputValue}
                />


                <View style={[styles.inputForm, styles.boxPicker]}>
                    <Picker style={styles.picker} onValueChange={(input:number) => setIconValue(input)}>
                        <Picker.Item key={1} value={1} label='regular' />
                        <Picker.Item key={2} value={2} label='Alto' />   
                        <Picker.Item key={3} value={3} label='Urgente' />       
                    </Picker>
                </View>
            </View> 

            <TouchableOpacity style={styles.btn} onPress={adicionar}>
                <Text style={styles.textBtn}>ADICIONAR</Text>
                <Icon name="plus-square-o" size={25}  style={styles.icon} />
            </TouchableOpacity>
        
        </View>
    );
}

const styles = StyleSheet.create({
    boxInput:{
        marginTop:20,
        height:200,
        alignItems:'center',
        justifyContent:'center',
    },
    boxInputs:{
        width:'80%',
    },
    inputForm:{
        borderWidth:1,
        paddingLeft:10,
        borderColor:'#cecece',
        borderRadius:6,
        fontSize:18,
    },
    boxPicker:{
        marginTop:15,
    },
    picker:{

    },
    boxBtn:{

    },
    btn:{
        width:150,
        height:50,
        flexDirection:'row',
        marginTop:15,
        alignItems:'center',
        justifyContent:'space-evenly',
        borderWidth:2.5,
        borderColor:'#1c571a',
        borderRadius:12,
        backgroundColor:'#d6e0d5'
    },
    textBtn:{
        fontSize:18,
        color:'#1c571a',
        fontWeight:'bold',
    },
    icon:{        
        color:"#1c571a",
        paddingTop:3,
    },
})

import React from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Button, LogBox} from 'react-native'; 

import Icon from 'react-native-vector-icons/FontAwesome'

export default function Input(){
    return(
        <View style={styles.boxInput}>
            <TextInput 
                style={styles.input}
            />

            <TouchableOpacity style={styles.btn}>
                <Icon name="plus-square-o" size={40} color="#fff" style={styles.icon} />
            </TouchableOpacity>
        
        </View>
    );
}

const styles = StyleSheet.create({
    boxInput:{
        marginTop:50,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
    },
    input:{
        borderWidth:1,
        paddingLeft:10,
        borderColor:'#cecece',
        width:'80%',
        borderRadius:6,
    },
    boxBtn:{

    },
    btn:{
        
    },
    icon:{
        color:'green'
    }
})

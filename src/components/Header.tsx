import React from 'react';
import { StyleSheet, Text, View, Image } from "react-native";

import Icon from 'react-native-vector-icons/Entypo'

export default function Header(){
    return(
        <View style={styles.container}>
            <Image 
                source={require('../img/Logo.png')}
            />
            <Icon name="open-book" size={40} color="#fff" style={styles.icon} />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    icon:{
        color:'#000',
    }
})

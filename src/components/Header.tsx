/*-- IMPORTES PADÕRES --*/
import React from 'react';
import { StyleSheet, Text, View, Image } from "react-native";

/*-- IMPORTE DOS ICONES --*/
import Icon from 'react-native-vector-icons/Entypo'

/*-- CÓDIGO EM TSX --*/
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

/*-- FOLHA DE ESTILO --*/
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    icon:{
        color:'#000',
    }
})

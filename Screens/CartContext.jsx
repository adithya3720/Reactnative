import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const CartContext = ({name, price, image, onPress}
) => {
  return (
    <TouchableOpacity style={StyleSheet.card} onPress={onPress}>
        <Image source={{uri:image}} style={StyleSheet.image}/>
        <View style={StyleSheet.info}>
            <Text style={StyleSheet.name}>{name}</Text>
            <Text style={StyleSheet.price}>{price}</Text>
        </View>
    </TouchableOpacity>
    
    )
}
const styles = StyleSheet.create({
    card:{
        width: '48%',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 15,
        overflow: 'hidden',
        elevation: 3,
    },
        image:{
            width: '100%',
            heigth: 140,
        },
    name:{
        fontSize: 14,
        fontWeight: 'bold',
    },
    price:{
        fontsize: 15,
        color: '#078DD3',
        marginTop: 5,
    }
}

)

export default CartContext
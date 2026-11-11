import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from './ThemeContext';

const CartContext = ({ name, price, image, onPress }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (theme) => StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: theme.card,
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.text,
  },
  price: {
    fontSize: 15,
    color: theme.primary,
    marginTop: 5,
  },
});

export default CartContext
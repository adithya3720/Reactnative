import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../Screens/ThemeContext';

function Button({ title = 'Skip Login', navigation, onPress, style, textStyle }) {
  const { theme } = useTheme();
  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }

    if (navigation) {
      navigation.navigate('BottomTab');
    }
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[styles.button, style]}
        onPress={handlePress}
        activeOpacity={0.85}
      >
        <Text style={[styles.buttonText, { color: theme.text }, textStyle]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginTop: 16,
  },
  button: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#03152a',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default Button;
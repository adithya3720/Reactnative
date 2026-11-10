import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';

const THEME_COLOR = '#078DD3';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlelogin = () => {
    if (!email.trim() || !password.trim()) {
      alert('Please Enter Your Email and Password');
      return;
    }

    navigation.navigate('BottomTab', {
      screen: 'Home',
      params: { userContact: email.trim() },
    });
  };

  return (
    <ImageBackground
      source={require('../image(3).png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safearea}>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.view}>
              <View style={styles.logoSection}>
                <Ionicons name="bag-handle" size={78} color={THEME_COLOR} />
                <Text style={styles.title}>FilmHook</Text>
                <Text style={styles.subtitle}>Market</Text>
              </View>

              <View style={styles.inputBox}>
                <Ionicons name="person-outline" size={25} color="#748196" />
                <TextInput
                  placeholder="Enter your Email"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputBox}>
                <Ionicons name="lock-closed-outline" size={25} color="#748196" />
                <TextInput
                  placeholder="Enter Your Password"
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <Button
                title="Login"
                onPress={handlelogin}
                style={styles.primaryButton}
                textStyle={styles.primaryButtonText}
              />

              <View style={styles.socialRow}>

  {/* Google */}
  <TouchableOpacity style={styles.socialButton}>
    <FontAwesome5
      name="google"
      brand
      size={26}
      color="#3d4654"
    />
  </TouchableOpacity>

  {/* Apple */}
  <TouchableOpacity style={styles.socialButton}>
    <FontAwesome5
      name="apple"
      brand
      size={29}
      color="#000000"
    />
  </TouchableOpacity>

  {/* Facebook */}
  <TouchableOpacity style={styles.socialButton}>
    <FontAwesome5
      name="facebook-f"
      brand
      size={26}
      color="#3d4045"
    />
  </TouchableOpacity>

</View>

              <Button title="Skip Login" navigation={navigation} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(245, 249, 252, 0.55)',
  },
  safearea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
  view: {
    width: '100%',
    alignItems: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    marginTop: 12,
    fontSize: 34,
    fontWeight: '700',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 20,
    color: THEME_COLOR,
    fontWeight: '600',
    letterSpacing: 1,
  },
  inputBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#0F172A',
  },
  primaryButton: {
    width: '100%',
    backgroundColor: THEME_COLOR,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 22,
    shadowColor: THEME_COLOR,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
  },
  socialButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    marginHorizontal: 9,
  },
});

export default LoginScreen;
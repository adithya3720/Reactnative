import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

const Dummyproducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getProducts = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    } catch (error) {
      setErrorMessage(
        axios.isAxiosError(error)
          ? error.message
          : 'Unable to load products. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Products</Text>
      <TouchableOpacity
        onPress={getProducts}
        style={styles.button}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Loading...' : 'Get Products'}
        </Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#078DD3" />}
      {!!errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

      {products.map((product) => (
        <View key={product.id} style={styles.product}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <View style={styles.productInfo}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F9FC',
  },
  heading: {
    marginBottom: 16,
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
  },
  button: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#078DD3',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
  },
  error: {
    marginBottom: 16,
    color: '#B42318',
    textAlign: 'center',
  },
  product: {
    flexDirection: 'row',
    marginBottom: 14,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 12,
    resizeMode: 'contain',
  },
  productInfo: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  price: {
    marginTop: 6,
    color: '#078DD3',
    fontWeight: '700',
  },
  description: {
    marginTop: 6,
    color: '#64748B',
    fontSize: 12,
  },
});

export default Dummyproducts;

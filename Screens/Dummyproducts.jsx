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
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from './ThemeContext';

const Dummyproducts = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [feedbackCounts, setFeedbackCounts] = useState({});

  const incrementFeedback = (productId, feedbackType) => {
    setFeedbackCounts((currentCounts) => ({
      ...currentCounts,
      [productId]: {
        ...(currentCounts[productId] || {}),
        [feedbackType]: (currentCounts[productId]?.[feedbackType] || 0) + 1,
      },
    }));
  };

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
            <View style={styles.feedbackRow}>
              <TouchableOpacity
                style={styles.feedbackButton}
                accessibilityRole="button"
                accessibilityLabel={`${feedbackCounts[product.id]?.likes || 0} likes`}
                onPress={() => incrementFeedback(product.id, 'likes')}
              >
                <Ionicons name="thumbs-up-outline" size={16} color="#078DD3" />
                <Text style={styles.feedbackCount}>
                  {feedbackCounts[product.id]?.likes || 0}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.feedbackButton}
                accessibilityRole="button"
                accessibilityLabel={`${feedbackCounts[product.id]?.dislikes || 0} dislikes`}
                onPress={() => incrementFeedback(product.id, 'dislikes')}
              >
                <Ionicons name="thumbs-down-outline" size={16} color="#078DD3" />
                <Text style={styles.feedbackCount}>
                  {feedbackCounts[product.id]?.dislikes || 0}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = (theme) => StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: theme.background,
  },
  heading: {
    marginBottom: 16,
    fontSize: 22,
    fontWeight: '700',
    color: theme.text,
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
    backgroundColor: theme.card,
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
    color: theme.text,
  },
  price: {
    marginTop: 6,
    color: '#078DD3',
    fontWeight: '700',
  },
  description: {
    marginTop: 6,
    color: theme.secondaryText,
    fontSize: 12,
  },
  feedbackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  feedbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  feedbackCount: {
    marginLeft: 4,
    color: theme.secondaryText,
    fontSize: 13,
    fontWeight: '600',
  },
});

export default Dummyproducts;

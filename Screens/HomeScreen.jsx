
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const THEME_COLOR = '#078DD3';

const getProducts = async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
};

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setLoadError('');

    try {
      const result = await getProducts();
      setProducts(result);
    } catch {
      setLoadError('Unable to load products. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const openProduct = (product) => {
    navigation.navigate('ProductDetails', {
      product: {
        ...product,
        name: product.title,
        price: `$${product.price}`,
        rating: product.rating?.rate,
        reviews: product.rating?.count,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.view}>
          <View style={styles.header}>
            <Text style={styles.title}>FilmHook Market</Text>
            <Text style={styles.subtitle}>Discover products you'll love</Text>
          </View>

          <View style={styles.searchRow}>
            <TextInput placeholder="Search products..." style={styles.searchbar} />
            <TouchableOpacity style={styles.micButton}>
              <Ionicons name="mic-outline" size={23} color={THEME_COLOR} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.banner}>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerSmall}>SPECIAL OFFER</Text>
              <Text style={styles.bannerTitle}>Mega Sale!</Text>
              <Text style={styles.bannerDescription}>Get up to 50% OFF</Text>
              <Text style={styles.bannerButton}>Shop Now →</Text>
            </View>

            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=500',
              }}
              style={styles.bannerImage}
            />
          </TouchableOpacity>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <Text style={styles.seeAll}>See All</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.category}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300',
                }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>Electronics</Text>
            </View>

            <View style={styles.category}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300',
                }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>Fashion</Text>
            </View>

            <View style={styles.category}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
                }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>Shoes</Text>
            </View>

            <View style={styles.category}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
                }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>Watches</Text>
            </View>

            <View style={styles.category}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300',
                }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>Beauty</Text>
            </View>
          </ScrollView>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <Text style={styles.seeAll}>See All</Text>
          </View>

          <View style={styles.productContainer}>
            {loading ? (
              <ActivityIndicator
                size="large"
                color={THEME_COLOR}
                style={styles.productsMessage}
              />
            ) : loadError ? (
              <View style={styles.productsMessage}>
                <Text style={styles.productsMessageText}>{loadError}</Text>
                <TouchableOpacity onPress={loadProducts} style={styles.retryButton}>
                  <Text style={styles.retryButtonText}>Try Again</Text>
                </TouchableOpacity>
              </View>
            ) : products.length === 0 ? (
              <Text style={styles.productsMessageText}>No products available.</Text>
            ) : (
              products.map((product) => (
                <View key={product.id} style={styles.productCard}>
                  <TouchableOpacity onPress={() => openProduct(product)}>
                    <Image
                      source={{ uri: product.image }}
                      style={styles.productImage}
                    />
                  </TouchableOpacity>

                  <View style={styles.productInfo}>
                    <TouchableOpacity onPress={() => openProduct(product)}>
                      <Text style={styles.productName}>{product.title}</Text>
                    </TouchableOpacity>
                    <Text style={styles.rating}>
                      ⭐ {product.rating?.rate} | {product.rating?.count} Reviews
                    </Text>
                    <Text style={styles.price}>${product.price}</Text>
                    <TouchableOpacity style={styles.addButton}>
                      <Text style={styles.addButtonText}>+ Add to Cart</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>

          <View style={styles.offerBox}>
            <Ionicons name="gift-outline" size={35} color={THEME_COLOR} />
            <View style={styles.offerTextWrap}>
              <Text style={styles.offerTitle}>Special Rewards!</Text>
              <Text style={styles.offerDescription}>
                Discover exclusive shopping offers.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: '#F5F9FC',
  },
  view: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 25,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 13,
    color: '#8494A7',
    marginTop: 5,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 18,
  },
  searchbar: {
    flex: 1,
    fontSize: 16,
    color: '#0F172A',
  },
  micButton: {
    marginLeft: 10,
  },
  banner: {
    height: 160,
    backgroundColor: '#087FBA',
    borderRadius: 17,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 25,
  },
  bannerContent: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  bannerSmall: {
    color: '#BDEAFF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  bannerTitle: {
    fontSize: 26,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 5,
  },
  bannerDescription: {
    fontSize: 13,
    color: '#FFFFFF',
    marginTop: 5,
  },
  bannerButton: {
    backgroundColor: '#FFFFFF',
    color: THEME_COLOR,
    fontWeight: 'bold',
    padding: 8,
    borderRadius: 7,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    marginTop: 12,
    fontSize: 12,
  },
  bannerImage: {
    width: 125,
    height: '100%',
    resizeMode: 'cover',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  seeAll: {
    color: THEME_COLOR,
    fontSize: 13,
    fontWeight: 'bold',
  },
  category: {
    alignItems: 'center',
    marginRight: 18,
    marginBottom: 15,
  },
  categoryImage: {
    width: 68,
    height: 68,
    borderRadius: 18,
  },
  categoryText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '600',
    marginTop: 8,
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productsMessage: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 24,
  },
  productsMessageText: {
    width: '100%',
    paddingVertical: 24,
    textAlign: 'center',
    color: '#64748B',
  },
  retryButton: {
    marginTop: 12,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: THEME_COLOR,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 17,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 145,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  rating: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 7,
  },
  price: {
    fontSize: 15,
    color: THEME_COLOR,
    fontWeight: 'bold',
    marginTop: 9,
  },
  oldPrice: {
    fontSize: 11,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
    fontWeight: 'normal',
  },
  addButton: {
    backgroundColor: THEME_COLOR,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  offerBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    elevation: 2,
  },
  offerTextWrap: {
    marginLeft: 12,
    flex: 1,
  },
  offerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  offerDescription: {
    fontSize: 11,
    color: '#8494A7',
    marginTop: 5,
  },
});

export default HomeScreen;

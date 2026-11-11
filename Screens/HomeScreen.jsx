
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  Alert,
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
import { CartStateContext } from './CartStateContext';
import { useWishlist } from '../Context/WishlistContext';
import { useTheme } from './ThemeContext';

const THEME_COLOR = '#078DD3';

const getProducts = async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  if (!Array.isArray(response.data)) {
    throw new Error('The products response was not a list.');
  }
  return response.data;
};

const HomeScreen = ({ navigation }) => {
  const { addToCart } = useContext(CartStateContext);
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
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

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setLoadError('');

    try {
      const result = await getProducts();
      setProducts(result);
    } catch (error) {
      setLoadError(
        error instanceof Error && error.message === 'The products response was not a list.'
          ? error.message
          : 'Unable to load products. Check your connection and try again.',
      );
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

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const openOffers = () => {
    navigation.navigate('Offers');
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

          <TouchableOpacity
            style={styles.banner}
            onPress={openOffers}
            activeOpacity={0.9}
          >
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
                  <View style={styles.productImageContainer}>
                    <TouchableOpacity onPress={() => openProduct(product)}>
                      <Image
                        source={{ uri: product.image }}
                        style={styles.productImage}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.wishlistButton}
                      onPress={() => {
                        if (isInWishlist(product.id)) {
                          removeFromWishlist(product.id);
                        } else {
                          addToWishlist(product);
                        }
                      }}
                      accessibilityRole="button"
                      accessibilityLabel={
                        isInWishlist(product.id)
                          ? 'Remove from wishlist'
                          : 'Add to wishlist'
                      }
                    >
                      <Ionicons
                        name={isInWishlist(product.id) ? 'heart' : 'heart-outline'}
                        size={22}
                        color={isInWishlist(product.id) ? '#E53935' : THEME_COLOR}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.productInfo}>
                    <TouchableOpacity onPress={() => openProduct(product)}>
                      <Text style={styles.productName}>{product.title}</Text>
                    </TouchableOpacity>
                    <Text style={styles.rating}>
                      ⭐ {product.rating?.rate} | {product.rating?.count} Reviews
                    </Text>
                    <Text style={styles.price}>${product.price}</Text>
                    <View style={styles.feedbackRow}>
                      <TouchableOpacity
                        style={styles.feedbackButton}
                        accessibilityRole="button"
                        accessibilityLabel={`${feedbackCounts[product.id]?.likes || 0} likes`}
                        onPress={() => incrementFeedback(product.id, 'likes')}
                      >
                        <Ionicons name="thumbs-up-outline" size={16} color={THEME_COLOR} />
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
                        <Ionicons name="thumbs-down-outline" size={16} color={THEME_COLOR} />
                        <Text style={styles.feedbackCount}>
                          {feedbackCounts[product.id]?.dislikes || 0}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => {
                        addToCart(product);
                        Alert.alert('Added to cart', `${product.title} was added to your cart.`);
                      }}
                    >
                      <Text style={styles.addButtonText}>+ Add to Cart</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>

          <TouchableOpacity
            style={styles.offerBox}
            onPress={openOffers}
            activeOpacity={0.8}
          >
            <Ionicons name="gift-outline" size={35} color={THEME_COLOR} />
            <View style={styles.offerTextWrap}>
              <Text style={styles.offerTitle}>Special Rewards!</Text>
              <Text style={styles.offerDescription}>
                Discover exclusive shopping offers.
              </Text>
            </View>
            

          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = (theme) => StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: theme.background,
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
    color: theme.text,
  },
  subtitle: {
    fontSize: 13,
    color: theme.secondaryText,
    marginTop: 5,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.border,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 18,
  },
  searchbar: {
    flex: 1,
    fontSize: 16,
    color: theme.text,
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
    color: theme.text,
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
    color: theme.secondaryText,
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
    color: theme.secondaryText,
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
    backgroundColor: theme.card,
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
  productImageContainer: {
    position: 'relative',
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: theme.card,
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: theme.text,
  },
  rating: {
    fontSize: 11,
    color: theme.secondaryText,
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
    color: theme.secondaryText,
    textDecorationLine: 'line-through',
    fontWeight: 'normal',
  },
  feedbackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  feedbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
  },
  feedbackCount: {
    marginLeft: 4,
    color: theme.secondaryText,
    fontSize: 12,
    fontWeight: '600',
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
    backgroundColor: theme.card,
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
    color: theme.text,
  },
  offerDescription: {
    fontSize: 11,
    color: theme.secondaryText,
    marginTop: 5,
  },
});

export default HomeScreen;

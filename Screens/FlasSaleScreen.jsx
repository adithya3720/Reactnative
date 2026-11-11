import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CartStateContext } from './CartStateContext';
import { useWishlist } from '../Context/WishlistContext';
import { useTheme } from './ThemeContext';

const THEME_COLOR = '#078DD3';
const SALE_DURATION = 6 * 60 * 60;

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return [hours, minutes, remainingSeconds]
    .map((value) => String(value).padStart(2, '0'))
    .join(':');
};

const getDiscount = (product) => 15 + (product.id % 4) * 5;

const FlashSaleScreen = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const cartContext = useContext(CartStateContext);
  if (!cartContext) {
    throw new Error('FlashSaleScreen must be rendered inside CartStateProvider.');
  }
  const { addToCart } = cartContext;
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(SALE_DURATION);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error(`Product request failed (${response.status}).`);
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('The products response was not a list.');
      }

      setProducts(data);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : 'Unable to load flash sale products.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (timeLeft === 0) {
      return undefined;
    }

    const timer = setInterval(() => {
      setTimeLeft((remaining) => Math.max(remaining - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    Alert.alert('Added to Cart', `${product.title} added successfully.`);
  };

  const renderProduct = ({ item }) => {
    const discount = getDiscount(item);
    const salePrice = item.price * (1 - discount / 100);
    const saved = isInWishlist(item.id);

    return (
      <View style={styles.productCard}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.productImage}
            resizeMode="contain"
          />
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discount}% OFF</Text>
          </View>
          <TouchableOpacity
            style={styles.heartButton}
            onPress={() => handleWishlist(item)}
            accessibilityRole="button"
            accessibilityLabel={saved ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Ionicons
              name={saved ? 'heart' : 'heart-outline'}
              size={22}
              color={saved ? '#E53935' : THEME_COLOR}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.productTitle} numberOfLines={2}>
            {item.title}
          </Text>

          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color="#F5A623" />
            <Text style={styles.ratingText}>
              {item.rating?.rate ?? 0} ({item.rating?.count ?? 0})
            </Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.salePrice}>${salePrice.toFixed(2)}</Text>
            <Text style={styles.originalPrice}>${Number(item.price).toFixed(2)}</Text>
          </View>

          <Text style={styles.offerText}>
            You save ${(item.price - salePrice).toFixed(2)}
          </Text>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddToCart(item)}
            activeOpacity={0.8}
            accessibilityRole="button"
          >
            <Ionicons name="cart-outline" size={17} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.productRow}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <View style={styles.headerCopy}>
                <Text style={styles.headerTitle}>Flash Sales</Text>
                <Text style={styles.headerSubtitle}>
                  Grab your favorites before time runs out!
                </Text>
              </View>
              <View style={styles.headerIcon}>
                <Ionicons name="flash" size={25} color="#FFFFFF" />
              </View>
            </View>

            <View style={styles.banner}>
              <View style={styles.bannerContent}>
                <Text style={styles.bannerLabel}>LIMITED TIME OFFER</Text>
                <Text style={styles.bannerTitle}>FLASH SALE!</Text>
                <Text style={styles.bannerSubtitle}>
                  Save up to 30% on selected products
                </Text>
              </View>
              <Ionicons name="pricetag" size={48} color="#FFFFFF" />
            </View>

            <View style={styles.timerCard}>
              <View style={styles.timerCopy}>
                <Text style={styles.timerTitle}>
                  <Ionicons name="time-outline" size={17} color={THEME_COLOR} /> Sale ends in
                </Text>
                <Text style={styles.timerSubtitle}>Hurry! Don&apos;t miss these deals.</Text>
              </View>
              <View style={styles.timerBox}>
                <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
              </View>
            </View>

            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Today&apos;s Deals</Text>
                <Text style={styles.sectionSubtitle}>Special prices just for you</Text>
              </View>
              <Ionicons name="flame" size={25} color="#F4511E" />
            </View>
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <View style={styles.centerContent}>
              <ActivityIndicator size="large" color={THEME_COLOR} />
              <Text style={styles.statusText}>Loading flash deals...</Text>
            </View>
          ) : error ? (
            <View style={styles.centerContent}>
              <Ionicons name="cloud-offline-outline" size={42} color={theme.secondaryText} />
              <Text style={styles.statusText}>{error}</Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={fetchProducts}
                accessibilityRole="button"
              >
                <Text style={styles.retryText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.centerContent}>
              <Text style={styles.statusText}>No flash deals available.</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

const createStyles = (theme) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.background,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 28,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  headerCopy: {
    flex: 1,
    paddingRight: 12,
  },
  headerTitle: {
    color: theme.text,
    fontSize: 26,
    fontWeight: '800',
  },
  headerSubtitle: {
    marginTop: 5,
    color: theme.secondaryText,
    fontSize: 13,
  },
  headerIcon: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: THEME_COLOR,
  },
  banner: {
    minHeight: 145,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    marginBottom: 14,
    borderRadius: 18,
    backgroundColor: '#087FBA',
  },
  bannerContent: {
    flex: 1,
    paddingRight: 10,
  },
  bannerLabel: {
    color: '#BDEAFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.3,
  },
  bannerTitle: {
    marginTop: 6,
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '900',
  },
  bannerSubtitle: {
    marginTop: 5,
    color: '#FFFFFF',
    fontSize: 12,
  },
  timerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    marginBottom: 22,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: theme.card,
  },
  timerCopy: {
    flex: 1,
    paddingRight: 8,
  },
  timerTitle: {
    color: theme.text,
    fontSize: 14,
    fontWeight: '700',
  },
  timerSubtitle: {
    marginTop: 5,
    color: theme.secondaryText,
    fontSize: 11,
  },
  timerBox: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: theme.background,
  },
  timerText: {
    color: THEME_COLOR,
    fontSize: 17,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    color: theme.text,
    fontSize: 19,
    fontWeight: '800',
  },
  sectionSubtitle: {
    marginTop: 4,
    color: theme.secondaryText,
    fontSize: 12,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    marginBottom: 14,
    overflow: 'hidden',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: theme.card,
    elevation: 2,
  },
  imageContainer: {
    height: 142,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: theme.card,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 9,
    left: 9,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#E53935',
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  heartButton: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    backgroundColor: theme.background,
  },
  productInfo: {
    padding: 11,
  },
  productTitle: {
    minHeight: 36,
    color: theme.text,
    fontSize: 12,
    fontWeight: '700',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },
  ratingText: {
    marginLeft: 4,
    color: theme.secondaryText,
    fontSize: 11,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  salePrice: {
    color: THEME_COLOR,
    fontSize: 16,
    fontWeight: '800',
  },
  originalPrice: {
    marginLeft: 6,
    color: theme.secondaryText,
    fontSize: 11,
    textDecorationLine: 'line-through',
  },
  offerText: {
    marginTop: 4,
    color: '#16A36A',
    fontSize: 11,
    fontWeight: '600',
  },
  addButton: {
    minHeight: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 9,
    backgroundColor: THEME_COLOR,
  },
  addButtonText: {
    marginLeft: 5,
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  centerContent: {
    minHeight: 180,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  statusText: {
    marginTop: 12,
    color: theme.secondaryText,
    fontSize: 14,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 14,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 9,
    backgroundColor: THEME_COLOR,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});

export default FlashSaleScreen;

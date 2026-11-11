
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useWishlist } from '../Context/WishlistContext';
import { useTheme } from './ThemeContext';

const THEME_COLOR = '#078DD3';

const formatPrice = (price) => {
  const numericPrice = Number(String(price).replace(/[^0-9.-]/g, ''));
  return Number.isFinite(numericPrice)
    ? `$${numericPrice.toFixed(2)}`
    : String(price);
};

export default function WishlistScreen({ navigation }) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const {
    wishlistItems,
    removeFromWishlist,
    isLoaded,
  } = useWishlist();

  const [feedbackCounts, setFeedbackCounts] = useState({});

  const incrementFeedback = (productId, feedbackType) => {
    setFeedbackCounts((currentCounts) => ({
      ...currentCounts,
      [productId]: {
        ...(currentCounts[productId] || {}),
        [feedbackType]:
          (currentCounts[productId]?.[feedbackType] || 0) + 1,
      },
    }));
  };

  const handleRemove = (product) => {
    removeFromWishlist(product.id);
    Alert.alert('Removed', 'Product removed from wishlist.');
  };

  if (!isLoaded) {
    return (
      <SafeAreaView style={styles.safearea}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Loading wishlist...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#101828" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Wishlist</Text>

        <Text style={styles.headerCount}>
          {wishlistItems.length}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {wishlistItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="heart-dislike-outline"
              size={56}
              color="#CBD5E1"
            />

            <Text style={styles.emptyTitle}>
              Your Wishlist is Empty
            </Text>

            <Text style={styles.emptyText}>
              Save products you love to revisit later.
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.buttonText}>
                Continue Shopping
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          wishlistItems.map((product) => (
            <View key={product.id} style={styles.itemRow}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ProductDetails', {
                    product: {
                      ...product,
                      name: product.title || product.name,
                      price: formatPrice(product.price),
                      rating: product.rating?.rate,
                      reviews: product.rating?.count,
                    },
                  })
                }
              >
                <Image
                  source={{ uri: product.image }}
                  style={styles.productImage}
                />
              </TouchableOpacity>

              <View style={styles.itemInfo}>
                <Text numberOfLines={2} style={styles.itemTitle}>
                  {product.title || product.name}
                </Text>

                <Text style={styles.itemPrice}>
                  {formatPrice(product.price)}
                </Text>

                <View style={styles.feedbackRow}>
                  <TouchableOpacity
                    style={styles.feedbackButton}
                    onPress={() =>
                      incrementFeedback(product.id, 'likes')
                    }
                  >
                    <Ionicons
                      name="thumbs-up-outline"
                      size={16}
                      color={THEME_COLOR}
                    />
                    <Text style={styles.feedbackCount}>
                      {feedbackCounts[product.id]?.likes || 0}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.feedbackButton}
                    onPress={() =>
                      incrementFeedback(product.id, 'dislikes')
                    }
                  >
                    <Ionicons
                      name="thumbs-down-outline"
                      size={16}
                      color={THEME_COLOR}
                    />
                    <Text style={styles.feedbackCount}>
                      {feedbackCounts[product.id]?.dislikes || 0}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => handleRemove(product)}
                style={styles.removeButton}
              >
                <Ionicons
                  name="heart"
                  size={23}
                  color="#E53935"
                />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme) => StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: theme.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.text,
  },
  headerCount: {
    color: THEME_COLOR,
    fontWeight: 'bold',
    fontSize: 15,
  },
  content: {
    padding: 16,
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.text,
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    color: theme.secondaryText,
    marginTop: 8,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: THEME_COLOR,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.card,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.border,
  },
  productImage: {
    width: 75,
    height: 85,
    resizeMode: 'contain',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.text,
  },
  itemPrice: {
    fontSize: 14,
    color: THEME_COLOR,
    fontWeight: '700',
    marginTop: 5,
  },
  feedbackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  feedbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  feedbackCount: {
    marginLeft: 4,
    color: theme.secondaryText,
    fontSize: 12,
    fontWeight: '600',
  },
  removeButton: {
    padding: 8,
  },
});

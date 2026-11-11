import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWishlist } from '../Context/WishlistContext';
import { Switch } from 'react-native';
import { useTheme } from './ThemeContext';

const THEME_COLOR = '#078DD3';

export default function ProductDetailScreen({ navigation, route }) {
  const { theme, isDark, toggleTheme } = useTheme();
  const styles = createStyles(theme);
  const product = route?.params?.product || {
    name: 'Premium Product',
    price: '₹1,999',
    description: 'Premium quality product designed for daily use.',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900',
  };

  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(product.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Product Details</Text>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={toggleFavorite}
          accessibilityRole="button"
          accessibilityLabel={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={22}
            color={isFavorite ? '#E53935' : THEME_COLOR}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.themeToggle, { backgroundColor: theme.card }]}>
        <Text style={[styles.themeToggleLabel, { color: theme.text }]}>
          Dark Mode
        </Text>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{ false: '#CBD5E1', true: THEME_COLOR }}
          thumbColor="#FFFFFF"
          accessibilityLabel="Toggle dark mode"
        />
      </View>

      <Image source={{ uri: product.image }} style={styles.productImage} />

      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.productName, { color: theme.text }]}>{product.name}</Text>
        <Text style={styles.productPrice}>{product.price}</Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={18} color="#F4B740" />
          <Text style={[styles.ratingText, { color: theme.secondaryText }]}>
            4.8 (1,240 reviews)
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Description</Text>
        <Text style={[styles.description, { color: theme.secondaryText }]}>
          {product.description}
        </Text>
        <TouchableOpacity
          style={styles.reviewButton}
          onPress={() => navigation.navigate('Reviews', { product })}
          accessibilityRole="button"
        >
          <Text style={styles.reviewButtonText}>View Customer Reviews</Text>
        </TouchableOpacity>

        <View style={styles.specRow}>
          <Text style={styles.specLabel}>Delivery</Text>
          <Text style={styles.specValue}>Free delivery in 2-4 days</Text>
        </View>

        <View style={styles.specRow}>
          <Text style={styles.specLabel}>Warranty</Text>
          <Text style={styles.specValue}>12 months</Text>
        </View>

        <TouchableOpacity
          style={styles.likeBtn}
          accessibilityRole="button"
          accessibilityLabel={`${like} likes`}
          onPress={() => setLike((currentLike) => currentLike + 1)}
        >
          <Ionicons name="thumbs-up-outline" size={24} color="#F4B740" />
          <Text style={styles.likeCount}>{like}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.likeBtn}
          accessibilityRole="button"
          accessibilityLabel={`${dislike} dislikes`}
          onPress={() => setDislike((currentDislike) => currentDislike + 1)}
        >
          <Ionicons name="thumbs-down-outline" size={24} color="#F4B740" />
          <Text style={styles.likeCount}>{dislike}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const createStyles = (theme) => StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: theme.background,
  },
  content: {
    padding: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  themeToggle: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.border,
  },
  themeToggleLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: theme.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.border,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: theme.text,
  },
  favoriteButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: theme.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.border,
  },
  productImage: {
    width: '100%',
    height: 260,
    borderRadius: 22,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  card: {
    backgroundColor: theme.card,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: theme.border,
  },
  productName: {
    fontSize: 26,
    fontWeight: '700',
    color: theme.text,
  },
  productPrice: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: '800',
    color: THEME_COLOR,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  ratingText: {
    marginLeft: 6,
    color: theme.secondaryText,
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    marginTop: 22,
    fontSize: 16,
    fontWeight: '700',
    color: theme.text,
  },
  description: {
    marginTop: 8,
    lineHeight: 22,
    fontSize: 14,
    color: theme.secondaryText,
  },
  reviewButton: {
    alignItems: 'center',
    marginTop: 14,
    padding: 10,
    borderRadius: 10,
    backgroundColor: THEME_COLOR,
  },
  reviewButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  specLabel: {
    fontSize: 14,
    color: theme.secondaryText,
    fontWeight: '600',
  },
  specValue: {
    fontSize: 14,
    color: theme.text,
    fontWeight: '600',
  },
  likeBtn: {
    minWidth: 48,
    height: 48,
    marginTop: 18,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    gap: 8,
    borderRadius: 14,
    backgroundColor: '#fa4a4a',
    borderWidth: 1,
    borderColor: '#0a020109',
  },
  likeCount: {
    color: theme.text,
    fontSize: 15,
    fontWeight: '700',
  },
  button: {
    marginTop: 24,
    backgroundColor: THEME_COLOR,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

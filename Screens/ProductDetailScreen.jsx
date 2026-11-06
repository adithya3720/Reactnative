import React from 'react';
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

const THEME_COLOR = '#078DD3';

export default function ProductDetailScreen({ navigation, route }) {
  const product = route?.params?.product || {
    name: 'Premium Product',
    price: '₹1,999',
    description: 'Premium quality product designed for daily use.',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900',
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.title}>Product Details</Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={22} color={THEME_COLOR} />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: product.image }} style={styles.productImage} />

      <View style={styles.card}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>{product.price}</Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={18} color="#F4B740" />
          <Text style={styles.ratingText}>4.8 (1,240 reviews)</Text>
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.specRow}>
          <Text style={styles.specLabel}>Delivery</Text>
          <Text style={styles.specValue}>Free delivery in 2-4 days</Text>
        </View>

        <View style={styles.specRow}>
          <Text style={styles.specLabel}>Warranty</Text>
          <Text style={styles.specValue}>12 months</Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#F5F9FC',
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
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  favoriteButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  productImage: {
    width: '100%',
    height: 260,
    borderRadius: 22,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  productName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0F172A',
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
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    marginTop: 22,
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  description: {
    marginTop: 8,
    lineHeight: 22,
    fontSize: 14,
    color: '#475569',
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  specLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
  specValue: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '600',
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

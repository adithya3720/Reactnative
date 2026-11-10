import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

export default function WishlistScreen({ navigation, route }) {
  const products = route?.params?.products || [];

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#101828" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wishlist</Text>
        <View style={styles.headerspacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {products.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="heart-dislike-outline" size={56} color="#CBD5E1" />
            <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
            <Text style={styles.emptyText}>Save products you love to revisit later.</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.buttonText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          products.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.itemRow}
              onPress={() => navigation.navigate('ProductDetails', { product })}
            >
              <View style={styles.itemIconWrap}>
                <Ionicons name="heart" size={20} color="#E53935" />
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{product.name}</Text>
                <Text style={styles.itemPrice}>{product.price}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#98A2B3" />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: '#F5F9FC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  headerspacer: {
    width: 24,
  },
  content: {
    padding: 20,
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#078DD3',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  itemIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#FDECEC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
  itemPrice: {
    fontSize: 13,
    color: '#078DD3',
    fontWeight: '700',
    marginTop: 4,
  },
});

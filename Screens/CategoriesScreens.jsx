import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const BLUE = '#078DD3';

const categories = [
  { id: '1', name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400' },
  { id: '2', name: 'Fashion', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400' },
  { id: '3', name: 'Home & Living', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400' },
  { id: '4', name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400' },
  { id: '5', name: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
  { id: '6', name: 'Sports', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400' },
  { id: '7', name: 'Books', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400' },
  { id: '8', name: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
];

const CategoriesScreens = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Categories</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Ionicons name="cart-outline" size={27} color={BLUE} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={22} color="#7A8799" />
          <TextInput
            placeholder="Search categories..."
            placeholderTextColor="#9AA5B1"
            style={styles.searchInput}
          />
        </View>

        <View style={styles.banner}>
          <View>
            <Text style={styles.bannerTitle}>Explore Collections</Text>
            <Text style={styles.bannerSubtitle}>Find everything you love!</Text>
          </View>
          <Ionicons name="grid-outline" size={48} color="#FFFFFF" />
        </View>

        <Text style={styles.sectionTitle}>Shop By Category</Text>

        <View style={styles.categoryGrid}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.categoryCard}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Home')}
            >
              <Image source={{ uri: item.image }} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FC',
  },
  content: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginHorizontal: 20,
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#0F172A',
  },
  banner: {
    backgroundColor: '#078DD3',
    borderRadius: 18,
    marginHorizontal: 20,
    marginTop: 18,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  bannerSubtitle: {
    color: '#D9F1FF',
    fontSize: 13,
    marginTop: 6,
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 14,
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  categoryImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
});

export default CategoriesScreens;
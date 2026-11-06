
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const THEME_COLOR = '#078DD3';

const tabs = [
  { name: 'Home', icon: 'home-outline', activeIcon: 'home' },
  { name: 'Wishlist', icon: 'heart-outline', activeIcon: 'heart' },
  { name: 'Categories', icon: 'grid-outline', activeIcon: 'grid' },
  { name: 'Cart', icon: 'cart-outline', activeIcon: 'cart' },
  { name: 'Profile', icon: 'person-outline', activeIcon: 'person' },
];

const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Home');

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);

    if (!navigation) return;

    const routeMap = {
      Home: 'HomeScreen',
      Wishlist: 'Wishlist',
      Categories: 'Categories',
      Profile: 'Profile',
    };

    const targetRoute = routeMap[tabName];
    if (targetRoute) {
      navigation.navigate(targetRoute);
    }
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
            <View style={styles.productCard}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30b?w=500',
                }}
                style={styles.productImage}
              />

              <View style={styles.productInfo}>
                <Text style={styles.productName}>Wireless Headphones</Text>
                <Text style={styles.rating}>⭐ 4.5 | 120 Reviews</Text>
                <Text style={styles.price}>
                  ₹1,499 <Text style={styles.oldPrice}>₹2,499</Text>
                </Text>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>+ Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.productCard}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
                }}
                style={styles.productImage}
              />

              <View style={styles.productInfo}>
                <Text style={styles.productName}>Smart Watch</Text>
                <Text style={styles.rating}>⭐ 4.7 | 98 Reviews</Text>
                <Text style={styles.price}>
                  ₹2,299 <Text style={styles.oldPrice}>₹3,099</Text>
                </Text>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>+ Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.productCard}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
                }}
                style={styles.productImage}
              />

              <View style={styles.productInfo}>
                <Text style={styles.productName}>Running Shoes</Text>
                <Text style={styles.rating}>⭐ 4.6 | 85 Reviews</Text>
                <Text style={styles.price}>
                  ₹1,899 <Text style={styles.oldPrice}>₹2,499</Text>
                </Text>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>+ Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.productCard}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
                }}
                style={styles.productImage}
              />

              <View style={styles.productInfo}>
                <Text style={styles.productName}>Digital Camera</Text>
                <Text style={styles.rating}>⭐ 4.8 | 75 Reviews</Text>
                <Text style={styles.price}>
                  ₹8,999 <Text style={styles.oldPrice}>₹10,999</Text>
                </Text>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>+ Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
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

          <View style={styles.bottomnav}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.name;
              return (
                <TouchableOpacity
                  key={tab.name}
                  style={styles.navItem}
                  onPress={() => handleTabPress(tab.name)}
                >
                  <Ionicons
                    name={isActive ? tab.activeIcon : tab.icon}
                    size={23}
                    color={isActive ? THEME_COLOR : '#8793A5'}
                  />
                  <Text style={[styles.navText, isActive && styles.activeNavText]}>
                    {tab.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
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
  bottomnav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  navText: {
    marginTop: 4,
    fontSize: 10,
    color: '#8793A5',
    fontWeight: '600',
  },
  activeNavText: {
    color: THEME_COLOR,
  },
});

export default HomeScreen;

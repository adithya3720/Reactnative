
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';

const THEME_COLOR = '#078DD3';

const menuItems = [
  { title: 'My Wishlist', icon: 'heart-outline' },
  { title: 'My Addresses', icon: 'location-outline' },
  { title: 'Payment Methods', icon: 'card-outline' },
  { title: 'Notifications', icon: 'notifications-outline' },
  { title: 'Help & Support', icon: 'help-circle-outline' },
  { title: 'Settings', icon: 'settings-outline' },
];

const ProfileScreen = ({ route, navigation, orders = [] }) => {
  const userContact = route?.params?.userContact || 'Not Registered';

  const processingCount = orders.filter(
    (item) => item.status === 'Processing'
  ).length;

  const shippedCount = orders.filter(
    (item) => item.status === 'Shipped'
  ).length;

  const deliveredCount = orders.filter(
    (item) => item.status === 'Delivered'
  ).length;

  const getStatusColor = (status) => {
    if (status === 'Delivered') return '#16A36A';
    if (status === 'Shipped') return '#E69A20';
    return THEME_COLOR;
  };

  const handleMenuPress = (title) => {
    if (title === 'My Wishlist') {
      navigation.navigate('Wishlist');
    } else {
      alert(title + ' screen coming soon!');
    }
  };
  const { theme, isDark, toggleTheme } = useTheme();
  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>My Profile</Text>

          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="create-outline" size={22} color={THEME_COLOR} />
          </TouchableOpacity>
        </View>

        {/* Profile Information */}
        <View style={styles.profileCard}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/200?img=12' }}
            style={styles.profileImage}
          />

          <Text style={styles.name}>Registered Email or Phone</Text>
          <Text style={styles.value}>{userContact}</Text>
        </View>

        {/* Membership */}
        <View style={styles.membership}>
          <View>
            <Text style={styles.memberTitle}>FilmHook Member</Text>
            <Text style={styles.memberSubtitle}>
              Enjoy shopping with us!
            </Text>
          </View>

          <Ionicons name="star" size={30} color="#FFD166" />
        </View>

        <View style={styles.themeCard}>
          <View style={styles.themeInfo}>
            <Text style={styles.themeTitle}>Dark Mode</Text>
            <Text style={styles.themeDescription}>
              {isDark ? 'Dark appearance is enabled' : 'Use a darker appearance'}
            </Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: '#CBD5E1', true: THEME_COLOR }}
            thumbColor="#FFFFFF"
            accessibilityLabel="Toggle dark mode"
          />
        </View>

        {/* Order Summary */}
        <View style={styles.orderHeader}>
          <Text style={styles.sectionTitle}>My Orders</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('MyOrders')}
          >
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Order Statistics */}
        <View style={styles.orderStats}>
          <View style={styles.statItem}>
            <Ionicons name="bag-check-outline" size={23} color={THEME_COLOR} />
            <Text style={styles.statNumber}>{orders.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={23} color="#E69A20" />
            <Text style={styles.statNumber}>{processingCount}</Text>
            <Text style={styles.statLabel}>Processing</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="car-outline" size={23} color="#7B61C9" />
            <Text style={styles.statNumber}>{shippedCount}</Text>
            <Text style={styles.statLabel}>Shipped</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="checkmark-circle-outline" size={23} color="#16A36A" />
            <Text style={styles.statNumber}>{deliveredCount}</Text>
            <Text style={styles.statLabel}>Delivered</Text>
          </View>
        </View>

        {/* Recent Orders */}
        <View style={styles.recentHeader}>
          <Text style={styles.sectionTitle}>Recent Purchases</Text>
          <Text style={styles.orderCount}>
            {orders.length} orders
          </Text>
        </View>

        {orders.length === 0 ? (
          <View style={styles.emptyOrders}>
            <Ionicons
              name="receipt-outline"
              size={42}
              color="#AAB8C7"
            />

            <Text style={styles.emptyTitle}>No Orders Yet</Text>

            <Text style={styles.emptyDescription}>
              Your purchased products will appear here.
            </Text>

            <TouchableOpacity
              style={styles.shopButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.shopButtonText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          orders.slice(0, 3).map((item) => (
            <View key={item.id} style={styles.orderCard}>
              <View style={styles.orderProduct}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                />

                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {item.name}
                  </Text>

                  <Text style={styles.productPrice}>
                    {item.price}
                  </Text>

                  <Text style={styles.orderId}>
                    Order #{item.orderId}
                  </Text>
                </View>
              </View>

              <View style={styles.orderFooter}>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        getStatusColor(item.status) + '18',
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: getStatusColor(item.status) },
                    ]}
                  />

                  <Text
                    style={[
                      styles.statusText,
                      { color: getStatusColor(item.status) },
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>

                <Text style={styles.orderDate}>{item.date}</Text>
              </View>
            </View>
          ))
        )}

        {/* Account Menu */}
        <Text style={styles.sectionTitle}>My Account</Text>

        <View style={styles.menuCard}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => handleMenuPress(item.title)}
            >
              <View style={styles.menuLeft}>
                <Ionicons
                  name={item.icon}
                  size={22}
                  color={THEME_COLOR}
                />

                <Text style={styles.menuText}>{item.title}</Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={18}
                color="#98A2B3"
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color="#E53935" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>FilmHook Market v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  content: {
    padding: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.text,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: theme.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.border,
  },
  profileCard: {
    backgroundColor: theme.card,
    borderRadius: 20,
    paddingVertical: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.border,
    elevation: 3,
    marginBottom: 20,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: theme.text,
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 8,
    color: theme.secondaryText,
  },
  membership: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 22,
  },
  memberTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.text,
  },
  memberSubtitle: {
    fontSize: 12,
    color: theme.secondaryText,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.text,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAll: {
    color: THEME_COLOR,
    fontSize: 13,
    fontWeight: '700',
  },
  themeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 16,
    backgroundColor: theme.card,
  },
  themeInfo: {
    flex: 1,
  },
  themeTitle: {
    color: theme.text,
    fontSize: 15,
    fontWeight: '700',
  },
  themeDescription: {
    marginTop: 4,
    color: theme.secondaryText,
    fontSize: 12,
  },
  orderStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.card,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: theme.border,
    marginBottom: 22,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
    marginTop: 7,
  },
  statLabel: {
    fontSize: 10,
    color: theme.secondaryText,
    marginTop: 4,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderCount: {
    fontSize: 12,
    color: theme.secondaryText,
  },
  orderCard: {
    backgroundColor: theme.card,
    borderRadius: 15,
    padding: 13,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.border,
  },
  orderProduct: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 75,
    height: 75,
    borderRadius: 12,
    backgroundColor: theme.background,
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
  },
  productName: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.text,
  },
  productPrice: {
    fontSize: 15,
    color: THEME_COLOR,
    fontWeight: 'bold',
    marginTop: 5,
  },
  orderId: {
    fontSize: 10,
    color: theme.secondaryText,
    marginTop: 5,
  },
  orderFooter: {
    borderTopWidth: 1,
    borderTopColor: theme.border,
    marginTop: 12,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 6,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 5,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 10,
    color: theme.secondaryText,
  },
  emptyOrders: {
    backgroundColor: theme.card,
    borderRadius: 16,
    padding: 25,
    alignItems: 'center',
    marginBottom: 22,
    borderWidth: 1,
    borderColor: theme.border,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.text,
    marginTop: 12,
  },
  emptyDescription: {
    fontSize: 12,
    color: theme.secondaryText,
    marginTop: 6,
    textAlign: 'center',
  },
  shopButton: {
    backgroundColor: THEME_COLOR,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 9,
    marginTop: 15,
  },
  shopButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  menuCard: {
    backgroundColor: theme.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.border,
    overflow: 'hidden',
    marginTop: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 15,
    color: theme.text,
    fontWeight: '600',
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.card,
    borderRadius: 14,
    paddingVertical: 14,
    marginTop: 22,
    borderWidth: 1,
    borderColor: '#F4C7C7',
  },
  logoutText: {
    marginLeft: 8,
    color: '#E53935',
    fontSize: 15,
    fontWeight: '700',
  },
  version: {
    textAlign: 'center',
    color: theme.secondaryText,
    fontSize: 12,
    marginTop: 18,
  },
});

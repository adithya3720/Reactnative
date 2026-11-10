import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const THEME_COLOR = '#078DD3';

const menuItems = [
  { title: 'My Orders', icon: 'bag-outline' },
  { title: 'My Wishlist', icon: 'heart-outline' },
  { title: 'My Addresses', icon: 'location-outline' },
  { title: 'Payment Methods', icon: 'card-outline' },
  { title: 'Notifications', icon: 'notifications-outline' },
  { title: 'Help & Support', icon: 'help-circle-outline' },
  { title: 'Settings', icon: 'settings-outline' },
];

const ProfileScreen = ({ route }) => {
  const userContact = route.params?.userContact || 'Not Registered';
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>My Profile</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="create-outline" size={22} color={THEME_COLOR} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileCard}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/200?img=12' }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>Registered Email or Phone</Text>
          <Text style={styles.value}>{userContact}</Text>
          
        </View>

        <View style={styles.membership}>
          <View>
            <Text style={styles.memberTitle}>FilmHook Member</Text>
            <Text style={styles.memberSubtitle}>Enjoy shopping with us!</Text>
          </View>
          <Ionicons name="star" size={30} color="#FFD166" />
        </View>

        <Text style={styles.sectionTitle}>My Account</Text>

        <View style={styles.menuCard}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuLeft}>
                <Ionicons name={item.icon} size={22} color={THEME_COLOR} />
                <Text style={styles.menuText}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#98A2B3" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color="#E53935" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>FilmHook Market v1.0.0</Text>
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
    color: '#0F172A',
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
  },
  email: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
    value: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 8,
    color: '#101828',
  },

  membership: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EAF7FF',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 22,
  },
  memberTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  memberSubtitle: {
    fontSize: 12,
    color: '#4B5563',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 15,
    color: '#0F172A',
    fontWeight: '600',
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
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
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 18,
  },
});

export default ProfileScreen;
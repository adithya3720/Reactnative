import React from 'react';
import {
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';

const BLUE = '#078DD3';

const coupons = [
    {
        id: '1',
        title: 'FLAT 20% OFF',
        description: 'Get 20% discount on your first order.',
        code: 'WELCOME20',
        condition: 'Minimum order ₹999',
        expiry: 'Valid until 30 November 2026',
        icon: 'gift-outline', 
        color: '#EAF6FF',
    },
    {
    id: '2',
    title: '₹300 OFF',
    description: 'Save ₹300 on selected products.',
    code: 'SAVE300',
    condition: 'Minimum order ₹1999',
    expiry: 'Valid until 25 November 2026',
    icon: 'pricetag-outline',
    color: '#F0F7FF',
  },
  {
    id: '3',
    title: 'FREE DELIVERY',
    description: 'Enjoy free delivery on your purchase.',
    code: 'FREESHIP',
    condition: 'Minimum order ₹499',
    expiry: 'Valid until 20 November 2026',
    icon: 'car-outline',
    color: '#EAF9F5',
  },
];

const OfferScreen = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.safeArea}>
        <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollcontent}>
    <View style = {styles.header}>
        <View>
            <Text style={styles.heading}>
                Offers & Coupons
            </Text>
            <Text style={styles.subheading}>
                Special deals just for you
            </Text>
        </View>
        <TouchableOpacity style={styles.headerIcon} accessibilityRole="button">
            <Ionicons name="notifications-outline" size={23} color={BLUE} />
        </TouchableOpacity>

    </View>

        {/* Promotional Banner */}
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1000',
          }}
          style={styles.banner}
          imageStyle={styles.bannerImage}
        >
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerSmall}>LIMITED TIME OFFER</Text>
            <Text style={styles.bannerTitle}>MEGA SALE</Text>
            <Text style={styles.bannerDiscount}>UP TO 50% OFF</Text>
            <Text style={styles.bannerDescription}>
              Grab your favourite products today!
            </Text>

            <TouchableOpacity style={styles.shopButton}>
              <Text style={styles.shopButtonText}>Explore Deals</Text>
              <Ionicons name="arrow-forward" size={16} color={BLUE} />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* Offer Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Ionicons name="ticket-outline" size={25} color={BLUE} />
          </View>

          <View style={styles.summaryText}>
            <Text style={styles.summaryTitle}>Exclusive Coupons</Text>
            <Text style={styles.summaryDescription}>
              Save more with special discount codes.
            </Text>
          </View>

          <Text style={styles.couponCount}>03</Text>
        </View>

        {/* Coupon Heading */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available Coupons</Text>
          <Text style={styles.viewAll}>Best deals</Text>
        </View>

        {/* Coupon Cards */}
        {coupons.map((coupon) => (
          <View key={coupon.id} style={styles.couponCard}>
            <View
              style={[
                styles.couponTop,
                { backgroundColor: coupon.color },
              ]}
            >
              <View style={styles.couponIcon}>
                <Ionicons
                  name={coupon.icon}
                  size={27}
                  color={BLUE}
                />
              </View>

              <View style={styles.couponDetails}>
                <Text style={styles.couponTitle}>{coupon.title}</Text>
                <Text style={styles.couponDescription}>
                  {coupon.description}
                </Text>
              </View>

              <Ionicons
                name="checkmark-circle"
                size={22}
                color="#16A36A"
              />
            </View>

            <View style={styles.couponBottom}>
              <Text style={styles.condition}>{coupon.condition}</Text>

              <View style={styles.codeRow}>
                <View style={styles.codeBox}>
                  <Text style={styles.codeText}>{coupon.code}</Text>
                </View>

                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={() => Share.share({ message: coupon.code })}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name="share-social-outline"
                    size={16}
                    color="#FFFFFF"
                  />
                  <Text style={styles.copyButtonText}>
                    Share Code
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.expiryRow}>
                <Ionicons
                  name="time-outline"
                  size={14}
                  color="#7B8794"
                />
                <Text style={styles.expiryText}>{coupon.expiry}</Text>
              </View>
            </View>
          </View>
        ))}

        {/* Extra Offer */}
        <View style={styles.bottomOffer}>
          <Ionicons name="wallet-outline" size={28} color={BLUE} />
          <View style={styles.bottomOfferText}>
            <Text style={styles.bottomOfferTitle}>
              More savings, more shopping!
            </Text>
            <Text style={styles.bottomOfferDescription}>
              Apply a coupon at checkout to enjoy your discount.
            </Text>
          </View>
        </View>

        <Text style={styles.footerText}>
          *Terms and conditions apply.
        </Text>

    </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = (theme) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.background,
  },
  scrollcontent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  heading: {
    color: theme.text,
    fontSize: 26,
    fontWeight: '800',
  },
  subheading: {
    color: theme.secondaryText,
    fontSize: 14,
    marginTop: 5,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.card,
  },
  banner: {
    minHeight: 220,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    borderRadius: 22,
    marginBottom: 20,
    backgroundColor: '#075985',
  },
  bannerImage: {
    borderRadius: 22,
  },
  bannerOverlay: {
    padding: 20,
    backgroundColor: 'rgba(7, 42, 67, 0.62)',
  },
  bannerSmall: {
    color: '#BDEAFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.8,
  },
  bannerTitle: {
    marginTop: 6,
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900',
  },
  bannerDiscount: {
    marginTop: 2,
    color: '#FFE082',
    fontSize: 21,
    fontWeight: '800',
  },
  bannerDescription: {
    marginTop: 6,
    color: '#F1F7FB',
    fontSize: 13,
  },
  shopButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 15,
    paddingHorizontal: 15,
    paddingVertical: 11,
    borderRadius: 11,
    backgroundColor: theme.card,
  },
  shopButtonText: {
    color: BLUE,
    fontSize: 13,
    fontWeight: '800',
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 25,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: theme.card,
  },
  summaryIcon: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: theme.background,
  },
  summaryText: {
    flex: 1,
    marginLeft: 12,
  },
  summaryTitle: {
    color: theme.text,
    fontSize: 15,
    fontWeight: '800',
  },
  summaryDescription: {
    marginTop: 4,
    color: theme.secondaryText,
    fontSize: 12,
  },
  couponCount: {
    color: BLUE,
    fontSize: 22,
    fontWeight: '900',
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
  viewAll: {
    color: BLUE,
    fontSize: 12,
    fontWeight: '700',
  },
  couponCard: {
    overflow: 'hidden',
    marginBottom: 15,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: theme.card,
    elevation: 2,
  },
  couponTop: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  couponIcon: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  couponDetails: {
    flex: 1,
    marginHorizontal: 12,
  },
  couponTitle: {
    color: theme.text,
    fontSize: 16,
    fontWeight: '900',
  },
  couponDescription: {
    marginTop: 4,
    color: theme.secondaryText,
    fontSize: 12,
    lineHeight: 17,
  },
  couponBottom: {
    padding: 15,
  },
  condition: {
    color: theme.secondaryText,
    fontSize: 12,
    fontWeight: '600',
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  codeBox: {
    flex: 1,
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: theme.border,
    borderRadius: 10,
    backgroundColor: theme.background,
  },
  codeText: {
    color: theme.text,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1.1,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginLeft: 10,
    paddingVertical: 11,
    paddingHorizontal: 13,
    borderRadius: 10,
    backgroundColor: BLUE,
  },
  copyButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  expiryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 13,
  },
  expiryText: {
    marginLeft: 6,
    color: theme.secondaryText,
    fontSize: 11,
  },
  bottomOffer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: 5,
    borderRadius: 16,
    backgroundColor: theme.card,
  },
  bottomOfferText: {
    flex: 1,
    marginLeft: 12,
  },
  bottomOfferTitle: {
    color: theme.text,
    fontSize: 14,
    fontWeight: '800',
  },
  bottomOfferDescription: {
    marginTop: 4,
    color: theme.secondaryText,
    fontSize: 12,
    lineHeight: 17,
  },
  footerText: {
    marginTop: 18,
    color: theme.secondaryText,
    fontSize: 11,
    textAlign: 'center',
  },
});

export default OfferScreen;
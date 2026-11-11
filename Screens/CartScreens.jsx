
import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CartStateContext } from './CartStateContext';
import { useTheme } from './ThemeContext';

const THEME_COLOR = '#078DD3';

const CartScreen = () => {
  const { cartItems, setCartItems } = useContext(CartStateContext);
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const updateQuantity = (id, change) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>My Cart</Text>
        <Text style={styles.itemCount}>{totalItems} Items</Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={85} color="#CBD5E1" />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyText}>
            Add products to your cart and they will appear here.
          </Text>
        </View>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
          >
            {cartItems.map((item) => (
              <View key={item.id} style={styles.productCard}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                />

                <View style={styles.productDetails}>
                  <Text numberOfLines={2} style={styles.productName}>
                    {item.title}
                  </Text>

                  <Text style={styles.price}>
                    ${Number(item.price).toFixed(2)}
                  </Text>

                  <View style={styles.bottomRow}>
                    <View style={styles.quantityBox}>
                      <TouchableOpacity
                        onPress={() => updateQuantity(item.id, -1)}
                      >
                        <Ionicons name="remove" size={18} color={THEME_COLOR} />
                      </TouchableOpacity>

                      <Text style={styles.quantity}>{item.quantity}</Text>

                      <TouchableOpacity
                        onPress={() => updateQuantity(item.id, 1)}
                      >
                        <Ionicons name="add" size={18} color={THEME_COLOR} />
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => removeItem(item.id)}>
                      <Ionicons
                        name="trash-outline"
                        size={21}
                        color="#EF4444"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Items</Text>
              <Text style={styles.summaryValue}>{totalItems}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Amount</Text>
              <Text style={styles.totalPrice}>
                ${totalPrice.toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() =>
                Alert.alert(
                  'Checkout',
                  'Your cart is ready! Payment integration can be added next.'
                )
              }
            >
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
              <Ionicons name="arrow-forward" size={19} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.card,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
  },
  itemCount: {
    color: THEME_COLOR,
    fontWeight: '600',
  },
  list: {
    padding: 16,
    paddingBottom: 20,
  },
  productCard: {
    backgroundColor: theme.card,
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    marginBottom: 14,
    elevation: 2,
  },
  productImage: {
    width: 100,
    height: 115,
    resizeMode: 'contain',
    backgroundColor: theme.card,
  },
  productDetails: {
    flex: 1,
    marginLeft: 13,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.text,
  },
  price: {
    fontSize: 17,
    fontWeight: 'bold',
    color: THEME_COLOR,
    marginTop: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  quantityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
    gap: 14,
  },
  quantity: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.text,
  },
  summary: {
    backgroundColor: theme.card,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: theme.secondaryText,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.text,
  },
  totalPrice: {
    fontSize: 19,
    fontWeight: 'bold',
    color: THEME_COLOR,
  },
  checkoutButton: {
    backgroundColor: THEME_COLOR,
    padding: 15,
    borderRadius: 10,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  checkoutText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.text,
    marginTop: 18,
  },
  emptyText: {
    fontSize: 14,
    color: theme.secondaryText,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 21,
  },
});

export default CartScreen;

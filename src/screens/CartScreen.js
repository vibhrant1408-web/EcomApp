import React from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice';
import { colors, spacing, typography } from '../utils/theme';
import CartItem from '../components/CartItem';
import EmptyState from '../components/EmptyState';

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const renderItem = ({ item }) => (
    <CartItem
      item={item}
      onRemove={handleRemove}
      onUpdateQuantity={handleUpdateQuantity}
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
        <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      // style={styles.backButton}
                    >
                      <Image
                        source={require('../assets/back.png')}
                        style={styles.backImage}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
        <Text style={styles.title}>Your Cart</Text>
        <View style={{ width: 30 }} />
      </View>
  );

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        {renderHeader()}
        <EmptyState
          title="Your Cart is Empty"
          description="Add items to your cart to see them here"
        />
      </SafeAreaView>
    );
  }

  const subtotal = total;
  const shipping = 0;
  const finalTotal = subtotal + shipping;

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.content}
        scrollEnabled={true}
      />

      <View style={styles.footer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Product price</Text>
          <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping</Text>
          <Text style={styles.shippingFree}>Freeship</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={styles.subtotalLabel}>Subtotal</Text>
          <Text style={styles.subtotalValue}>${finalTotal.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate('Checkout')}
        >
          <Text style={styles.checkoutButtonText}>Proceed to checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23262F',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md
  },
  // backButton: {
  //   fontSize: 24,
  //   color: colors.white,
  //   fontWeight: '600',
  //   width: 30,
  //   textAlign: 'center',
  // },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: spacing.xl,
  },
  footer: {
    backgroundColor: '#1A1D26',
    paddingHorizontal: spacing.lg,
    paddingVertical: 20,
    gap: spacing.md,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#E6E8EC',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
  },
  shippingFree: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
  },
  divider: {
    height: 1,
    backgroundColor: '#23262F',
    marginVertical: spacing.sm,
  },
  subtotalLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
  },
  subtotalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
  },
  backButton: {
    top: spacing.lg,
    left: spacing.lg,
  },
  backImage: {
    width: 32,
    height: 32,
  },
  checkoutButton: {
    backgroundColor: '#FCFCFD',
    paddingVertical: spacing.md,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#141416',
  }
});

export default CartScreen;

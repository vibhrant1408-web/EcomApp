import React, { FC } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../redux/actions';
import { colors, spacing, borderRadius, typography } from '../utils/theme';
import { formatPrice } from '../utils/validation';
import CartItem from '../components/CartItem';
import EmptyState from '../components/EmptyState';
import { RootState } from '../redux/store';
import { CartItem as CartItemType } from '../redux/types';

interface CartScreenProps {
  navigation: any;
}

const CartScreen: FC<CartScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);

  const handleRemove = (id: number): void => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: number, quantity: number): void => {
    if (quantity > 0) {
      dispatch(updateQuantity(id, quantity));
    }
  };

  const handleCheckout = (): void => {
    if (items.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to cart before checkout');
      return;
    }
    navigation.navigate('Checkout', { cartTotal: total, items });
  };

  const renderItem = ({ item }: { item: CartItemType }): React.ReactElement => (
    <CartItem
      item={item}
      onRemove={handleRemove}
      onUpdateQuantity={handleUpdateQuantity}
    />
  );

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyState
          title="Your Cart is Empty"
          description="Add items to your cart to see them here"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.content}
        scrollEnabled={true}
      />

      <View style={styles.footer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>{formatPrice(total)}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping</Text>
          <Text style={styles.shippingFree}>Free</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatPrice(total)}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141416',
  },
  content: {
    padding: spacing.lg,
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: '#2A2F37',
    borderTopWidth: 1,
    borderTopColor: colors.gray_300,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  summaryLabel: {
    fontSize: typography.body_md.fontSize,
    color: colors.gray_500,
  },
  summaryValue: {
    fontSize: typography.body_md.fontSize,
    fontWeight: '600' as const,
    color: colors.white,
  },
  shippingFree: {
    fontSize: typography.body_md.fontSize,
    fontWeight: '600' as const,
    color: colors.success,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray_300,
    marginVertical: spacing.md,
  },
  totalLabel: {
    fontSize: typography.h4.fontSize,
    fontWeight: '700' as const,
    color: colors.white,
  },
  totalValue: {
    fontSize: typography.h4.fontSize,
    fontWeight: '700' as const,
    color: colors.primary,
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  checkoutButtonText: {
    fontSize: typography.body_md.fontSize,
    fontWeight: '700' as const,
    color: colors.white,
  },
});

export default CartScreen;

import React, { FC } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  SafeAreaView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, setCurrentOrder } from '../redux/actions';
import { colors, spacing, borderRadius, typography } from '../utils/theme';
import { formatPrice } from '../utils/validation';
import { RootState } from '../redux/store';
import { CartItem } from '../redux/types';

interface CheckoutScreenProps {
  route: {
    params: {
      cartTotal: number;
      items: CartItem[];
    };
  };
  navigation: any;
}

const CheckoutScreen: FC<CheckoutScreenProps> = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);

  const handleGoBack = (): void => {
    navigation.goBack();
  };

  const handlePlaceOrder = (): void => {
    if (items.length === 0) {
      Alert.alert('Error', 'Your cart is empty');
      return;
    }

    const order = {
      id: Date.now().toString(),
      createdAt: new Date().toLocaleDateString(),
      items,
      total,
    };

    dispatch(setCurrentOrder(order));
    dispatch(clearCart());

    Alert.alert(
      'Order Confirmed',
      'Your order has been placed successfully!',
      [
        {
          text: 'Continue Shopping',
          onPress: () => {
            navigation.popToTop();
            navigation.navigate('Home');
          },
        },
      ]
    );
  };

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Your cart is empty</Text>
      </View>
    );
  }

  const header = (): React.ReactElement => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '75%',
        marginBottom: spacing.lg,
      }}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleGoBack}
      >
        <Image
          source={require('../assets/back.png')}
          style={styles.backImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={styles.title}>Order Summary</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {header()}
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.productSection}>
            <Text style={styles.sectionTitle}>Items ({items.length})</Text>
            {items.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                <Text style={styles.itemName} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.itemQty}>x{item.quantity}</Text>
                <Text style={styles.itemPrice}>
                  {formatPrice(item.price * item.quantity)}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          <View style={styles.summarySection}>
            <View style={styles.row}>
              <Text style={styles.label}>Subtotal</Text>
              <Text style={styles.value}>{formatPrice(total)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Shipping</Text>
              <Text style={[styles.value, styles.freeText]}>Free</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Tax (0%)</Text>
              <Text style={styles.value}>${'0.00'}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatPrice(total)}</Text>
            </View>
          </View>

          <View style={styles.addressSection}>
            <Text style={styles.sectionTitle}>Shipping Address</Text>
            <View style={styles.addressBox}>
              <Text style={styles.addressText}>Sample Address</Text>
              <Text style={styles.addressText}>123 Main St</Text>
              <Text style={styles.addressText}>City, State 12345</Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.placeOrderButton}
            onPress={handlePlaceOrder}
          >
            <Text style={styles.placeOrderText}>Place Order</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.continueShoppingButton}
            onPress={handleGoBack}
          >
            <Text style={styles.continueShoppingText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141416',
  },
  backButton: {
    padding: spacing.md,
  },
  backImage: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: typography.h3.fontSize,
    fontWeight: '700' as const,
    color: colors.white,
  },
  content: {
    padding: spacing.lg,
  },
  productSection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.body_lg.fontSize,
    fontWeight: '700' as const,
    color: colors.white,
    marginBottom: spacing.md,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray_300,
  },
  itemName: {
    flex: 1,
    fontSize: typography.body_sm.fontSize,
    color: colors.gray_400,
    marginRight: spacing.md,
  },
  itemQty: {
    fontSize: typography.body_sm.fontSize,
    color: colors.white,
    marginRight: spacing.md,
    minWidth: 40,
  },
  itemPrice: {
    fontSize: typography.body_sm.fontSize,
    fontWeight: '600' as const,
    color: colors.primary,
    textAlign: 'right' as const,
    minWidth: 60,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray_300,
    marginVertical: spacing.lg,
  },
  summarySection: {
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.body_md.fontSize,
    color: colors.gray_400,
  },
  value: {
    fontSize: typography.body_md.fontSize,
    fontWeight: '600' as const,
    color: colors.white,
  },
  freeText: {
    color: colors.success,
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
  addressSection: {
    marginTop: spacing.lg,
  },
  addressBox: {
    backgroundColor: colors.gray_200,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
  },
  addressText: {
    fontSize: typography.body_md.fontSize,
    color: colors.gray_700,
    marginBottom: spacing.xs,
  },
  buttonContainer: {
    padding: spacing.lg,
  },
  placeOrderButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  placeOrderText: {
    fontSize: typography.body_md.fontSize,
    fontWeight: '700' as const,
    color: colors.white,
  },
  continueShoppingButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  continueShoppingText: {
    fontSize: typography.body_md.fontSize,
    fontWeight: '700' as const,
    color: colors.primary,
  },
});

export default CheckoutScreen;

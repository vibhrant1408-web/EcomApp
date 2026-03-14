import React, { FC } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors, spacing, borderRadius } from '../utils/theme';
import { formatPrice } from '../utils/validation';

interface CartItemProduct {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartItemProps {
  item: CartItemProduct;
  onRemove: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

const CartItem: FC<CartItemProps> = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.image || 'https://via.placeholder.com/100' }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityLeftButton}
            onPress={() => onUpdateQuantity(item.id, item.quantity - 1)}
          >
            <Text style={styles.quantityButtonText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityRightButton}
            onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.rightContainer}>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => onRemove(item.id)}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#2A2F37',
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    alignItems: 'center',
    elevation: 6,
  },
  image: {
    width: 100,
    height: '100%',
    borderRadius: borderRadius.md,
    marginRight: spacing.md,
    backgroundColor: colors.gray_100,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  title: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: colors.white,
    marginBottom: spacing.sm,
  },
  price: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray_300,
    borderRadius: borderRadius.md,
    width: 100,
  },
  quantityLeftButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray_100,
    borderTopLeftRadius: borderRadius.md,
    borderBottomLeftRadius: borderRadius.md,
  },
  quantityRightButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray_100,
    borderTopRightRadius: borderRadius.md,
    borderBottomRightRadius: borderRadius.md,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.gray_700,
  },
  quantity: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600' as const,
    color: colors.white,
  },
  rightContainer: {
    alignItems: 'flex-end',
    marginHorizontal: spacing.md,
    alignSelf: 'center',
  },
  lineTotal: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  removeButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: colors.danger,
    borderRadius: borderRadius.sm,
  },
  removeButtonText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: colors.white,
  },
});

export default CartItem;

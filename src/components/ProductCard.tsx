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

interface ProductRating {
  rate: number;
  count: number;
}

interface ProductCardProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating?: ProductRating;
}

interface ProductCardProps {
  product: ProductCardProduct;
  onPress: () => void;
}

const ProductCard: FC<ProductCardProps> = ({ product, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image || 'https://via.placeholder.com/200' }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.category} numberOfLines={1}>
          {product.category}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          {product.rating && (
            <Text style={styles.rating}>★ {product.rating.rate}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A2F37',
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray_200,
  },
  imageContainer: {
    width: '100%',
    height: 180,
    backgroundColor: colors.gray_100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: spacing.md,
  },
  title: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: colors.white,
    marginBottom: spacing.xs,
    lineHeight: 20,
  },
  category: {
    fontSize: 12,
    fontWeight: '500' as const,
    color: colors.gray_500,
    marginBottom: spacing.sm,
    textTransform: 'capitalize' as const,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: colors.primary,
  },
  rating: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: colors.warning,
  },
});

export default ProductCard;

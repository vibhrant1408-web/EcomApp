import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../utils/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = 160;

const ProductCard = ({ product, onPress }) => {
  return (
   
    <TouchableOpacity style={{ height: 250, width: 165 }} onPress={onPress}>
        <View style={styles.card}>
        <Image
          source={{ uri: product.images?.[0] || 'https://via.placeholder.com/150' }}
          style={styles.image}
        />
        </View>
        <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {product.title}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>${product.price?.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 136,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    height: 182
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH,
    backgroundColor: colors.gray_100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    paddingVertical: spacing.md,
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FCFCFD',
    width: 136,
  },
  category: {
    fontSize: typography.body_sm.fontSize,
    color: colors.gray_500,
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FCFCFD',
  },
});

export default ProductCard;

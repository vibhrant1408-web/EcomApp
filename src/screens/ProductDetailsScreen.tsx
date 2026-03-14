import React, { FC, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions';
import { colors, spacing, borderRadius, typography } from '../utils/theme';
import { formatPrice } from '../utils/validation';
import { Product } from '../redux/types';

interface ProductDetailsScreenProps {
  route: {
    params: {
      product: Product;
    };
  };
  navigation: any;
}

const ProductDetailsScreen: FC<ProductDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState<number>(1);

  const product = route.params?.product;

  const handleIncreaseQuantity = (): void => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = (): void => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleGoBack = (): void => {
    navigation.goBack();
  };

  const handleAddToCart = (): void => {
    if (!product) {
      Alert.alert('Error', 'Product not found');
      return;
    }

    dispatch(
      addToCart({
        ...product,
        quantity,
      })
    );

    Alert.alert('Success', `${product.title} added to cart!`);
    setQuantity(1);
    navigation.goBack();
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageContainer}>
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
        <Image
          source={{
            uri: product.image || 'https://via.placeholder.com/300',
          }}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.title}>{product.title}</Text>

        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>
            ★ {product.rating?.rate || 'N/A'} ({product.rating?.count || 0}{' '}
            reviews)
          </Text>
        </View>

        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
        </View>

        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Quantity:</Text>
          <View style={styles.quantitySelector}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleDecreaseQuantity}
            >
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleIncreaseQuantity}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141416',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: colors.gray_100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: spacing.lg,
    left: spacing.lg,
    zIndex: 10,
    padding: spacing.md,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: borderRadius.lg,
  },
  backImage: {
    width: 24,
    height: 24,
  },
  productImage: {
    width: '90%',
    height: '90%',
  },
  detailsContainer: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  category: {
    fontSize: typography.body_sm.fontSize,
    fontWeight: '500' as const,
    color: colors.gray_500,
    textTransform: 'capitalize' as const,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.h3.fontSize,
    fontWeight: '700' as const,
    color: colors.white,
    marginBottom: spacing.md,
    lineHeight: 28,
  },
  ratingContainer: {
    marginBottom: spacing.md,
  },
  rating: {
    fontSize: typography.body_md.fontSize,
    color: colors.warning,
    fontWeight: '600' as const,
  },
  description: {
    fontSize: typography.body_md.fontSize,
    color: colors.gray_400,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  priceContainer: {
    marginBottom: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray_300,
  },
  price: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: colors.primary,
  },
  quantityContainer: {
    marginBottom: spacing.lg,
  },
  quantityLabel: {
    fontSize: typography.body_md.fontSize,
    fontWeight: '600' as const,
    color: colors.white,
    marginBottom: spacing.md,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray_300,
    borderRadius: borderRadius.md,
    width: 120,
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray_100,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: colors.gray_700,
  },
  quantityValue: {
    flex: 1,
    textAlign: 'center',
    fontSize: typography.body_md.fontSize,
    fontWeight: '600' as const,
    color: colors.white,
  },
  addToCartButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  addToCartText: {
    fontSize: typography.body_md.fontSize,
    fontWeight: '700' as const,
    color: colors.white,
  },
});

export default ProductDetailsScreen;

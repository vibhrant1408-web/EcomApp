import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ImageBackground
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { addToCart } from '../redux/slices/cartSlice';
import { colors, spacing, typography } from '../utils/theme';
import { productApi } from '../services/api';
import { PrimaryButton } from '../components/Button';
import Loading from '../components/Loading';

const { width } = Dimensions.get('window');

const ProductDetailsScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [descriptionExpanded, setDescriptionExpanded] = useState(true);

  const colors_array = ['#D4A574', '#000000', '#FF6B9D'];
  const sizes = ['S', 'M', 'L'];

  useEffect(() => {
    loadProduct();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Hide tab bar when screen is focused
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: 'none' },
      });
      
      return () => {
        // Show tab bar when screen is unfocused
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            backgroundColor: '#141416',
            height: 60,
            paddingBottom: 8,
          },
        });
      };
    }, [navigation])
  );

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await productApi.getProductById(productId);
      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity, selectedColor: colors_array[selectedColor], selectedSize }));
    navigation.navigate('Cart');
  };

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Product not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Image
              source={require('../assets/back.png')}
              style={styles.backImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <ImageBackground
            source={{ uri: product.images?.[0] || 'https://via.placeholder.com/300' }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.details}>
          {/* Title and Price Row */}
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{product.title}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>★★★★★ <Text style={styles.ratingCount}>(83)</Text></Text>
              </View>
            </View>
            <Text style={styles.price}>$ {product.price?.toFixed(2)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Color</Text>
            <View style={styles.colorRow}>
              {colors_array.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedColor(index)}
                  style={[
                    styles.colorCircle,
                    { backgroundColor: color },
                    selectedColor === index && styles.selectedColor,
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Size Selection */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Size</Text>
            <View style={styles.sizeRow}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  onPress={() => setSelectedSize(size)}
                  style={[
                    styles.sizeButton,
                    selectedSize === size && styles.selectedSize,
                  ]}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      selectedSize === size && styles.selectedSizeText,
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
          <View style={styles.divider} />

          {/* Description */}
          <TouchableOpacity
            onPress={() => setDescriptionExpanded(!descriptionExpanded)}
            style={styles.descriptionHeader}
          >
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.chevron}>{descriptionExpanded ? '▲' : '▼'}</Text>
          </TouchableOpacity>
            <View style={styles.divider} />
          {descriptionExpanded && (
            <View>
              <Text style={styles.description}>{product.description}</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }} onPress={handleAddToCart}>
          <Image
            source={require('../assets/bag.png')}
            style={styles.footerImage}
          />
          <Text style={styles.footerText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  content: {
    paddingBottom: spacing.xl * 3,
  },
  backButton: {
    position: 'absolute',
    top: spacing.lg,
    left: spacing.lg,
    zIndex: 10,
  },
  backText: {
    fontSize: typography.body_md.fontSize,
    fontWeight: '600',
    color: colors.primary,
  },
  imageContainer: {
    width: width,
    height: width,
    backgroundColor: '#1F1F1F',
    justifyContent: 'center',
    alignItems: 'center',
    // borderBottomWidth: 2,
    // borderBottomColor: colors.primary,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageBadge: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
  },
  details: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    backgroundColor: '#0F0F0F',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: spacing.sm,
    width: 230
  },
  ratingContainer: {
    marginBottom: spacing.md,
  },
  rating: {
    fontSize: typography.body_md.fontSize,
    color: '#508A7B',
    fontWeight: '600',
  },
  ratingCount: {
    color: '#999999',
    fontSize: typography.body_sm.fontSize,
  },
  price: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  divider: {
    height: 1,
    backgroundColor: '#333333',
    marginBottom: spacing.lg,
  },
  sectionContainer: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#B1B5C3',
    marginBottom: spacing.md,
  },
  colorRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  colorCircle: {
    width: 25,
    height: 25,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: 'transparent',
  },
  sizeRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  sizeButton: {
    width: 33,
    height: 33,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
  },
  sizeText: {
    fontSize: typography.body_md.fontSize,
    fontWeight: '600',
    color: '#999999',
  },
  selectedSize: {
    backgroundColor: colors.white,
    borderColor: colors.white,
  },
  selectedSizeText: {
    color: '#000000',
  },
  selectedColor: {
    borderColor: colors.white,
  },
  descriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  chevron: {
    fontSize: 16,
    color: colors.white,
  },
  description: {
    fontSize: typography.body_md.fontSize,
    color: '#B0B0B0',
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  readMore: {
    fontSize: typography.body_md.fontSize,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: spacing.lg,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FCFCFD',
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  footerImage: {
    width: 24,
    height: 24,
    tintColor: '#141416',
  },
  footerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#141416',
  },
  backImage: {
    width: 32,
    height: 32,
  },
});

export default ProductDetailsScreen;

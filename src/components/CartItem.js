import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../utils/theme';

// Utility function to convert hex color codes to readable color names
const hexToColorName = (hex) => {
  if (!hex) return '';
  
  const colorMap = {
    '#D4A574': 'Tan',
    '#8B4513': 'Brown',
    '#000000': 'Black',
    '#FFFFFF': 'White',
    '#FF0000': 'Red',
    '#00FF00': 'Green',
    '#0000FF': 'Blue',
    '#FFFF00': 'Yellow',
    '#FFA500': 'Orange',
    '#800080': 'Purple',
    '#FFC0CB': 'Pink',
    '#A9A9A9': 'Gray',
    '#808080': 'Dark Gray',
    '#008080': 'Teal',
    '#FFD700': 'Gold',
    '#C0C0C0': 'Silver',
  };
  
  return colorMap[hex.toUpperCase()] || hex;
};

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  console.log('CartItem render:', item);
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.images?.[0] || 'https://via.placeholder.com/100' }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>${item.price?.toFixed(2)}</Text>
        <Text style={styles.details}>
          {item.selectedSize && `Size: ${item.selectedSize}`}
          {item.selectedSize && item.selectedColor ? ' | ' : ''}
          {item.selectedColor && `Color: ${hexToColorName(item.selectedColor)}`}
        </Text>
      </View>
      
      <View style={styles.rightSection}>
        <TouchableOpacity onPress={() => onRemove(item.id)} style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </TouchableOpacity>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => onUpdateQuantity(item.id, item.quantity - 1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#141416',
    borderRadius: 20,
    paddingRight: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginRight: spacing.md,
    backgroundColor: colors.gray_300,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FCFCFD',
    marginBottom: spacing.xs,
  },
  specifications: {
    fontSize: 10,
    fontWeight: '500',
    color: '#E6E8EC',
    marginBottom: spacing.xs,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FCFCFD',
    marginBottom: spacing.xs,
  },
  details: {
    fontSize: 10,
    fontWeight: '400',
    color: '#E6E8EC',
  },
  rightSection: {
    alignItems: 'center',
    gap: spacing.md,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray_400,
    borderRadius: 20,
    paddingHorizontal: spacing.xs,
  },
  quantityButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  quantityText: {
    fontSize: typography.body_md.fontSize,
    fontWeight: '600',
    color: colors.white,
  },
  quantity: {
    textAlign: 'center',
    fontSize: typography.body_sm.fontSize,
    fontWeight: '600',
    color: colors.white,
    minWidth: 30,
  },
  checkmark: {
    width: 18.30,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#508A7B',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: spacing.sm,
  },
  checkmarkText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#141416',
  },
});

export default CartItem;

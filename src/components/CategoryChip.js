import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../utils/theme';

const CategoryChip = ({ label, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.chip, isSelected && styles.selectedChip]}
      onPress={onPress}
    >
      <Text style={[styles.text, isSelected && styles.selectedText]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray_300,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
    backgroundColor: colors.white,
    height: 32,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.gray_700,
  },
  selectedText: {
    color: colors.white,
  },
});

export default CategoryChip;

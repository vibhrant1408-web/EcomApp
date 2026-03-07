import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../utils/theme';

const PrimaryButton = ({ title, onPress, disabled = false, loading = false }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      <Text style={styles.text}>{loading ? 'Loading...' : title}</Text>
    </TouchableOpacity>
  );
};

const SecondaryButton = ({ title, onPress, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[styles.secondaryButton, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.secondaryText}>{title}</Text>
    </TouchableOpacity>
  );
};

const IconButton = ({ icon, onPress, size = 24 }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.iconButton}>
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: colors.primary_light,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    fontSize: typography.body_md.fontSize,
    fontWeight: '600',
  },
  secondaryText: {
    color: colors.primary,
    fontSize: typography.body_md.fontSize,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
  iconButton: {
    padding: spacing.sm,
  },
});

export { PrimaryButton, SecondaryButton, IconButton };

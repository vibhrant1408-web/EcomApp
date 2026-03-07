import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../utils/theme';

const SearchBar = ({ onSearch, placeholder = 'Search products...', value = '' }) => {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleSearch = () => {
    onSearch(text);
  };

  const handleClear = () => {
    setText('');
    onSearch('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.gray_400}
        value={text}
        onChangeText={setText}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
      />
      {text.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Text style={styles.clearText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray_100,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
    height: 48,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    fontSize: typography.body_md.fontSize,
    color: colors.black,
    height: '100%',
  },
  clearButton: {
    padding: spacing.sm,
  },
  clearText: {
    fontSize: 18,
    color: colors.gray_400,
    fontWeight: '600',
  },
});

export default SearchBar;

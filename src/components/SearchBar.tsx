import React, { FC, useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../utils/theme';

interface SearchBarProps {
  onSearch: (text: string) => void;
  placeholder?: string;
  value?: string;
}

const SearchBar: FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search products...',
  value = '',
}) => {
  const [text, setText] = useState<string>(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleSearch = (): void => {
    onSearch(text);
  };

  const handleClear = (): void => {
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
    backgroundColor: '#2A2F37',
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
    fontWeight: '600' as const,
  },
});

export default SearchBar;

import React, { FC, ReactNode } from 'react';
import { View, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../utils/theme';

interface TextFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  editable?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  icon?: ReactNode;
}

const TextField: FC<TextFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  editable = true,
  multiline = false,
  numberOfLines = 1,
  icon = null,
}) => {
  return (
    <View style={[styles.container, multiline && styles.containerMultiline]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <TextInput
        style={[
          styles.input,
          ...(icon ? [styles.inputWithIcon] : []),
          ...(multiline ? [styles.inputMultiline] : []),
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        editable={editable}
        multiline={multiline}
        numberOfLines={numberOfLines}
        placeholderTextColor={colors.gray_400}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.gray_200,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: '#141416',
  },
  containerMultiline: {
    alignItems: 'flex-start',
    paddingTop: spacing.md,
  },
  input: {
    flex: 1,
    fontSize: typography.body_md.fontSize,
    color: colors.white,
    padding: 0,
  },
  inputMultiline: {
    paddingTop: spacing.sm,
  },
  inputWithIcon: {
    marginLeft: spacing.md,
  },
  iconContainer: {
    marginRight: spacing.md,
  },
});

export default TextField;

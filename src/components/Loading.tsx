import React, { FC } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { colors } from '../utils/theme';

interface LoadingProps {
  size?: 'small' | 'large';
}

const Loading: FC<LoadingProps> = ({ size = 'large' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={colors.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#23262F',
  },
});

export default Loading;

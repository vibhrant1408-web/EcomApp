import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../utils/theme';
import { PrimaryButton } from '../components/Button';

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Auto-navigate after 3 seconds if user doesn't click
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.image}
        />
      </View>
        <TouchableOpacity style={styles.buttonGroup} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Get Started</Text>
          <Image
            source={require('../assets/rightArrow.png')}
            style={styles.rightArrow}
            />
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141416',
    justifyContent: 'center',
  },
  content: {
    alignSelf: 'center'
  },
  hero: {
    alignItems: 'center',
    marginTop: spacing.xl * 2,
  },
  title: {
    fontSize: typography.h1.fontSize,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: '500',
    color: colors.gray_600,
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 24,
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl * 9,
  },
  image: {
    resizeMode: 'contain',
    width: 362,
    height: 462,
    alignSelf: 'center',
    top: spacing.xl * 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666668',
  },
  rightArrow: {
    width: 15,
    height: 12,
    resizeMode: 'contain',
    alignSelf: 'center',
  }
});

export default WelcomeScreen;

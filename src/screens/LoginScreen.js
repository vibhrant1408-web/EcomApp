import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser, setAuthError } from '../redux/slices/authSlice';
import { colors, spacing, typography } from '../utils/theme';
import { PrimaryButton, SecondaryButton } from '../components/Button';
import TextField from '../components/TextField';
import { validateEmail, validatePassword } from '../utils/validation';
import { authService } from '../services/firebase';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const userData = await authService.login(email, password);
        dispatch(setUser(userData));
        setEmail('');
        setPassword('');
      } catch (error) {
        const errorMessage = error.message.replace('FirebaseError: ', '');
        setErrors({ form: errorMessage });
        dispatch(setAuthError(errorMessage));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Log into your account</Text>
        </View>

        {errors.form && <Text style={[styles.error, styles.formError]}>{errors.form}</Text>}

        <View style={styles.form}>
          <TextField
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}

          <TextField
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          {errors.password && <Text style={styles.error}>{errors.password}</Text>}
          <TouchableOpacity onPress={handleLogin} style={styles.buttonGroup}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141416',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  header: {
    marginBottom: spacing.xl * 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FCFCFD',
    lineHeight: 48,
    width: 145,
  },
  subtitle: {
    fontSize: typography.body_lg.fontSize,
    color: colors.gray_500,
  },
  form: {
    flex: 1,
  },
  error: {
    color: colors.danger,
    fontSize: typography.body_sm.fontSize,
    marginTop: -spacing.md,
    marginBottom: spacing.md,
  },
  formError: {
    marginBottom: spacing.md,
    padding: spacing.sm,
    backgroundColor: '#ffebee',
    borderRadius: 8,
    overflow: 'hidden',
    color: colors.danger,
  },
  forgotPassword: {
    color: colors.primary,
    fontSize: typography.body_md.fontSize,
    fontWeight: '600',
    textAlign: 'right',
  },
  buttonGroup: {
    alignSelf: 'center',
    backgroundColor: '#FCFCFD',
    paddingHorizontal: 35,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: spacing.xl * 2,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: typography.body_md.fontSize,
    color: '#FCFCFD',
  },
  signupLink: {
    fontSize: typography.body_md.fontSize,
    fontWeight: '600',
    color: '#FCFCFD',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#141416',
  }
});

export default LoginScreen;

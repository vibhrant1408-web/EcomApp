import React, { FC, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser, setAuthError } from '../redux/actions';
import { colors, spacing, typography } from '../utils/theme';
import { PrimaryButton } from '../components/Button';
import TextField from '../components/TextField';
import { validateEmail, validatePassword } from '../utils/validation';
import { authService } from '../services/firebase';
import { storageService } from '../utils/storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface LoginScreenProps {
  navigation: any;
}

interface FormErrors {
  email?: string;
  password?: string;
  form?: string;
}

const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleLogin = async (): Promise<void> => {
    const newErrors: FormErrors = {};

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
        await storageService.saveUser(userData);
        dispatch(setUser(userData));
        setEmail('');
        setPassword('');
      } catch (error) {
        const errorMessage = (error as Error).message.replace('FirebaseError: ', '');
        setErrors({ form: errorMessage });
        dispatch(setAuthError(errorMessage));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Log into your account</Text>
        </View>

        {errors.form && (
          <Text style={[styles.error, styles.formError]}>{errors.form}</Text>
        )}

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
          {errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.buttonGroup}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Text>
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
    fontWeight: '700' as const,
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
    fontWeight: '600' as const,
    textAlign: 'right' as const,
  },
  buttonGroup: {
    alignSelf: 'center',
    backgroundColor: '#FCFCFD',
    paddingHorizontal: 35,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: spacing.xl * 2,
  },
  buttonText: {
    fontSize: typography.body_md.fontSize,
    fontWeight: '700' as const,
    color: '#141416',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  signupText: {
    fontSize: typography.body_md.fontSize,
    color: colors.gray_500,
  },
  signupLink: {
    fontSize: typography.body_md.fontSize,
    fontWeight: '700' as const,
    color: colors.primary,
  },
});

export default LoginScreen;

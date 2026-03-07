import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/authSlice';
import authService from '../services/firebase';
import { colors, spacing, typography } from '../utils/theme';
import { PrimaryButton } from '../components/Button';
import TextField from '../components/TextField';
import { validateEmail, validatePassword } from '../utils/validation';

const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSignup = async () => {
    const newErrors = {};

    if (!name) {
      newErrors.name = 'Name is required';
    }

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

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const userData = await authService.signup(email, password, name);
        dispatch(setUser(userData));
      } catch (error) {
        setErrors({ form: error.message });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Your Account</Text>
        </View>

        {errors.form && <Text style={[styles.error, styles.formError]}>{errors.form}</Text>}

        <View style={styles.form}>
          <TextField
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />
          {errors.name && <Text style={styles.error}>{errors.name}</Text>}

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

          <TextField
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
          />
          {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}
          <TouchableOpacity onPress={handleSignup} style={styles.buttonGroup}>
            <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Log In</Text>
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
  backButton: {
    fontSize: typography.body_md.fontSize,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FCFCFD',
    lineHeight: 48,
    width: 145
  },
  subtitle: {
    fontSize: typography.body_lg.fontSize,
    color: colors.gray_500,
  },
  form: {
    flex: 1,
    top: -spacing.xl,
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
  buttonGroup: {
    backgroundColor: '#FCFCFD',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 24,
    alignSelf: 'center',
    marginTop: spacing.xl * 2,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginText: {
    fontSize: typography.body_md.fontSize,
    color: '#FCFCFD',
  },
  loginLink: {
    fontSize: typography.body_md.fontSize,
    fontWeight: '600',
    color: '#FCFCFD',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#141416',
  },
});

export default SignupScreen;

import React, { FC } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions';
import { authService } from '../services/firebase';
import { colors, spacing, typography } from '../utils/theme';
import { storageService } from '../utils/storage';
import { RootState } from '../redux/store';
import { Order } from '../redux/types';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: FC<ProfileScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { orders } = useSelector((state: RootState) => state.orders);

  const handleLogout = async (): Promise<void> => {
    try {
      await authService.logout();
      await storageService.clearUser();
      dispatch(logout());
    } catch (error) {
      console.error('Logout error:', error);
      await storageService.clearUser();
      dispatch(logout());
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.[0]?.toUpperCase()}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || 'User'}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order History</Text>
          {orders.length > 0 ? (
            orders.map((order: Order, index: number) => (
              <View key={index} style={styles.orderCard}>
                <View>
                  <Text style={styles.orderId}>Order #{order.id}</Text>
                  <Text style={styles.orderDate}>{order.createdAt}</Text>
                </View>
                <Text style={styles.orderTotal}>
                  ${order.total?.toFixed(2)}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No orders yet</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Saved Addresses</Text>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Payment Methods</Text>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Preferences</Text>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => {}}
          >
            <Text style={styles.settingsButtonText}>Account Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A2F37',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xxl,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray_300,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: colors.white,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: typography.h4.fontSize,
    fontWeight: '700' as const,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: typography.body_sm.fontSize,
    color: colors.gray_500,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.body_lg.fontSize,
    fontWeight: '700' as const,
    color: colors.white,
    marginBottom: spacing.md,
  },
  orderCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: '#141416',
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  orderId: {
    fontSize: typography.body_md.fontSize,
    fontWeight: '600' as const,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  orderDate: {
    fontSize: typography.body_sm.fontSize,
    color: colors.gray_500,
  },
  orderTotal: {
    fontSize: typography.body_md.fontSize,
    fontWeight: '700' as const,
    color: colors.primary,
  },
  emptyText: {
    fontSize: typography.body_md.fontSize,
    color: colors.gray_500,
    textAlign: 'center' as const,
    paddingVertical: spacing.lg,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: '#141416',
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  settingLabel: {
    fontSize: typography.body_md.fontSize,
    fontWeight: '500' as const,
    color: colors.white,
  },
  settingArrow: {
    fontSize: 24,
    color: colors.gray_500,
  },
  buttonGroup: {
    marginTop: spacing.xl,
  },
  settingsButton: {
    backgroundColor: colors.secondary,
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  settingsButtonText: {
    fontSize: typography.body_md.fontSize,
    fontWeight: '700' as const,
    color: colors.white,
  },
  logoutButton: {
    backgroundColor: colors.danger,
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: typography.body_md.fontSize,
    fontWeight: '700' as const,
    color: colors.white,
  },
});

export default ProfileScreen;

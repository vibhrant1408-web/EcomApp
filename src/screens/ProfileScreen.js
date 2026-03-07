import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import authService from '../services/firebase';
import { colors, spacing, typography } from '../utils/theme';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.orders);

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
    } catch (error) {
      console.error('Logout error:', error);
      // Still dispatch logout even if Firebase logout fails
      dispatch(logout());
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.[0]?.toUpperCase()}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || 'User'}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order History</Text>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <View key={index} style={styles.orderCard}>
                <View>
                  <Text style={styles.orderId}>Order #{order.id}</Text>
                  <Text style={styles.orderDate}>{order.date}</Text>
                </View>
                <Text style={styles.orderTotal}>${order.total?.toFixed(2)}</Text>
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
    paddingVertical: spacing.xl,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141416',
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: typography.h3.fontSize,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  userEmail: {
    fontSize: typography.body_sm.fontSize,
    color: '#E6E8EC',
    marginTop: spacing.xs,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.h4.fontSize,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: spacing.md,
  },
  orderCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  orderId: {
    fontSize: typography.body_md.fontSize,
    fontWeight: '600',
    color: colors.black,
  },
  orderDate: {
    fontSize: typography.body_sm.fontSize,
    color: colors.gray_500,
    marginTop: spacing.xs,
  },
  orderTotal: {
    fontSize: typography.body_lg.fontSize,
    fontWeight: '700',
    color: colors.primary,
  },
  emptyText: {
    fontSize: typography.body_md.fontSize,
    color: colors.gray_400,
    textAlign: 'center',
    paddingVertical: spacing.lg,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#141416',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  settingLabel: {
    fontSize: typography.body_md.fontSize,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  settingArrow: {
    fontSize: 20,
    color: colors.gray_400,
  },
  buttonGroup: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  settingsButton: {
    backgroundColor: '#141416',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: 12,
    alignItems: 'center',
  },
  settingsButtonText: {
    fontSize: typography.body_lg.fontSize,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  logoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: typography.body_lg.fontSize,
    fontWeight: '700',
    color: '#141416',
  },
});

export default ProfileScreen;

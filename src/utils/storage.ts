import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserData {
  id: string;
  email: string;
  name: string;
}

const USER_KEY = '@ecomapp_user';

export const storageService = {
  // Save user data to AsyncStorage
  saveUser: async (userData: UserData): Promise<boolean> => {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Error saving user:', error);
      return false;
    }
  },

  // Retrieve user data from AsyncStorage
  getUser: async (): Promise<UserData | null> => {
    try {
      const userData = await AsyncStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error retrieving user:', error);
      return null;
    }
  },

  // Clear user data from AsyncStorage
  clearUser: async (): Promise<boolean> => {
    try {
      await AsyncStorage.removeItem(USER_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing user:', error);
      return false;
    }
  },

  // Check if user exists in AsyncStorage
  hasUser: async (): Promise<boolean> => {
    try {
      const userData = await AsyncStorage.getItem(USER_KEY);
      return userData !== null;
    } catch (error) {
      console.error('Error checking user:', error);
      return false;
    }
  },
};

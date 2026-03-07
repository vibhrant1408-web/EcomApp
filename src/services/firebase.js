import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

// Firebase initializes automatically on React Native using google-services.json
// No manual configuration needed - the native SDK handles it

export const firebaseAuth = auth();

export const authService = {
  signup: async (email, password, displayName) => {
    try {
      const userCredential = await firebaseAuth.createUserWithEmailAndPassword(email, password);
      await userCredential.user.updateProfile({
        displayName,
      });
      return {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        name: displayName,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  login: async (email, password) => {
    try {
      const userCredential = await firebaseAuth.signInWithEmailAndPassword(email, password);
      return {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        name: userCredential.user.displayName || email.split('@')[0],
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  logout: async () => {
    try {
      await firebaseAuth.signOut();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getCurrentUser: () => {
    const currentUser = firebaseAuth.currentUser;
    if (currentUser) {
      return {
        id: currentUser.uid,
        email: currentUser.email,
        name: currentUser.displayName || currentUser.email.split('@')[0],
      };
    }
    return null;
  },

  onAuthStateChanged: (callback) => {
    return firebaseAuth.onAuthStateChanged(callback);
  },
};

export default authService;

import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

// Firebase initializes automatically on React Native using google-services.json
// No manual configuration needed - the native SDK handles it

export const firebaseAuth = auth();

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export const authService = {
  signup: async (
    email: string,
    password: string,
    displayName: string
  ): Promise<AuthUser> => {
    try {
      const userCredential = await firebaseAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await userCredential.user?.updateProfile({
        displayName,
      });
      return {
        id: userCredential.user!.uid,
        email: userCredential.user!.email!,
        name: displayName,
      };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },

  login: async (email: string, password: string): Promise<AuthUser> => {
    try {
      const userCredential = await firebaseAuth.signInWithEmailAndPassword(email, password);
      return {
        id: userCredential.user!.uid,
        email: userCredential.user!.email!,
        name: userCredential.user!.displayName || email.split('@')[0],
      };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },

  logout: async (): Promise<void> => {
    try {
      await firebaseAuth.signOut();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },

  getCurrentUser: (): AuthUser | null => {
    const currentUser = firebaseAuth.currentUser;
    if (currentUser) {
      return {
        id: currentUser.uid,
        email: currentUser.email!,
        name: currentUser.displayName || currentUser.email!.split('@')[0],
      };
    }
    return null;
  },

  onAuthStateChanged: (
    callback: (user: AuthUser | null) => void
  ): (() => void) => {
    return firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        callback({
          id: user.uid,
          email: user.email!,
          name: user.displayName || user.email!.split('@')[0],
        });
      } else {
        callback(null);
      }
    });
  },
};

export default authService;

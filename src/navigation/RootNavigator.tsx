import React, { FC, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setAuthLoading } from '../redux/actions';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { storageService } from '../utils/storage';
import { RootState } from '../redux/store';
import { User } from '../redux/types';

const RootNavigator: FC = () => {
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    checkStoredUser();
  }, []);

  const checkStoredUser = async (): Promise<void> => {
    try {
      const savedUser = await storageService.getUser();
      if (savedUser) {
        dispatch(setUser(savedUser as User));
      }
    } catch (error) {
      console.error('Error checking stored user:', error);
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  // Show nothing while checking for stored user
  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;

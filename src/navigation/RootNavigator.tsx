import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { usePreferencesStore } from '../store/usePreferencesStore';
import { RootStackParamList } from './types';
import MainTabNavigator from './MainTabNavigator';
import OnboardingNavigator from './OnboardingNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const onboardingComplete = usePreferencesStore((s) => s.onboardingComplete);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      {onboardingComplete ? (
        <Stack.Screen name="Main" component={MainTabNavigator} />
      ) : (
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      )}
    </Stack.Navigator>
  );
}

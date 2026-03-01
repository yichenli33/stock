import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import PreferenceCategoryScreen from '../screens/onboarding/PreferenceCategoryScreen';
import PreferenceLevelScreen from '../screens/onboarding/PreferenceLevelScreen';

export type OnboardingStackParamList = {
  Welcome: undefined;
  PreferenceCategory: undefined;
  PreferenceLevel: undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#0A0A0F' },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="PreferenceCategory" component={PreferenceCategoryScreen} />
      <Stack.Screen name="PreferenceLevel" component={PreferenceLevelScreen} />
    </Stack.Navigator>
  );
}

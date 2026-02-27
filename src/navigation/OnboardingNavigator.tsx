import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import PreferenceSectorScreen from '../screens/onboarding/PreferenceSectorScreen';
import PreferenceRiskScreen from '../screens/onboarding/PreferenceRiskScreen';

export type OnboardingStackParamList = {
  Welcome: undefined;
  PreferenceSector: undefined;
  PreferenceRisk: undefined;
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
      <Stack.Screen name="PreferenceSector" component={PreferenceSectorScreen} />
      <Stack.Screen name="PreferenceRisk" component={PreferenceRiskScreen} />
    </Stack.Navigator>
  );
}

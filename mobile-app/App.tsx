import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import MeetingsListScreen from './src/screens/MeetingsListScreen';
import MeetingDetailsScreen from './src/screens/MeetingDetailsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

enableScreens(true);

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { user } = useAuth();
  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen name="Meetings" component={MeetingsListScreen} options={{ title: 'FatecMeets' }} />
          <Stack.Screen name="MeetingDetails" component={MeetingDetailsScreen} options={{ title: 'Detalhes' }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
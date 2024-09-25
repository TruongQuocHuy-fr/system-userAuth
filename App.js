import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './context/AuthContext';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import ForgotPassword from './components/Auth/ForgotPassword'; // Import mới
import { Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <PaperProvider>
            <AuthProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Login">
                        <Stack.Screen name="Signup" component={Signup} />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Protected" component={ProtectedRoute} />
                        <Stack.Screen name="ForgotPassword" component={ForgotPassword} /> 
                    </Stack.Navigator>
                    <Toast />
                </NavigationContainer>
            </AuthProvider>
        </PaperProvider>
    );
};

export default App;

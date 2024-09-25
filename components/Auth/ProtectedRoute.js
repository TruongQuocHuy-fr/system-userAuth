import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const ProtectedRoute = () => {
    const { user } = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
        if (!user) {
            navigation.navigate('Login'); // Chuyển hướng nếu chưa đăng nhập
        }
    }, [user, navigation]);

    if (!user) {
        return null; // Không render gì khi chuyển hướng
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Màn hình bảo vệ</Text>
        </View>
    );
};

export default ProtectedRoute;

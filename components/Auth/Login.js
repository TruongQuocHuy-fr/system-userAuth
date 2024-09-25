import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { auth } from '../../utils/firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import Toast from 'react-native-toast-message';

const schema = yup.object({
    email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    password: yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Mật khẩu là bắt buộc'),
}).required();

const Login = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            Toast.show({ text1: 'Đăng nhập thành công!', type: 'success' });
        } catch (error) {
            Toast.show({ text1: error.message, type: 'error' });
        }
    };

    const handlePasswordReset = async (email) => {
        if (!email) {
            Toast.show({ text1: 'Vui lòng nhập email của bạn!', type: 'error' });
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            Toast.show({ text1: 'Email reset mật khẩu đã được gửi!', type: 'success' });
        } catch (error) {
            Toast.show({ text1: error.message, type: 'error' });
        }
    };

    return (
        <View style={styles.container}>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Email"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={styles.input}
                        error={!!errors.email}
                    />
                )}
                name="email"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Mật khẩu"
                        secureTextEntry
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={styles.input}
                        error={!!errors.password}
                    />
                )}
                name="password"
            />
            {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

            <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.button}>
                Đăng nhập
            </Button>

            <Button mode="text" onPress={() => navigation.navigate('ForgotPassword')} style={styles.resetButton}>
                Quên mật khẩu?
            </Button>

            <Text style={styles.registerText} onPress={() => navigation.navigate('Signup')}>
                Chưa có tài khoản? Đăng ký
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        marginBottom: 12,
    },
    button: {
        marginTop: 16,
    },
    resetButton: {
        marginTop: 8,
    },
    registerText: {
        marginTop: 16,
        color: 'blue',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 8,
    },
});

export default Login;

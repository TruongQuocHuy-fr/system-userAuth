import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { auth } from '../../utils/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import Toast from 'react-native-toast-message';

const schema = yup.object({
    email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
}).required();

const ForgotPassword = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            await sendPasswordResetEmail(auth, data.email);
            Toast.show({ text1: 'Email khôi phục mật khẩu đã được gửi!', type: 'success' });
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

            <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.button}>
                Gửi Email Khôi Phục
            </Button>
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
    errorText: {
        color: 'red',
        marginBottom: 8,
    },
});

export default ForgotPassword;

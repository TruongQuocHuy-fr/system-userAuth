import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { auth } from '../../utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Toast from 'react-native-toast-message';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../utils/firebase';

const schema = yup.object({
    name: yup.string().required('Tên là bắt buộc'),
    email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    password: yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Mật khẩu là bắt buộc'),
}).required();

const Signup = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;

            // Lưu thông tin bổ sung vào Firestore
            await setDoc(doc(db, 'users', user.uid), {
                name: data.name,
                email: data.email,
                createdAt: new Date(),
            });

            Toast.show({ text1: 'Đăng ký thành công!', type: 'success' });
            navigation.navigate('Login');
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
                        label="Tên"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={styles.input}
                        error={!!errors.name}
                    />
                )}
                name="name"
            />
            {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

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
                Đăng ký
            </Button>

            <Button mode="text" onPress={() => navigation.navigate('Login')} style={styles.resetButton}>
                Đã có tài khoản? Đăng nhập
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
    resetButton: {
        marginTop: 8,
    },
    errorText: {
        color: 'red',
        marginBottom: 8,
    },
});

export default Signup;

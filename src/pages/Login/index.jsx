import {React, useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Button, Gap, Input} from '../../components';
import {
  colors,
  fonts,
  getData,
  showError,
  storeData,
  useForm,
} from '../../utils';
import {IlLogo} from '../../assets';
import axios from 'axios';
import {useDispatch} from 'react-redux';

export default function Login({navigation}) {
  const dispatch = useDispatch();
  const [form, setForm] = useForm({
    user: '',
    password: '',
  });

  const getDataUserFromLocal = async () => {
    const result = await getData('user').then(res => {
      return res;
    });
    if (result) {
      navigation.replace('MainApp');
    }
  };

  const Login = async () => {
    try {
      dispatch({type: 'SET_LOADING', value: true});
      const response = await axios.post(
        'http://loki-api.boncabo.com/auth/login',
        {username: form.user, password: form.password},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      dispatch({type: 'SET_LOADING', value: false});
      if (response.data.data !== null) {
        console.log(response);
        storeData('user', response.data);
        dispatch({type: 'SET_LOADING', value: false});
        navigation.replace('MainApp');
        console.log('Berhasil Login');
      } else {
        showError('Username dan Password Salah');
      }
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      if (error.response.data.message === 'User not found') {
        return showError('Akun Tidak Ditemukan');
      }
      if (error) {
        dispatch({type: 'SET_LOADING', value: false});
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getDataUserFromLocal();
  }, []);

  const MainApp = () => {
    navigation.replace('MainApp');
  };
  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <IlLogo />
        <Text style={styles.title}>Masuk dan mulai berkomunikasi</Text>
        <Gap height={24} />
        <Input
          label="Username"
          value={form.user}
          onChangeText={value => setForm('user', value)}
        />
        <Gap height={24} />
        <Input
          label="Password"
          value={form.password}
          onChangeText={value => setForm('password', value)}
          secureTextEntry
        />
        <Gap height={40} />
        <Button title="Masuk" onPress={Login} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: colors.white,
    flex: 1,
  },
  hiddenEye: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginVertical: 40,
    maxWidth: 155,
  },
});

import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Gap, Header, Input, Loading} from '../../components';
import {colors, getData, showError, showSuccess, useForm} from '../../utils';
import {useDispatch} from 'react-redux';
import axios from 'axios';

export default function Register({navigation}) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useForm({
    username: '',
    phone: '',
    email: '',
    password: '',
  });

  const [user, setUser] = useState('');

  const getDataUserFromLocal = async () => {
    const result = await getData('user').then(res => {
      return res;
    });
    if (result) {
      setUser(result);
    }
  };

  const dispatch = useDispatch();

  const Register = async event => {
    event.preventDefault();
    try {
      dispatch({type: 'SET_LOADING', value: true});
      const result = await axios
        .post(
          'http://loki-api.boncabo.com/user/create',
          {
            username: form.username,
            password: form.password,
            email: form.email,
            phone: form.phone,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          },
        )
        .then(res => {
          return res;
        });
      if (result.data.success === true) {
        dispatch({type: 'SET_LOADING', value: false});
        showSuccess('Akun baru berhasil dibuat');
        navigation.goBack(true);
      } else {
        showError('Mohon isi data akun dengan benar');
        dispatch({type: 'SET_LOADING', value: false});
      }
    } catch (error) {
      if (error) {
        dispatch({type: 'SET_LOADING', value: false});
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getDataUserFromLocal();
  }, []);

  return (
    <>
      <View style={styles.page}>
        <Header title="Tambah Akun" />
        <Gap height={40} />
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Input
                label="Nama"
                value={form.username}
                onChangeText={value => setForm('username', value)}
              />
              <Gap height={24} />
              <Input
                label="No Telp / Handphone"
                value={form.phone}
                onChangeText={value => setForm('phone', value)}
              />
              <Gap height={24} />
              <Input
                label="Alamat Email"
                value={form.email}
                onChangeText={value => setForm('email', value)}
              />
              <Gap height={24} />
              <Input
                label="Kata Sandi"
                value={form.password}
                onChangeText={value => setForm('password', value)}
                secureTextEntry
              />
              <Gap height={40} />
              <Button title="Continue" onPress={Register} />
            </View>
          </ScrollView>
        </View>
      </View>
      {loading && <Loading />}
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 40,
    paddingTop: 0,
  },
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});

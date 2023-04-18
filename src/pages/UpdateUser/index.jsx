import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Gap, Header, Input, Loading} from '../../components';
import {colors, getData, showError, showSuccess, useForm} from '../../utils';
import {useDispatch} from 'react-redux';
import axios from 'axios';

export default function UpdateUser({navigation, route}) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useForm({
    id: route.params.user_id,
    username: route.params.user_username,
    phone: route.params.user_phone,
    email: route.params.user_email,
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

  const Update = async event => {
    event.preventDefault();
    console.log(form);
    if (form.username === '') {
      return showError('Mohon isi nama pengguna');
    }
    if (form.phone === '') {
      return showError('Mohon isi no telp pengguna');
    }
    if (form.email === '') {
      return showError('Mohon isi alamat email pengguna');
    }
    try {
      dispatch({type: 'SET_LOADING', value: true});
      const result = await axios
        .post(
          'http://loki-api.boncabo.com/user/update',
          {
            id: form.id,
            username: form.username,
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
          console.log(res);
          return res;
        });
      if (result.data.success === true) {
        dispatch({type: 'SET_LOADING', value: false});
        showSuccess('Akun berhasil diperbarui');
        navigation.replace('MainApp');
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
  }, [form]);

  return (
    <>
      <View style={styles.page}>
        <Header title="Perbarui Akun Pengguna" />
        <Gap height={40} />
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Input
                label="Nama tidak boleh sama dengan yang awal"
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
                label="Email tdak boleh sama dengan yang awal"
                value={form.email}
                onChangeText={value => setForm('email', value)}
              />
              <Gap height={40} />
              <Button title="Perbarui data akun" onPress={Update} />
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

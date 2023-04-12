import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  Gap,
  Header,
  Input,
  Profile,
  ProfileItem,
} from '../../components';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {deleteData, showError, showSuccess, useForm} from '../../utils';

export default function ProfileAdmin({navigation, route}) {
  const user = route.params;
  const [form, setForm] = useForm({
    password: '',
  });
  const dispatch = useDispatch();

  const [triggerPassword, setTriggerPassword] = useState(false);

  const changePassword = async e => {
    e.preventDefault();
    dispatch({type: 'SET_LOADING', value: true});
    if (form.password.length < 6) {
      dispatch({type: 'SET_LOADING', value: false});
      return showError('Password minimal terdiri dari 6 karakter');
    }
    try {
      await axios
        .post(
          'http://loki-api.boncabo.com/user/change_password',
          {
            id: user.user_id,
            new_password: form.password,
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
          dispatch({type: 'SET_LOADING', value: false});
          showSuccess('Perbarui Kata Sandi Berhasil');
          deleteData('user');
          navigation.replace('Login');
        });
    } catch (error) {
      console.log(error);
      dispatch({type: 'SET_LOADING', value: false});
    }
    dispatch({type: 'SET_LOADING', value: false});
    setTriggerPassword(false);
  };

  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Profile Admin" onPress={() => navigation.goBack()} />
        <Profile name={user.username} desc="Admin" />
        <Gap height={10} />
        <ProfileItem label="Jumlah Poin" value="50" />
        <ProfileItem label="No. Telp" value="-" />
        <ProfileItem label="Alamat Email" value="-" />
        <Gap height={20} />
        {triggerPassword === false && (
          <View
            style={{
              width: '50%',
              marginRight: 16,
              alignSelf: 'flex-end',
            }}>
            <Button
              title="Ubah Kata Sandi"
              onPress={() => setTriggerPassword(true)}
            />
          </View>
        )}
        {triggerPassword === true && (
          <View style={{marginHorizontal: 16}}>
            <Input
              label="Kata Sandi Baru"
              value={form.password}
              onChangeText={value => setForm('password', value)}
              secureTextEntry
            />
            <Gap height={15} />
            <Button
              title="Perbarui Kata Sandi"
              onPress={e => changePassword(e)}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
  action: {
    paddingHorizontal: 40,
    paddingTop: 23,
  },
});

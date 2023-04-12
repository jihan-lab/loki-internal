import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {Button, Gap, Header, Profile, ProfileItem} from '../../components';
import {colors, fonts, showSuccess} from '../../utils';
import axios from 'axios';
import {useDispatch} from 'react-redux';

export default function UserDetail({navigation, route}) {
  const dataUser = route.params;
  const dispatch = useDispatch();

  const deleteAccount = async e => {
    e.preventDefault();
    try {
      dispatch({type: 'SET_LOADING', value: true});
      await axios
        .post(
          'http://loki-api.boncabo.com/user/delete',
          {
            id: route.params.user_id,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          },
        )
        .then(res => {
          showSuccess('Hapus Akun Berhasil');
          dispatch({type: 'SET_LOADING', value: false});
          console.log(res);
          navigation.goBack();
        });
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <View style={styles.page}>
      <Header title="Informasi Pengguna" onPress={() => navigation.goBack()} />
      <Profile name={dataUser.user_username} desc={dataUser.user_status} />
      <Gap height={10} />
      <ProfileItem
        label="Jumlah Poin"
        value={(1 * dataUser.user_poin).toLocaleString()}
      />
      {dataUser.user_phone ? (
        <ProfileItem label="No. Telp" value={`+${dataUser.user_phone}`} />
      ) : (
        <ProfileItem label="No. Telp" value={`${dataUser.user_phone}`} />
      )}

      <ProfileItem label="Alamat Email" value={dataUser.user_email} />
      <View style={styles.action}>
        <TouchableOpacity style={styles.level}>
          <Text style={styles.text}>Naik Lv</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.suspend}>
          <Text style={styles.textSuspend}>Suspend</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteAccount}
          onPress={e => deleteAccount(e)}>
          <Text style={styles.text}>Hapus Akun</Text>
        </TouchableOpacity>
      </View>
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
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  suspend: {
    margin: 20,
    padding: 12,
    borderRadius: 100,
    backgroundColor: 'yellow',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  level: {
    margin: 20,
    padding: 12,
    borderRadius: 100,
    backgroundColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.primary[600],
  },
  textSuspend: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
  },
  deleteAccount: {
    margin: 20,
    padding: 12,
    borderRadius: 100,
    backgroundColor: colors.error,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

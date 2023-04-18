import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Gap, Header, Profile, ProfileItem} from '../../components';
import {colors, fonts, getData, showSuccess} from '../../utils';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {IlHistory, IlThumbsDown, IlThumbsUp, IlTrash} from '../../assets';

export default function UserDetail({navigation, route}) {
  const [user, setUser] = useState('');
  const dataUser = route.params;
  const dispatch = useDispatch();

  const getDataUserFromLocal = async () => {
    const result = await getData('user').then(res => {
      return res;
    });
    if (result) {
      setUser(result);
    }
  };

  const deleteAccount = async e => {
    e.preventDefault();
    return Alert.alert(
      'Apa Kamu Yakin?',
      'Kamu yakin ingin menghapus akun ini ?',
      [
        {
          text: 'Iya',
          onPress: async () => {
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
          },
        },
        {
          text: 'Tidak',
        },
      ],
    );
  };

  const levelUpAccount = e => {
    e.preventDefault();
    return Alert.alert(
      'Apa Kamu Yakin?',
      'Kamu yakin ingin menaikkan level akun ini ?',
      [
        {
          text: 'Iya',
          onPress: async () => {
            try {
              dispatch({type: 'SET_LOADING', value: true});
              await axios
                .post(
                  'http://loki-api.boncabo.com/user/update_level',
                  {
                    user_id: dataUser.user_id,
                  },
                  {
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${user.token}`,
                    },
                  },
                )
                .then(res => {
                  dispatch({type: 'SET_LOADING', value: false});
                  navigation.goBack();
                  showSuccess('Level Akun Berhasil Ditingkatkan');
                });
              dispatch({type: 'SET_LOADING', value: false});
            } catch (error) {
              dispatch({type: 'SET_LOADING', value: false});
              console.log(error);
            }
          },
        },
        {
          text: 'Tidak',
        },
      ],
    );
  };

  const suspendAccount = e => {
    e.preventDefault();
    return Alert.alert(
      'Apa Kamu Yakin?',
      'Kamu yakin ingin suspend akun ini ?',
      [
        {
          text: 'Iya',
          onPress: async () => {
            try {
              dispatch({type: 'SET_LOADING', value: true});
              await axios
                .get(
                  `http://loki-api.boncabo.com/user/update_suspend/${dataUser.user_id}`,
                  {
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${user.token}`,
                    },
                  },
                )
                .then(res => {
                  dispatch({type: 'SET_LOADING', value: false});
                  navigation.goBack();
                  showSuccess('Akun Berhasil di Suspend');
                });
              dispatch({type: 'SET_LOADING', value: false});
            } catch (error) {
              dispatch({type: 'SET_LOADING', value: false});
              console.log(error);
            }
          },
        },
        {
          text: 'Tidak',
        },
      ],
    );
  };

  useEffect(() => {
    getDataUserFromLocal();
  }, [dispatch, user]);

  return (
    <View style={styles.page}>
      <Header title="Informasi Pengguna" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
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
        <ProfileItem label="Level Pengguna" value={dataUser.user_level} />
        <View style={styles.action}>
          <TouchableOpacity style={styles.wrapAction} onPress={levelUpAccount}>
            <Image source={IlThumbsUp} />
          </TouchableOpacity>
          <Gap width={10} />
          <TouchableOpacity style={styles.wrapAction} onPress={suspendAccount}>
            <Image source={IlThumbsDown} />
          </TouchableOpacity>
          <Gap width={10} />
          <TouchableOpacity style={styles.wrapAction} onPress={deleteAccount}>
            <Image source={IlTrash} />
          </TouchableOpacity>
          <Gap width={10} />
          <TouchableOpacity
            style={styles.wrapAction}
            onPress={() => navigation.navigate('HistorySubmission', dataUser)}>
            <Image source={IlHistory} />
          </TouchableOpacity>
        </View>
        <View style={{margin: 16}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('UpdateUser', dataUser)}
            style={styles.updateUser}>
            <Text style={styles.text}>Update User</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.updateUser}
            onPress={() => navigation.navigate('ListPhoneByUser', route)}>
            <Text
              style={
                styles.text
              }>{`Daftar No Telp Oleh ${dataUser.user_username}`}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  updateUser: {
    // margin: 16,
    marginBottom: 16,
    alignItems: 'center',
    padding: 12,
    borderRadius: 100,
    backgroundColor: colors.secondary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
  action: {
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  wrapAction: {
    padding: 12,
    borderRadius: 100,
    backgroundColor: colors.white,
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
});

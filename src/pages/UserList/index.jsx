import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IlAddUser} from '../../assets';
import {Gap, Header, UserItems} from '../../components';
import {colors, fonts, getData} from '../../utils';

export default function UserList({navigation}) {
  const [userList, setUserList] = useState([]);

  const [user, setUser] = useState('');
  const [userName, setUserName] = useState('');

  const getDataUserFromLocal = async () => {
    const result = await getData('user').then(res => {
      return res;
    });
    if (result) {
      setUser(result);
      setUserName(result.username);
    }
  };

  const getUserListFromServer = async () => {
    try {
      const result = await axios.get(
        'http://loki-api.boncabo.com/user/list_user',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      if (result) {
        setUserList(result?.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getDataUserFromLocal();
    getUserListFromServer();
  }, [userName]);

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Header title="Daftar Pengguna" />
        <View style={styles.InputText}>
          <Text>Total Jumlah Pengguna :</Text>
          <Gap height={20} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginRight: 16,
            }}>
            <Text
              style={{
                color: colors.text.primary,
                fontSize: 20,
                fontFamily: fonts.primary[600],
                marginBottom: 15,
              }}>
              {userList.length} Pengguna Aktif
            </Text>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                backgroundColor: colors.cardLight,
                padding: 10,
                borderRadius: 1000,
                width: 70,
                height: 70,
                marginTop: -50,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 2,
                elevation: 4,
              }}
              onPress={() => navigation.navigate('Register')}>
              <Image source={IlAddUser} style={{width: 40, height: 40}} />
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: fonts.primary[400],
                  color: colors.text.primary,
                }}>
                Tambah
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {userList &&
            userList.map((item, index) => (
              <UserItems
                key={index}
                title={item.user_username}
                statusUser={item.user_status}
                point={item.user_poin}
                onPress={() => navigation.navigate('UserDetail', item)}
              />
            ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  InputText: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 15,
    paddingLeft: 25,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 20,
  },
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
});

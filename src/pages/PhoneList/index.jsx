import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Gap, Header, List, StatusCategory, UserItems} from '../../components';
import {colors, deleteData, fonts, getData} from '../../utils';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import {IlFirst, IlProfile, IlSecond, IlThird} from '../../assets';
import axios from 'axios';

export default function PhoneList({navigation}) {
  const [rankUser, setRankUser] = useState([]);
  const [userFromServer, setUserFromServer] = useState('');
  const [trigger, setTrigger] = useState('');

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

  const getUserFromServer = async () => {
    try {
      await axios
        .get(`http://loki-api.boncabo.com/user/detail/${user.user_id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(res => {
          setUserFromServer(res.data.data);
          if (res.data.data.user_status === 'SUSPEND') {
            deleteData('user');
            navigation.replace('Login');
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getRankUserList = async () => {
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
        const list = result.data.data;
        list.sort((a, b) => parseFloat(b.user_poin) - parseFloat(a.user_poin));
        setRankUser(list);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataUserFromLocal();
    getUserFromServer();
    getRankUserList();
  }, [userName]);

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Header title="Home" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginRight: 16,
              marginTop: 5,
            }}>
            <Text style={styles.font_title}>Hai, {user.username}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileAdmin', user)}>
              <Image source={IlProfile} />
            </TouchableOpacity>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.welcome}>Kategori Status No. Telp</Text>
          </View>
          <View style={styles.wrapperScroll}>
            <View style={styles.category}>
              <StatusCategory
                onPress={() =>
                  navigation.navigate('CategoryPhoneStatus', 'TERDAFTAR')
                }
                category="terdaftar"
                label="Terdaftar"
              />
              <StatusCategory
                onPress={() =>
                  navigation.navigate('CategoryPhoneStatus', 'TIDAK_AKTIF')
                }
                category="tidakAktif"
                label="Tidak Aktif"
              />
              <StatusCategory
                onPress={() =>
                  navigation.navigate('CategoryPhoneStatus', 'TIDAK_TERDAFTAR')
                }
                category="tidakTerdaftar"
                label="Tidak Terdaftar"
              />
            </View>
          </View>
          <Gap height={20} />
          <View style={styles.wrapperSection}>
            <Text style={styles.welcome}>Kinerja Pengguna</Text>
            <View style={styles.rank}>
              <Image style={{marginLeft: 15}} source={IlFirst} />
              <UserItems
                title={rankUser[0]?.user_username}
                statusUser={`${rankUser[0]?.user_status}`}
                point={rankUser[0]?.user_poin}
                onPress={() => navigation.navigate('UserDetail', rankUser[0])}
              />
            </View>
            <View style={styles.rank}>
              <Image style={{marginLeft: 15}} source={IlSecond} />
              <UserItems
                title={rankUser[1]?.user_username}
                statusUser={`${rankUser[1]?.user_status}`}
                point={rankUser[1]?.user_poin}
                onPress={() => navigation.navigate('UserDetail', rankUser[1])}
              />
            </View>
            <View style={styles.rank}>
              <Image style={{marginLeft: 15}} source={IlThird} />
              <UserItems
                title={rankUser[2]?.user_username}
                statusUser={`${rankUser[2]?.user_status}`}
                point={rankUser[2]?.user_poin}
                onPress={() => navigation.navigate('UserDetail', rankUser[3])}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rank: {
    backgroundColor: colors.cardLight,
    marginTop: 5,
    paddingTop: 10,
    borderRadius: 20,
  },
  font_title: {
    marginLeft: 16,
    paddingVertical: 8,
    width: '35%',
    paddingHorizontal: 12,
    backgroundColor: colors.primary,
    color: '#FFF',
    fontSize: 18,
    borderRadius: 100,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    textTransform: 'capitalize',
  },
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 209,
  },
  wrapperSection: {
    paddingHorizontal: 16,
  },
  wrapperScroll: {
    marginHorizontal: -16,
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
  category: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 16,
  },
});

import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Gap, Header, List, StatusCategory} from '../../components';
import {colors, fonts, getData} from '../../utils';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import {IlProfile} from '../../assets';

export default function PhoneList({navigation}) {
  const PhoneInformation = () => {
    navigation.navigate('PhoneInformation');
  };

  const [user, setUser] = useState('');

  const getDataUserFromLocal = async () => {
    const result = await getData('user').then(res => {
      return res;
    });
    if (result) {
      setUser(result);
    }
  };

  useEffect(() => {
    getDataUserFromLocal();
  }, []);

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
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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

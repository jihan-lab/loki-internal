import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../utils';
import {IlLogo} from '../../assets';

export default function Splash({navigation}) {
  // const getLogin = async () => {
  //   const user = await getData('user').then(res => {
  //     return res;
  //   });

  //   if (user) {
  //     const password = await getData('passwordUser').then(res => {
  //       return res;
  //     });

  //     try {
  //       dispatch({type: 'SET_LOADING', value: true});
  //       const response = await axios.post(
  //         'http://loki-api.boncabo.com/auth/login',
  //         {username: user.username, password: password},
  //         {
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         },
  //       );
  //       dispatch({type: 'SET_LOADING', value: false});
  //       if (response.data.data !== null) {
  //         storeData('user', response.data);
  //         storeData('passwordUser', password);
  //         console.log('Login Ulang');
  //         dispatch({type: 'SET_LOADING', value: false});
  //       } else {
  //         console.log('Ada Kesalahan di mengambil data Login');
  //       }
  //     } catch (error) {
  //       if (error) {
  //         dispatch({type: 'SET_LOADING', value: false});
  //         console.log(error.message);
  //       }
  //     }
  //   }
  // };

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.page}>
      <IlLogo />
      <Text style={styles.title}>Loki Internal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 20,
  },
});

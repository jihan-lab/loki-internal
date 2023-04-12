import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {colors} from '../../../utils';
import {IlCheck, IlNoPhone, IlNoUser} from '../../../assets';

export default function Status({status, onPress}) {
  if (status === 'aktif') {
    return (
      <View onPress={onPress} style={styles.Button_Aktif}>
        <Image source={IlCheck} style={{width: 25, height: 25}} />
      </View>
    );
  }
  if (status === 'tidakTerdaftar') {
    return (
      <View onPress={onPress} style={styles.Button_tdf}>
        <Image source={IlNoPhone} style={{width: 25, height: 25}} />
      </View>
    );
  }
  if (status === 'tidakAktif') {
    return (
      <View onPress={onPress} style={styles.Button_noUser}>
        <Image source={IlNoUser} style={{width: 25, height: 25}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Button_noUser: {
    width: 40,
    height: 40,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 1000,
    borderColor: colors.border,
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
  Button_Aktif: {
    width: 40,
    height: 40,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 1000,
    borderColor: colors.border,
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
  Button_tdf: {
    width: 40,
    height: 40,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 1000,
    borderColor: colors.border,
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

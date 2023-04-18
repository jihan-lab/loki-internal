import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';

export default function Profile({name, desc}) {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.profession(desc)}>{desc}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    height: 110,
    width: 110,
    borderRadius: 110 / 2,
  },
  borderProfile: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 16,
    textTransform: 'capitalize',
  },
  profession: desc => ({
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.white,
    marginTop: 2,
    textAlign: 'center',
    textTransform: 'capitalize',
    backgroundColor: desc === 'SUSPEND' ? colors.error : colors.primary,
    padding: 3,
    width: 70,
    borderRadius: 70 / 2,
  }),
  removePhoto: {
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';
import {Gap, Status} from '../../atoms';

export default function StatusCategory({onPress, category, label}) {
  const Icon = () => {
    if (category === 'terdaftar') {
      return <Status status="aktif" />;
    }
    if (category === 'tidakTerdaftar') {
      return <Status status="tidakTerdaftar" />;
    }
    if (category === 'tidakAktif') {
      return <Status status="tidakAktif" />;
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon />
      <Gap height={10} />
      <Text style={styles.label}>50 No Telp</Text>
      <Text style={styles.category}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: colors.cardLight,
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginRight: 10,
    width: 110,
  },
  illustration: {
    marginBottom: 28,
  },
  label: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.primary,
  },
  category: {
    fontSize: 12,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
});

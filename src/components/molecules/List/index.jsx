import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, fonts} from '../../../utils';
import {IcNext} from '../../../assets';
import {Gap} from '../../atoms';

export default function List({number, status, onPressCall, onPressDetail}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressCall} style={styles.content}>
        <Text style={styles.number}>{number}</Text>
        <Text style={styles.status}>{status}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={onPressDetail}>
        <Text
          style={{
            color: colors.text.primary,
            marginRight: 5,
          }}>
          Detail
        </Text>
        <IcNext />
      </TouchableOpacity>
      <Gap width={30} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  avatar: {
    height: 46,
    width: 46,
    borderRadius: 46 / 2,
  },
  number: {
    fontSize: 16,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
    textTransform: 'capitalize',
  },
  status: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.secondary,
    textTransform: 'capitalize',
  },
});

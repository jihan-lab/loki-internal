import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../../../utils';

export default function UserItems({title, statusUser, point, onPress}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.statusUser}>{statusUser}</Text>
      </View>
      <Text style={styles.point}>{(1 * point).toLocaleString()} Point</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingTop: 16,
    paddingBottom: 12,
  },
  titleWrapper: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    maxWidth: '80%',
    textTransform: 'capitalize',
  },
  statusUser: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    marginTop: 4,
  },
  point: {
    fontFamily: fonts.primary[600],
    fontSize: 15,
    color: colors.text.primary,
    marginRight: 16,
  },
});

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {IcPhone, IcPhoneActive, IcUser, IcUserActive} from '../../../assets';
import {colors, fonts} from '../../../utils';

export default function TabItem({title, active, onLongPress, onPress}) {
  const Icon = () => {
    if (title === 'PhoneNumber') {
      return active ? <IcPhoneActive /> : <IcPhone />;
    }
    if (title === 'user') {
      return active ? <IcUserActive /> : <IcUser />;
    }
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Icon />
      <Text style={styles.text(active)}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: active => ({
    fontSize: 15,
    color: active ? colors.text.menuActive : colors.text.menuInActive,
    fontFamily: fonts.primary[600],
    marginTop: 4,
    marginBottom: 5,
  }),
});

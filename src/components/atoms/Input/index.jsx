import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import {colors, fonts} from '../../../utils';

export default function Input({
  label,
  value,
  onChangeText,
  secureTextEntry,
  disable,
}) {
  const [border, setBorder] = useState(colors.border);

  const onFocusForm = () => {
    setBorder(colors.tertiary);
  };
  const onBlurForm = () => {
    setBorder(colors.border);
  };
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        onFocus={onFocusForm}
        onBlur={onBlurForm}
        style={styles.input(border)}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={!disable}
        selectTextOnFocus={!disable}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: border => ({
    borderWidth: 1,
    borderColor: border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
  }),
  label: {
    fontSize: 16,
    color: colors.text.secondary,
    fontFamily: fonts.primary[400],
    marginBottom: 6,
  },
});

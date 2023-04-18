import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import {useDispatch} from 'react-redux';
import {Button, Gap, Header, List} from '../../components';
import {colors, fonts, getData} from '../../utils';

export default function ListPhoneByUser({navigation, route}) {
  const [phoneList, setPhoneList] = useState([]);
  const [trigger, setTrigger] = useState('');

  const data = route.params.params;
  const [user, setUser] = useState('');
  const [userName, setUserName] = useState('');
  const [countListPhone, setCountListPhone] = useState(50);

  const dispatch = useDispatch();

  const getDataUserFromLocal = async () => {
    const result = await getData('user').then(res => {
      return res;
    });
    if (result) {
      setUser(result);
      setUserName(result.username);
    }
  };

  const getListPhoneFromServer = async () => {
    try {
      const result = await axios.get(
        `http://loki-api.boncabo.com/phone/list_by_id/${countListPhone}/${data.user_id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      if (result) {
        setPhoneList(result?.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const PhoneInformation = item => {
    navigation.navigate('PhoneInformation', item);
  };

  const Counter = async () => {
    setCountListPhone(countListPhone + 10);
    try {
      dispatch({type: 'SET_LOADING', value: true});
      const result = await axios.get(
        `http://loki-api.boncabo.com/phone/list_by_id/${countListPhone}/${data.user_id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      if (result) {
        setUserName(userName);
        setPhoneList(result?.data.data);
        setTrigger(trigger + 1);
        dispatch({type: 'SET_LOADING', value: false});
      }
      dispatch({type: 'SET_LOADING', value: false});
    } catch (error) {
      console.log(error);
      dispatch({type: 'SET_LOADING', value: false});
    }
  };

  useEffect(() => {
    getDataUserFromLocal();
    getListPhoneFromServer();
  }, [userName, trigger]);

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Header title={`No Telp Oleh ${data.user_username}`} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.InputText}>
            <Text>{`Total No Telp :`}</Text>
            <Gap height={20} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginRight: 16,
              }}>
              <Text
                style={{
                  color: colors.text.primary,
                  fontSize: 20,
                  fontFamily: fonts.primary[600],
                  marginBottom: 15,
                }}>
                {phoneList.length.toLocaleString()}
              </Text>
            </View>
          </View>

          {phoneList.map((item, index) => (
            <List
              key={index}
              onPressCall={() =>
                RNImmediatePhoneCall.immediatePhoneCall(`+${item.phone_number}`)
              }
              number={`${index + 1})    +${item.phone_number}`}
              status={`            ${item.status} - Durasi, ${item.duration}`}
              onPressDetail={() => PhoneInformation(item)}
            />
          ))}
          <View style={{marginHorizontal: 16, marginVertical: 10}}>
            <Button onPress={Counter} title="Tampilkan Lebih Banyak..." />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  InputText: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 15,
    paddingLeft: 25,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
});

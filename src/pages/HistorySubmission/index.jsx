import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IlAddUser, IlCheck} from '../../assets';
import {Button, Gap, Header, SubmissionItem, UserItems} from '../../components';
import {colors, fonts, getData} from '../../utils';
import {useDispatch} from 'react-redux';

export default function HistorySubmission({navigation, route}) {
  const [historySubList, setHistorySubList] = useState([]);
  const [user, setUser] = useState('');
  const [userName, setUserName] = useState('');
  const [count, setCount] = useState(10);

  const data = route.params;
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

  const Counter = async () => {
    setCount(count + 10);
    try {
      dispatch({type: 'SET_LOADING', value: true});
      const result = await axios.get(
        `http://loki-api.boncabo.com/persetujuan/list/${data.user_id}/${count}/0`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      if (result) {
        console.log(result);
        setHistorySubList(result?.data.data);
      }
      dispatch({type: 'SET_LOADING', value: false});
    } catch (error) {
      console.log(error);
      dispatch({type: 'SET_LOADING', value: true});
    }
  };

  const getHistorySubmissionFromServer = async () => {
    try {
      const result = await axios.get(
        `http://loki-api.boncabo.com/persetujuan/list/${data.user_id}/${count}/0`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      if (result) {
        console.log(result);
        setHistorySubList(result?.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getDataUserFromLocal();
    getHistorySubmissionFromServer();
  }, [userName, navigation, dispatch]);

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Header title="Daftar Riwayat Pengajuan" />
        <View style={styles.InputText}>
          <Text>Total Riwayat :</Text>
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
              {historySubList.length} Riwayat Pengajuan
            </Text>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {historySubList &&
            historySubList.map((item, index) => (
              <SubmissionItem
                key={index}
                title={item.user_username}
                statusUser={`Rp. ${(
                  1 * item.persetujuan_nominal
                ).toLocaleString()} - Status : ${item.persetujuan_status}`}
                statusSubmission={item.pengajuan_status}
                onPress={() => navigation.navigate('HistoryDetail', item)}
              />
            ))}
          {historySubList.length < 10 ? (
            ''
          ) : (
            <View style={{marginHorizontal: 16, marginVertical: 10}}>
              <Button onPress={Counter} title="Tampilkan Lebih Banyak..." />
            </View>
          )}
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

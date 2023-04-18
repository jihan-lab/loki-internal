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
import {IlAddUser} from '../../assets';
import {Button, Gap, Header, SubmissionItem, UserItems} from '../../components';
import {colors, fonts, getData} from '../../utils';
import {useDispatch} from 'react-redux';

export default function Submission({navigation}) {
  const [submissionList, setSubmissionList] = useState([]);
  const [trigger, setTrigger] = useState('');

  const [user, setUser] = useState('');
  const [userSubmission, setUserSubmission] = useState([]);
  const [userName, setUserName] = useState('');
  const [countSub, setCountSub] = useState(10);

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

  const getSubmissionListFromServer = async () => {
    try {
      const result = await axios.get(
        `http://loki-api.boncabo.com/pengajuan/list/${countSub}/0`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      let temp = [];
      const arr = result.data.data;

      if (result) {
        for (let i = 0; i < arr.length; i++) {
          const userResult = await axios.get(
            `http://loki-api.boncabo.com/user/detail/${arr[i].user_id}`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
              },
            },
          );
          console.log(userResult.data.data.user_username);
          temp.push(userResult.data.data.user_username);
        }
      }
      setSubmissionList(arr);
      setTrigger(trigger + 1);
      setUserSubmission(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const Counter = async () => {
    setCountSub(countSub + 10);
    try {
      dispatch({type: 'SET_LOADING', value: true});
      const result = await axios.get(
        `http://loki-api.boncabo.com/pengajuan/list/${countSub}/0`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      let temp = [];
      const arr = result.data.data;

      if (result) {
        for (let i = 0; i < arr.length; i++) {
          const userResult = await axios.get(
            `http://loki-api.boncabo.com/user/detail/${arr[i].user_id}`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
              },
            },
          );
          console.log(userResult.data.data.user_username);
          temp.push(userResult.data.data.user_username);
        }
      }
      setSubmissionList(arr);
      setTrigger(trigger + 1);
      setUserSubmission(temp);
      dispatch({type: 'SET_LOADING', value: false});
    } catch (error) {
      console.log(error);
      dispatch({type: 'SET_LOADING', value: true});
    }
  };

  useEffect(() => {
    getDataUserFromLocal();
    getSubmissionListFromServer();
    console.log(userSubmission);
  }, [userName]);

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Header title="Daftar Pengajuan Dana" />
        <View style={styles.InputText}>
          <Text>Total Jumlah Pengajuan :</Text>
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
              {submissionList.length} Pengajuan
            </Text>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {submissionList &&
            submissionList.map((item, index) => (
              <SubmissionItem
                key={index}
                title={userSubmission[index]}
                statusUser={`Rp. ${(
                  1 * item.pengajuan_nominal
                ).toLocaleString()} - Tanggal Pengajuan : ${
                  item.pengajuan_date_create
                }`}
                statusSubmission={item.pengajuan_status}
                onPress={() =>
                  navigation.navigate('Accepted', [item, userSubmission[index]])
                }
              />
            ))}

          {submissionList.length < 10 ? (
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

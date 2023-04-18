import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';

import {Header, Call, Gap} from '../../components';
import {colors, fonts} from '../../utils';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

const HistoryDetail = ({navigation, route}) => {
  const phoneNumber = route.params.phone_number;
  const data = route.params;

  useEffect(() => {
    console.log(route);
  }, []);
  return (
    <>
      <Header title="Riwayat Pengajuan" />
      <SafeAreaView style={Style.container}>
        <View style={Style.box_2}>
          <View style={Style.box_1}>
            <View style={Style.box_phone}></View>

            <Text style={Style.text}>Riwayat</Text>
            <View style={Style.InputText}>
              <Gap height={10} />
              <Text style={{textTransform: 'capitalize'}}>
                {data.user_username}
              </Text>
              <Gap height={10} />
              <Text>Rp. {(1 * data.persetujuan_nominal).toLocaleString()}</Text>
              <Gap height={10} />
              <Text
                style={{
                  color: colors.text.primary,
                  fontSize: 30,
                  fontFamily: fonts.primary[600],
                  marginBottom: 15,
                }}>
                {`${data.pengajuan_status}`}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: -30,
          }}>
          <Image
            style={{
              width: '80%',
              height: '80%',
              borderRadius: 10,
            }}
            source={{uri: data.persetujuan_proof}}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

// #FFAB00
const Style = StyleSheet.create({
  wrapButtonSend: {
    flex: 1,
  },
  Button_action: {
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: colors.text.primary,
    padding: 10,
    borderRadius: 15,
    justifyContent: 'space-around',
  },
  text: {
    color: colors.text.primary,
    textAlign: 'center',
    fontSize: 40,
    fontFamily: fonts.primary[700],
  },
  InputText: {
    // margin: 20,
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

  box_phone: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
  },
  box_1: {
    padding: 5,
    gap: 10,
  },
  box_2: {
    marginTop: 5,
    justifyContent: 'center',
  },
  font: {
    color: '#FFF',
    fontSize: 35,
    textAlign: 'center',
    fontFamily: 'Urbanist-Regular',
  },
  font_title: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.primary,
    color: '#FFF',
    fontSize: 18,
    borderRadius: 100,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  waWrap: {
    marginTop: -20,
    fontSize: 10,
    alignItems: 'flex-end',
    flex: 1,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  wa: {
    alignItems: 'center',
  },

  // Modal Style
  buttonCall: {
    alignSelf: 'center',
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#37a137',
    marginTop: 23,
    paddingVertical: 12,
  },
  centeredViewModal: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
  buttonModal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    // backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: colors.text.primary,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalContent: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default HistoryDetail;

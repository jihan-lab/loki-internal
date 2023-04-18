import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Gap, Header, Profile, ProfileItem} from '../../components';
import {colors, fonts, getData, showError, showSuccess} from '../../utils';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {IlNullPhoto, IlThumbsDown, IlThumbsUp, IlTrash} from '../../assets';
import {launchImageLibrary} from 'react-native-image-picker';

export default function Accepted({navigation, route}) {
  const [user, setUser] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(IlNullPhoto);
  const [photoForDB, setPhotoForDB] = useState('');

  const dataUser = route.params;
  const dispatch = useDispatch();

  const getDataUserFromLocal = async () => {
    const result = await getData('user').then(res => {
      return res;
    });
    if (result) {
      setUser(result);
    }
  };

  const uploadImage = async () => {
    try {
      dispatch({type: 'SET_LOADING', value: true});
      await axios
        .post(
          'http://loki-api.boncabo.com/persetujuan/pencairan',
          {
            pengajuan_id: dataUser[0].pengajuan_id,
            persetujuan_proof: photoForDB,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          },
        )
        .then(res => {
          dispatch({type: 'SET_LOADING', value: false});
          console.log(res);
          showSuccess('Berhasil kirim tanda bukti');
          navigation.goBack();
        });
      dispatch({type: 'SET_LOADING', value: false});
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      console.log(error);
    }
  };

  const getImage = () => {
    launchImageLibrary(
      {includeBase64: true, quality: 0.5, maxWidth: 200, maxHeight: 200},
      response => {
        if (response.didCancel || response.error) {
          showError('Oops, sepertinya anda tidak memilih photonya');
        } else {
          console.log('response image', response);
          const source = {uri: response.assets[0].uri};
          setPhotoForDB(
            `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
          );
          setPhoto(source);
          setHasPhoto(true);
        }
      },
    );
  };

  useEffect(() => {
    getDataUserFromLocal();
  }, [dispatch, photoForDB, navigation, dispatch]);

  return (
    <View style={styles.page}>
      <Header title="Bukti Pencairan Dana" />
      <Gap height={10} />
      <ProfileItem
        label="Jumlah Dana yang Dicairkan"
        value={`Rp. ${(1 * dataUser[0].pengajuan_nominal).toLocaleString()}`}
      />
      <ProfileItem label="Nama Pengguna" value={`${dataUser[1]}`} />

      <ProfileItem
        label="Tanggal Pengajuan"
        value={dataUser[0].pengajuan_date_create}
      />
      <View style={styles.profile}>
        <TouchableOpacity style={styles.avatarWrapper} onPress={getImage}>
          <Image style={styles.avatar} source={photo} />
        </TouchableOpacity>
      </View>
      <View style={{margin: 16}}>
        <TouchableOpacity onPress={uploadImage} style={styles.updateUser}>
          <Text style={styles.text}>Unggah Bukti Pencairan Dana</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  updateUser: {
    // margin: 16,
    marginBottom: 16,
    alignItems: 'center',
    padding: 12,
    borderRadius: 100,
    backgroundColor: colors.secondary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
  action: {
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  wrapAction: {
    padding: 12,
    borderRadius: 100,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.primary[600],
  },

  profile: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 180 / 2,
    resizeMode: 'contain',
  },
  avatarWrapper: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 200 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhoto: {
    position: 'absolute',
    bottom: 8,
    right: 6,
  },
});

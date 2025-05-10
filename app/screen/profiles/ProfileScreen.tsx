import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import Container from '../../src/components/Container';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getProfile } from '../../src/api/authService';
import { useSchedule } from '../../src/context/ScheduleContext';
import { Dispatch, SetStateAction } from 'react';

type RootStackParamList = {
  ProfileScreenTab: undefined;
  FrameworkProgramScreen: undefined;
};

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProfileScreenTab'>;

interface ProfileScreenProps {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ setIsLoggedIn }) => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [profileData, setProfileData] = useState<any>(null);
  const { setStudentId } = useSchedule();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfileData(data);
        if (data.studentId) {
          setStudentId(data.studentId.toString());
        }
      } catch (error: any) {
        Alert.alert('Error', error.message || 'Failed to load profile');
      }
    };
    fetchProfile();
  }, []);

  const handleViewFramework = () => {
    navigation.navigate('FrameworkProgramScreen');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!profileData) {
    return (
      <Container isScroll={true}>
        <Text>Loading...</Text>
      </Container>
    );
  }

  return (
    <Container isScroll={true}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={profileData.avatarUrl ? { uri: profileData.avatarUrl } : require('../../../assets/images/Anhthe.jpg')}
            style={styles.profileImage}
            defaultSource={require('../../../assets/images/Anhthe.jpg')}
          />
          <View style={styles.headerText}>
            <Text style={styles.name}>{profileData.name || profileData.username}</Text>
            <Text style={styles.username}>{profileData.username}</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Trạng thái:</Text>
            <Text style={styles.value}>{profileData.status || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Giới tính:</Text>
            <Text style={styles.value}>{profileData.gender || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Ngày sinh:</Text>
            <Text style={styles.value}>{profileData.birthDate || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Mã học sinh:</Text>
            <Text style={styles.value}>{profileData.studentCode || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Khóa:</Text>
            <Text style={styles.value}>{profileData.className || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Cơ sở:</Text>
            <Text style={styles.value}>{profileData.course || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Bậc đào tạo:</Text>
            <Text style={styles.value}>{profileData.ethnicity || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Loại hình đào tạo:</Text>
            <Text style={styles.value}>{profileData.religion || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Nơi học:</Text>
            <Text style={styles.value}>{profileData.address || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Quê quán:</Text>
            <Text style={styles.value}>{profileData.hometown || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Ngành:</Text>
            <Text style={styles.value}>{profileData.major || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Chuyên ngành:</Text>
            <Text style={styles.value}>{profileData.department || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Lớp:</Text>
            <Text style={styles.value}>{profileData.classCode || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Mã sinh viên:</Text>
            <Text style={styles.value}>{profileData.studentCode || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Số điện thoại:</Text>
            <Text style={styles.value}>{profileData.phone || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{profileData.email || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Công tác đoàn:</Text>
            <Text style={styles.value}>{profileData.job || 'N/A'}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleViewFramework} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Xem chương trình khung</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogout} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  username: {
    fontSize: 14,
    color: '#E6F0FA',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
  },
  label: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
  },
  value: {
    fontSize: 14,
    color: '#000',
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Container } from '@/app/src/components';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the param list for the stack navigator
type RootStackParamList = {
  ProfileScreen: undefined;
  FrameworkProgramScreen: undefined;
};

// Type the navigation prop
type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileScreen'>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const profileData = {
    name: 'Itunuoluwa Abidoye',
    username: '@itunuoluwa',
    status: 'Đang học',
    gender: 'Nam',
    birthDate: '29/09/2022',
    studentId: '22TN002589',
    class: 'Cơ sở',
    course: 'Cơ sở 1',
    ethnicity: 'Đại học - Tín chỉ',
    religion: 'Chính quy',
    address: 'Cơ ngơi thành phố',
    hometown: 'Chính quy',
    major: 'Cơ ngơi thành phố',
    department: 'Khoa Công nghệ Thông tin',
    classCode: 'D17CNPM4',
    phone: '22228010271',
    email: 'Chức vụ',
    job: 'Cơng tác đoàn',
  };

  const handleViewFramework = () => {
    navigation.navigate('FrameworkProgramScreen');
  };

  return (
    <Container isScroll={true}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../../../assets/images/Anhthe.jpg')}
            style={styles.profileImage}
            defaultSource={require('../../../assets/images/Anhthe.jpg')}
          />
          <View style={styles.headerText}>
            <Text style={styles.name}>{profileData.name}</Text>
            <Text style={styles.username}>{profileData.username}</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Trạng thái:</Text>
            <Text style={styles.value}>{profileData.status}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Giới tính:</Text>
            <Text style={styles.value}>{profileData.gender}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Ngày sinh:</Text>
            <Text style={styles.value}>{profileData.birthDate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Mã học sinh:</Text>
            <Text style={styles.value}>{profileData.studentId}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Khóa:</Text>
            <Text style={styles.value}>{profileData.class}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Cơ sở:</Text>
            <Text style={styles.value}>{profileData.course}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Bạc đạo:</Text>
            <Text style={styles.value}>{profileData.ethnicity}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Loại hình đào tạo:</Text>
            <Text style={styles.value}>{profileData.religion}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Nơi học:</Text>
            <Text style={styles.value}>{profileData.address}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Quê quán:</Text>
            <Text style={styles.value}>{profileData.hometown}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Ngành:</Text>
            <Text style={styles.value}>{profileData.major}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Chuyên ngành:</Text>
            <Text style={styles.value}>{profileData.department}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Lớp:</Text>
            <Text style={styles.value}>{profileData.classCode}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Mã sinh viên:</Text>
            <Text style={styles.value}>{profileData.phone}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Chức vụ:</Text>
            <Text style={styles.value}>{profileData.email}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Công tác đoàn:</Text>
            <Text style={styles.value}>{profileData.job}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleViewFramework} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Xem chương trình khung</Text>
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
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Container from '@/app/src/components/Container';
import api from '../../src/api/api'; // Import api từ file cấu hình
import AsyncStorage from '@react-native-async-storage/async-storage';

// Định nghĩa kiểu cho dữ liệu môn học
interface Subject {
  name: string;
  credits: string;
  theoryHours: number;
  practicalHours: number;
  color: string;
}

// Định nghĩa kiểu cho học kỳ
interface Semester {
  semester: string;
  totalCredits: number;
  subjects: Subject[];
}

// Định nghĩa kiểu cho chi tiết chương trình khung từ API
interface CurriculumDetail {
  id: number;
  curriculumId: number;
  curriculumName: string;
  subjectId: number;
  subjectName: string;
  semesterId: number;
  semesterName: string;
  isMandatory: boolean;
  createdAt: string;
  theoryPeriods: number;
  practicalPeriods: number;
  credits: number;
}

// Định nghĩa kiểu cho tham số điều hướng
type RootStackParamList = {
  FrameworkProgramScreen: { studentId: string };
};

const FrameworkProgramScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { studentId } = route.params as RootStackParamList['FrameworkProgramScreen'];

  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hàm tải dữ liệu chương trình khung
  const fetchFrameworkData = async () => {
    if (!studentId) {
      setError('Không tìm thấy thông tin sinh viên. Vui lòng kiểm tra lại.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      // Gọi API để lấy dữ liệu chương trình khung
      const response = await api.get(`/api/curriculum/student/${studentId}`);
      const data: CurriculumDetail[] = response.data;

      // Nhóm dữ liệu theo học kỳ
      const groupedBySemester = data.reduce((acc: Semester[], detail: CurriculumDetail) => {
        const semesterName = detail.semesterName;
        const existingSemester = acc.find((s) => s.semester === semesterName);

        const subject = {
          name: detail.subjectName,
          credits: `${detail.credits}(${detail.theoryPeriods},${detail.practicalPeriods},0)`,
          theoryHours: detail.theoryPeriods,
          practicalHours: detail.practicalPeriods,
          color: subjectColors[acc.length % subjectColors.length],
        };

        if (existingSemester) {
          existingSemester.subjects.push(subject);
          existingSemester.totalCredits += detail.credits || 0;
        } else {
          acc.push({
            semester: semesterName,
            totalCredits: detail.credits || 0,
            subjects: [subject],
          });
        }

        return acc;
      }, []);

      setSemesters(groupedBySemester);
    } catch (err: any) {
      console.error('Error fetching framework data:', err);
      setError(
        err.response?.status === 404
          ? 'Không tìm thấy dữ liệu chương trình khung.'
          : err.message === 'Network Error'
          ? 'Không có kết nối mạng. Vui lòng kiểm tra kết nối.'
          : 'Không thể tải dữ liệu chương trình khung. Vui lòng thử lại.'
      );
      if (err.response) {
        Alert.alert('Lỗi API', `Mã lỗi: ${err.response.status} - ${err.response.data?.message || 'Lỗi không xác định'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFrameworkData();
  }, [studentId]);

  const subjectColors = ['#D8BFD8', '#FFA07A', '#87CEEB', '#E6F0FA', '#FFDEAD'];

  if (loading) {
    return (
      <Container isScroll={true}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>Đang tải...</Text>
        </View>
      </Container>
    );
  }

  if (error) {
    return (
      <Container isScroll={true}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchFrameworkData}>
            <Text style={styles.retryButtonText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }

  return (
    <Container isScroll={true}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#4A90E2" />
          </TouchableOpacity>
          <Text style={styles.title}>Chương trình khung</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.content}>
          {semesters.map((semester, index) => (
            <View key={index} style={styles.semesterContainer}>
              <View style={styles.semesterHeader}>
                <Text style={styles.semesterText}>{semester.semester}</Text>
                <Text style={styles.creditsText}>Số tín chỉ: {semester.totalCredits}</Text>
              </View>

              <View style={styles.subjectsHeader}>
                <Text style={styles.headerCell}>Tên môn học</Text>
                <Text style={styles.headerCell}>Số TC</Text>
                <Text style={styles.headerCell}>Số tiết LT</Text>
                <Text style={styles.headerCell}>Số tiết TH</Text>
              </View>

              {semester.subjects.map((subject, subjectIndex) => (
                <View key={subjectIndex} style={[styles.subjectCard, { backgroundColor: subject.color }]}>
                  <Text style={styles.subjectName}>{subject.name}</Text>
                  <Text style={styles.subjectDetail}>{subject.credits}</Text>
                  <Text style={styles.subjectDetail}>{subject.theoryHours}</Text>
                  <Text style={styles.subjectDetail}>{subject.practicalHours}</Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </Container>
  );
};

export default FrameworkProgramScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A90E2',
    textAlign: 'center',
    flex: 1,
  },
  content: {
    paddingHorizontal: 15,
  },
  semesterContainer: {
    marginBottom: 20,
  },
  semesterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#87CEEB',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  semesterText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  creditsText: {
    fontSize: 16,
    color: '#FFF',
  },
  subjectsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E6F0FA',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  headerCell: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A90E2',
    flex: 1,
    textAlign: 'center',
  },
  subjectCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  subjectName: {
    fontSize: 14,
    color: '#000',
    flex: 3,
    textAlign: 'left',
  },
  subjectDetail: {
    fontSize: 14,
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4A90E2',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF0000',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
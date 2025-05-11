import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Container from '@/app/src/components/Container';
import api from '../../src/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Định nghĩa kiểu cho dữ liệu môn học
interface GradeEntry {
  subjectName: string;
  attendanceScore: number;
  examScore: number;
  finalScore: number;
  note: string;
  color: string;
}

// Định nghĩa kiểu cho học kỳ
interface Semester {
  semester: string;
  entries: GradeEntry[];
}

// Định nghĩa kiểu cho dữ liệu từ API
interface GradeResponse {
  id: number;
  studentId: number;
  classId: number;
  subjectName: string;
  semesterName: string;
  attendanceScore: number;
  examScore: number;
  finalScore: number;
  note: string;
}

const TranscriptScreen = () => {
  const navigation = useNavigation();
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTranscriptData = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await api.get('/api/grades/student/1', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: GradeResponse[] = response.data;

      const groupedBySemester = data.reduce((acc: Semester[], grade: GradeResponse) => {
        const semesterName = grade.semesterName;
        const existingSemester = acc.find((s) => s.semester === semesterName);

        const entry = {
          subjectName: grade.subjectName,
          attendanceScore: grade.attendanceScore,
          examScore: grade.examScore,
          finalScore: grade.finalScore,
          note: grade.note || 'N/A',
          color: '#F5F5F5', // Màu thống nhất
        };

        if (existingSemester) {
          existingSemester.entries.push(entry);
        } else {
          acc.push({
            semester: semesterName,
            entries: [entry],
          });
        }

        return acc;
      }, []);

      setSemesters(groupedBySemester);
    } catch (err: any) {
      console.error('Error fetching transcript data:', err);
      setError(
        err.response?.status === 404
          ? 'Không tìm thấy dữ liệu bảng điểm.'
          : err.message === 'Network Error'
          ? 'Không có kết nối mạng. Vui lòng kiểm tra kết nối.'
          : 'Không thể tải dữ liệu bảng điểm. Vui lòng thử lại.'
      );
      if (err.response) {
        Alert.alert('Lỗi API', `Mã lỗi: ${err.response.status} - ${err.response.data?.message || 'Lỗi không xác định'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTranscriptData();
  }, []);

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
          <TouchableOpacity style={styles.retryButton} onPress={fetchTranscriptData}>
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
          <Text style={styles.title}>Kết quả học tập</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.content}>
          {semesters.map((semester, index) => (
            <View key={index} style={styles.semesterContainer}>
              <View style={styles.semesterHeader}>
                <Text style={styles.semesterText}>{semester.semester}</Text>
              </View>

              <View style={styles.entriesHeader}>
                <Text style={[styles.headerCell, { width: '40%' }]}>Tên môn học</Text>
                <Text style={[styles.headerCell, { width: '15%' }]}>Điểm CC</Text>
                <Text style={[styles.headerCell, { width: '15%' }]}>Điểm thi</Text>
                <Text style={[styles.headerCell, { width: '15%' }]}>Điểm TK</Text>
                <Text style={[styles.headerCell, { width: '15%' }]}>Ghi chú</Text>
              </View>

              {semester.entries.map((entry, entryIndex) => (
                <View key={entryIndex} style={[styles.entryCard, { backgroundColor: entry.color }]}>
                  <Text
                    style={[styles.entrySubjectName, { width: '40%' }]}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {entry.subjectName}
                  </Text>
                  <Text style={[styles.entryDetail, { width: '15%' }]}>{entry.attendanceScore}</Text>
                  <Text style={[styles.entryDetail, { width: '15%' }]}>{entry.examScore}</Text>
                  <Text style={[styles.entryDetail, { width: '15%' }]}>{entry.finalScore}</Text>
                  <Text
                    style={[styles.entryDetail, { width: '15%' }]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {entry.note}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </Container>
  );
};

export default TranscriptScreen;

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
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
    paddingVertical: 10,
  },
  semesterContainer: {
    marginBottom: 20,
  },
  semesterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#87CEEB',
    padding: 12,
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
  entriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E6F0FA',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  headerCell: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A90E2',
    textAlign: 'center',
  },
  entryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  entrySubjectName: {
    fontSize: 14,
    color: '#000',
    textAlign: 'left',
  },
  entryDetail: {
    fontSize: 14,
    color: '#000',
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
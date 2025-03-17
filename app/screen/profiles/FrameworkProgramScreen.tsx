import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // If using Expo, ensure `expo install @expo/vector-icons` is run

const FrameworkProgramScreen = () => {
  const navigation = useNavigation();

  const frameworkData = {
    semesters: [
      {
        semester: 'Học kỳ 6',
        totalCredits: 21,
        subjects: [
          {
            name: 'Cấu trúc dữ liệu và giải thuật nâng cao',
            credits: '3(3,0,0)',
            theoryHours: 36,
            practicalHours: 18,
            color: '#D8BFD8',
          },
          {
            name: 'Lịch sử Đảng Cộng sản Việt Nam',
            credits: '2(2,0,0)',
            theoryHours: 30,
            practicalHours: 0,
            color: '#FFA07A',
          },
        ],
      },
      {
        semester: 'Học kỳ 6',
        totalCredits: 21,
        subjects: [
          {
            name: 'Lập trình .NET',
            credits: '4(4,0,0)',
            theoryHours: 48,
            practicalHours: 24,
            color: '#FFA07A',
          },
          {
            name: 'Nhập môn An toàn và bảo mật thông tin',
            credits: '2(0,0,0)',
            theoryHours: 30,
            practicalHours: 0,
            color: '#D8BFD8',
          },
        ],
      },
    ],
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button and Title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#4A90E2" />
        </TouchableOpacity>
        <Text style={styles.title}>Chương trình khung</Text>
        {/* Empty View to balance the layout */}
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        {frameworkData.semesters.map((semester, index) => (
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
    justifyContent: 'space-between', // Distribute space between items
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A90E2',
    textAlign: 'center',
    flex: 1, // Take remaining space to center the title
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
});
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Container } from '@/app/src/components';

interface TranscriptEntry {
  subject: string;
  semesterGrade: string;
  finalGrade: string;
  gpa: string;
}

const transcriptData: TranscriptEntry[] = [
  {
    subject: "Vật sứ Dân Công sẵn",
    semesterGrade: "8.5",
    finalGrade: "8.5",
    gpa: "A",
  },
  {
    subject: "Cấu trúc dữ liệu và giải thuật nâng cao",
    semesterGrade: "8.5",
    finalGrade: "8",
    gpa: "B+",
  },
  {
    subject: "Hệ phân tán",
    semesterGrade: "8",
    finalGrade: "7",
    gpa: "B",
  },
  {
    subject: "Lập trình.net",
    semesterGrade: "8.5",
    finalGrade: "8.5",
    gpa: "A",
  },
  {
    subject: "Văn hóa An toàn và bảo mật thông tin",
    semesterGrade: "8.5",
    finalGrade: "8.5",
    gpa: "A",
  },
];

const TranscriptScreen = () => {
  return (
    <Container isScroll={true}>
      <View style={styles.container}>
        <Text style={styles.title}>Kết quả học tập</Text>
        <Text style={styles.subtitle}>HK2(2024-2025)</Text>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, styles.subjectHeader]}>Tên môn</Text>
          <Text style={[styles.headerCell, styles.gradeHeader]}>Điểm trung kỳ</Text>
          <Text style={[styles.headerCell, styles.gradeHeader]}>Điểm cuối kỳ</Text>
          <Text style={[styles.headerCell, styles.gpaHeader]}>Điểm GPA</Text>
        </View>

        {/* Table Rows */}
        {transcriptData.map((entry, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.cell, styles.subjectCell]}>{entry.subject}</Text>
            <Text style={[styles.cell, styles.gradeCell]}>{entry.semesterGrade}</Text>
            <Text style={[styles.cell, styles.gradeCell]}>{entry.finalGrade}</Text>
            <Text style={[styles.cell, styles.gpaCell]}>{entry.gpa}</Text>
          </View>
        ))}
      </View>
    </Container>
  );
};

export default TranscriptScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#4A90E2',
    textAlign: 'center',
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#E6F0FA',
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
    paddingVertical: 10,
  },
  headerCell: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4A90E2',
  },
  subjectHeader: {
    flex: 3,
    textAlign: 'left',
    paddingLeft: 10,
  },
  gradeHeader: {
    flex: 1,
  },
  gpaHeader: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#F0F8FF',
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
    paddingVertical: 10,
    marginBottom: 5,
  },
  cell: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  subjectCell: {
    flex: 3,
    textAlign: 'left',
    paddingLeft: 10,
  },
  gradeCell: {
    flex: 1,
  },
  gpaCell: {
    flex: 1,
  },
});
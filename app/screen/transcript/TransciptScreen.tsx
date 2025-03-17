import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container } from '@/app/src/components';
import TableComponent from '../../src/components/TableComponent'; // Adjust the path as needed
import { sizes } from '../../src/constants/sizes';

// Define the shape of each table row entry
interface TranscriptEntry {
  subject: string;
  semesterGrade: string;
  finalGrade: string;
  gpa: string;
}

// Define the shape of each table cell data (matches TableComponent)
interface TableCellData {
  key: string;
  value: string | number;
}

// Define the shape of a column configuration (matches TableComponent)
interface TableColumn {
  key: string;
  header: string;
  flex?: number;
  align?: 'left' | 'center' | 'right';
  color?: 'Dark' | 'Azure_Radiance' | 'Light_Sky_Blue' | 'Soft_Blue' | 'Pastel_Gold' | 'Pastel_Purple' | 'Black' | 'White';
  size?: number;
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

// Transform transcriptData into the format expected by TableComponent
const tableData: TableCellData[][] = transcriptData.map((entry) => [
  { key: 'subject', value: entry.subject },
  { key: 'semesterGrade', value: entry.semesterGrade },
  { key: 'finalGrade', value: entry.finalGrade },
  { key: 'gpa', value: entry.gpa },
]);

// Define columns configuration
const columns: TableColumn[] = [
  { key: 'subject', header: 'Tên môn', flex: 3, align: 'left' },
  { key: 'semesterGrade', header: 'Điểm trung kỳ', flex: 1, align: 'center' },
  { key: 'finalGrade', header: 'Điểm cuối kỳ', flex: 1, align: 'center' },
  { key: 'gpa', header: 'Điểm GPA', flex: 1, align: 'center' },
];

const TranscriptScreen = () => {
  return (
    <Container isScroll={true}>
      <View style={styles.container}>
        <Text style={styles.title}>Kết quả học tập</Text>
        <Text style={styles.subtitle}>HK2(2024-2025)</Text>

        {/* Use the TableComponent */}
        <TableComponent
          data={tableData}
          columns={columns}
          headerColor="Black"
          headerSize={sizes.title = 15}
          rowColor="Black"
          rowSize={sizes.text}
          borderColor="Black"
          backgroundColor="White"
        />
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
});
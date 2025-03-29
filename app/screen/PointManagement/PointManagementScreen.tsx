import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Container } from '@/app/src/components';

const initialData = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    studentId: 'SV001',
    class: 'IT01',
    isExcused: false,
    isUnexcused: false,
    note: 'Bị ốm'
  },
  {
    id: 2,
    name: 'Trần Thị B',
    studentId: 'SV002',
    class: 'IT02',
    isExcused: false,
    isUnexcused: false,
    note: ''
  },
  {
    id: 3,
    name: 'Lê Thị C',
    studentId: 'SV003',
    class: 'IT03',
    isExcused: false,
    isUnexcused: false,
    note: 'Đi muộn'
  },
  {
    id: 4,
    name: 'Phạm Văn D',
    studentId: 'SV004',
    class: 'IT01',
    isExcused: false,
    isUnexcused: false,
    note: ''
  }
];

const PointManagementScreen = () => {
  const [attendanceData, setAttendanceData] = useState(initialData);

  // Giả sử tổng số buổi học là 20
  const totalSessions = 20;

  const toggleExcused = (id) => {
    setAttendanceData(prevData =>
      prevData.map(item => {
        if (item.id === id) {
          const newExcused = !item.isExcused;
          return { ...item, isExcused: newExcused, isUnexcused: newExcused ? false : item.isUnexcused };
        }
        return item;
      })
    );
  };

  const toggleUnexcused = (id) => {
    setAttendanceData(prevData =>
      prevData.map(item => {
        if (item.id === id) {
          const newUnexcused = !item.isUnexcused;
          return { ...item, isUnexcused: newUnexcused, isExcused: newUnexcused ? false : item.isExcused };
        }
        return item;
      })
    );
  };

  const handleSave = () => {
    // Trong thực tế, lưu thông tin vào server hoặc local storage
    console.log('Saved attendance data:', attendanceData);
    Alert.alert('Thông báo', 'Thông tin điểm danh đã được lưu!');
  };

  return (
    <Container>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Bảng Điểm Danh</Text>
          {/* Bảng cuộn ngang */}
          <ScrollView horizontal>
            <View>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableCell, styles.colSTT]}>STT</Text>
                <Text style={[styles.tableCell, styles.colName]}>Tên SV</Text>
                <Text style={[styles.tableCell, styles.colStudentId]}>Mã SV</Text>
                <Text style={[styles.tableCell, styles.colClass]}>Lớp</Text>
                <Text style={[styles.tableCell, styles.colExcused]}>Có Phép</Text>
                <Text style={[styles.tableCell, styles.colUnexcused]}>Không Phép</Text>
                <Text style={[styles.tableCell, styles.colTotalAbsent]}>Số Buổi Nghỉ</Text>
                <Text style={[styles.tableCell, styles.colPercentage]}>% Nghỉ</Text>
                <Text style={[styles.tableCell, styles.colNote]}>Ghi Chú</Text>
              </View>
              {attendanceData.map((item, index) => {
                const absentExcused = item.isExcused ? 1 : 0;
                const absentUnexcused = item.isUnexcused ? 1 : 0;
                const totalAbsent = absentExcused + absentUnexcused;
                const absencePercentage = `${((totalAbsent / totalSessions) * 100).toFixed(0)}%`;
                return (
                  <View key={item.id} style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.colSTT]}>{index + 1}</Text>
                    <Text style={[styles.tableCell, styles.colName]}>{item.name}</Text>
                    <Text style={[styles.tableCell, styles.colStudentId]}>{item.studentId}</Text>
                    <Text style={[styles.tableCell, styles.colClass]}>{item.class}</Text>
                    <View style={[styles.tableCell, styles.colExcused, { padding: 0 }]}>
                      <CheckBox
                        checked={item.isExcused}
                        onPress={() => toggleExcused(item.id)}
                        containerStyle={styles.checkboxContainer}
                      />
                    </View>
                    <View style={[styles.tableCell, styles.colUnexcused, { padding: 0 }]}>
                      <CheckBox
                        checked={item.isUnexcused}
                        onPress={() => toggleUnexcused(item.id)}
                        containerStyle={styles.checkboxContainer}
                      />
                    </View>
                    <Text style={[styles.tableCell, styles.colTotalAbsent]}>{totalAbsent}</Text>
                    <Text style={[styles.tableCell, styles.colPercentage]}>{absencePercentage}</Text>
                    <Text style={[styles.tableCell, styles.colNote]}>{item.note}</Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Lưu điểm danh</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    textAlign: 'center',
    paddingHorizontal: 5,
    color: '#333',
    justifyContent: 'center',
  },
  colSTT: { width: 50 },
  colName: { width: 150 },
  colStudentId: { width: 100 },
  colClass: { width: 100 },
  colExcused: { width: 100 },
  colUnexcused: { width: 100 },
  colTotalAbsent: { width: 120 },
  colPercentage: { width: 120 },
  colNote: { width: 150 },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    alignSelf: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PointManagementScreen;

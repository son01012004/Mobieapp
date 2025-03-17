import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Cần cài đặt thư viện này
import { Ionicons } from '@expo/vector-icons'; // Hoặc react-native-vector-icons

const RegisterForCoursesScreen = () => {
  // State cho bộ lọc HK
  const [selectedHK, setSelectedHK] = useState<string>('HK2 (2024-2025)'); // Định nghĩa kiểu cho selectedHK

  // Dữ liệu mẫu cho bảng
  const coursesData = [
    {
      stt: 1,
      maLopHP: '010100475005',
      tenMonHoc: 'Học máy có đần',
      lopHoc: 'D17CNPM5',
      tc: 3,
      nhomTH: '1,770,000',
      hanNop: 'Đăng ký mới',
      thu: '27/11/2024',
      trangThaiDK: 'Đã khóa',
    },
    {
      stt: 2,
      maLopHP: '010100113205',
      tenMonHoc: 'Kiếm thu va đấm bao chắt lưng PM',
      lopHoc: 'D17CNPM5',
      tc: 2,
      nhomTH: '1,180,000',
      hanNop: 'Đăng ký mới',
      thu: '28/11/2024',
      trangThaiDK: 'Đã khóa',
    },
    {
      stt: 3,
      maLopHP: '010100142702',
      tenMonHoc: 'Lập trình hệ thống',
      lopHoc: 'D17CNPM2',
      tc: 2,
      nhomTH: '1,180,000',
      hanNop: 'Đăng ký mới',
      thu: '26/11/2024',
      trangThaiDK: 'Đã khóa',
    },
    {
      stt: 4,
      maLopHP: '010100429402',
      tenMonHoc: 'Lập trình thiệt bi điều',
      lopHoc: 'D17CNPM2',
      tc: 3,
      nhomTH: '1,770,000',
      hanNop: 'Đăng ký mới',
      thu: '28/11/2024',
      trangThaiDK: 'Đã khóa',
    },
    {
      stt: 5,
      maLopHP: '010100475405',
      tenMonHoc: 'Lập trình web nâng cao',
      lopHoc: 'D17CNPM5',
      tc: 4,
      nhomTH: '2,360,000',
      hanNop: 'Đăng ký mới',
      thu: '26/11/2024',
      trangThaiDK: 'Đã khóa',
    },
    {
      stt: 6,
      maLopHP: '010100195705',
      tenMonHoc: 'Phân mêm mã nguồn mỏ',
      lopHoc: 'D17CNPM5',
      tc: 2,
      nhomTH: '1,180,000',
      hanNop: 'Đăng ký mới',
      thu: '27/11/2024',
      trangThaiDK: 'Đã khóa',
    },
    {
      stt: 7,
      maLopHP: '010100223402',
      tenMonHoc: 'Quản trị duy CNTT',
      lopHoc: 'D17CNPM2',
      tc: 2,
      nhomTH: '1,180,000',
      hanNop: 'Đăng ký mới',
      thu: '26/11/2024',
      trangThaiDK: 'Đã khóa',
    },
    {
      stt: 8,
      maLopHP: '010100475802',
      tenMonHoc: 'Triều nhẫn tao',
      lopHoc: 'D17CNPM2',
      tc: 3,
      nhomTH: '1,770,000',
      hanNop: 'Đăng ký mới',
      thu: '26/11/2024',
      trangThaiDK: 'Đã khóa',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Tiêu đề */}
      <View style={styles.header}>
        <Text style={styles.title}>Đăng ký học phần</Text>
      </View>

      {/* Bộ lọc */}
      <View style={styles.filterContainer}>
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>HK</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedHK}
              onValueChange={(itemValue: string) => setSelectedHK(itemValue)} // Định nghĩa kiểu cho itemValue
              style={styles.picker}
            >
              <Picker.Item label="HK2 (2024-2025)" value="HK2 (2024-2025)" />
              <Picker.Item label="HK1 (2023-2024)" value="HK1 (2023-2024)" />
            </Picker>
          </View>
        </View>
        <View style={styles.filterButtons}>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Học mới</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Học lại</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Học cải thiện</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bảng dữ liệu */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>STT</Text>
          <Text style={styles.headerCell}>Mã lớp HP</Text>
          <Text style={styles.headerCell}>Tên môn học/HP</Text>
          <Text style={styles.headerCell}>Lớp học cụ thể</Text>
          <Text style={styles.headerCell}>TC</Text>
          <Text style={styles.headerCell}>Nhóm TH</Text>
          <Text style={styles.headerCell}>Học phí</Text>
          <Text style={styles.headerCell}>Hạn nộp</Text>
          <Text style={styles.headerCell}>Thu</Text>
          <Text style={styles.headerCell}>Trạng thái ĐK</Text>
          <Text style={styles.headerCell}>Ngày ĐK</Text>
          <Text style={styles.headerCell}>TT lớp HP</Text>
        </View>
        {coursesData.map((course, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.cell}>{course.stt}</Text>
            <Text style={styles.cell}>{course.maLopHP}</Text>
            <Text style={styles.cell}>{course.tenMonHoc}</Text>
            <Text style={styles.cell}>{course.lopHoc}</Text>
            <Text style={styles.cell}>{course.tc}</Text>
            <Text style={styles.cell}>{course.nhomTH}</Text>
            <Text style={styles.cell}>{course.hanNop}</Text>
            <Text style={styles.cell}>{course.thu}</Text>
            <Text style={styles.cell}>{course.trangThaiDK}</Text>
            {/* <Text style={styles.cell}>{course.ngayDK}</Text> */}
            <Text style={styles.cell}>Đã khóa</Text>
          </View>
        ))}
      </View>

      {/* Nút Lưu */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Lưu HP đã đăng ký trong học kỳ này</Text>
      </TouchableOpacity>

      {/* Sidebar (nếu cần) */}
      <View style={styles.sidebar}>
        <Text style={styles.sidebarText}>1. Môn học đã chọn</Text>
        <Text style={styles.sidebarText}>2. Lớp học đã chọn</Text>
        <Text style={styles.sidebarText}>3. Đã đăng ký</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  header: {
    backgroundColor: '#d3d3d3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  filterContainer: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  pickerWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  picker: {
    height: 40,
    width: '100%',
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButton: {
    backgroundColor: '#ddd',
    padding: 5,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  filterButtonText: {
    fontSize: 14,
  },
  table: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#6B46C1',
    padding: 10,
  },
  headerCell: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sidebar: {
    backgroundColor: '#d3d3d3',
    padding: 10,
    borderRadius: 5,
  },
  sidebarText: {
    fontSize: 14,
    marginVertical: 5,
  },
});

export default RegisterForCoursesScreen;
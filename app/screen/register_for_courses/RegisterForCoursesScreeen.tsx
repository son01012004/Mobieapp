import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import TableComponent from '../../src/components/TableComponent'; // Adjust the path as needed
import { colors, ColorType } from '../../src/constants/colors';
import { sizes } from '../../src/constants/sizes';

// Define the shape of each course entry
interface CourseEntry {
  stt: number;
  maLopHP: string;
  tenMonHoc: string;
  lopHoc: string;
  tc: number;
  nhomTH: string;
  hanNop: string;
  thu: string;
  trangThaiDK: string;
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
  color?: ColorType;
  size?: number;
}

const RegisterForCoursesScreen = () => {
  // State cho bộ lọc HK
  const [selectedHK, setSelectedHK] = useState<string>('HK2 (2024-2025)');

  // Dữ liệu mẫu cho bảng
  const coursesData: CourseEntry[] = [
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

  // Transform coursesData into the format expected by TableComponent
  const tableData: TableCellData[][] = coursesData.map((course) => [
    { key: 'stt', value: course.stt },
    { key: 'tenMonHoc', value: course.tenMonHoc },
    { key: 'lopHoc', value: course.lopHoc },
    { key: 'tc', value: course.tc },
    { key: 'nhomTH', value: course.nhomTH },
    { key: 'trangThaiDK', value: course.trangThaiDK },
    { key: 'ttLop', value: course.trangThaiDK },
  ]);

  // Define columns configuration
  const columns: TableColumn[] = [
    { key: 'stt', header: 'STT', flex: 0.5, align: 'center' },
    { key: 'tenMonHoc', header: 'Tên môn học/HP', flex: 2, align: 'left' },
    { key: 'lopHoc', header: 'Lớp học', flex: 1, align: 'center' },
    { key: 'tc', header: 'TC', flex: 0.5, align: 'center' },
    { key: 'nhomTH', header: 'Nhóm TH', flex: 1, align: 'center' },
    { key: 'trangThaiDK', header: 'Trạng thái ĐK', flex: 1, align: 'center' },
    { key: 'ttLop', header: 'TT Lop', flex: 1, align: 'center' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Đăng ký học phần</Text>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Replace with your logo URL
          style={styles.logo}
        />
      </View>

      {/* Filter Section */}
      <View style={styles.filterSection}>
        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Học kỳ:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedHK}
              onValueChange={(itemValue: string) => setSelectedHK(itemValue)}
              style={styles.picker}
              dropdownIconColor={colors.Dark}
            >
              <Picker.Item label="HK2 (2024-2025)" value="HK2 (2024-2025)" />
              <Picker.Item label="HK1 (2023-2024)" value="HK1 (2023-2024)" />
            </Picker>
          </View>
        </View>
        <View style={styles.filterButtons}>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="school" size={16} color={colors.White} />
            <Text style={styles.filterButtonText}>Học mới</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="refresh" size={16} color={colors.White} />
            <Text style={styles.filterButtonText}>Học lại</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="star" size={16} color={colors.White} />
            <Text style={styles.filterButtonText}>Học cải thiện</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Table Section */}
      <View style={styles.tableSection}>
        <TableComponent
          data={tableData}
          columns={columns}
          headerColor="Azure_Radiance"
          headerSize={sizes.title}
          rowColor="Black"
          rowSize={sizes.text}
          borderColor="Light_Sky_Blue"
          backgroundColor="White"
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={() => alert('Đã lưu đăng ký')}>
        <Text style={styles.saveButtonText}>Lưu học phần đã đăng ký</Text>
      </TouchableOpacity>

      {/* Sidebar Section */}
      <View style={styles.sidebar}>
        <View style={styles.sidebarItem}>
          <Ionicons name="checkmark-circle" size={18} color={colors.Azure_Radiance} />
          <Text style={styles.sidebarText}>Môn học đã chọn: 0</Text>
        </View>
        <View style={styles.sidebarItem}>
          <Ionicons name="people" size={18} color={colors.Azure_Radiance} />
          <Text style={styles.sidebarText}>Lớp học đã chọn: 0</Text>
        </View>
        <View style={styles.sidebarItem}>
          <Ionicons name="save" size={18} color={colors.Azure_Radiance} />
          <Text style={styles.sidebarText}>Đã đăng ký: 0</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFD',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  filterSection: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 16,
    color: '#333333',
    marginRight: 10,
  },
  pickerWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    backgroundColor: '#F5F7FA',
  },
  picker: {
    height: 50,
    color: '#4A90E2',
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButton: {
    flex: 1,
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 5,
  },
  tableSection: {
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  sidebar: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  sidebarText: {
    fontSize: 14,
    color: '#333333',
    marginLeft: 10,
  },
});

export default RegisterForCoursesScreen;
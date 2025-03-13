import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import StepIndicator from 'react-native-step-indicator';

const labels = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"];

const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 35,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#4A90E2",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#4A90E2",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "#4A90E2",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#4A90E2",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#4A90E2",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 14,
  stepIndicatorLabelCurrentColor: "#ffffff",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 14,
  currentStepLabelColor: "#4A90E2"
};

const WeeklySchedule = () => {
  const [currentPosition, setCurrentPosition] = useState(0);

  return (
    <View style={styles.container}>
      {/* Tiêu đề */}
      <Text style={styles.header}>Lịch học theo tuần</Text>

      {/* Step Indicator (Timeline) */}
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentPosition}
        labels={labels}
        stepCount={7}
        onPress={(position) => setCurrentPosition(position)}
      />

      {/* Nội dung lịch học theo ngày */}
      <View style={styles.scheduleContainer}>
        {currentPosition === 0 && (
          <View style={styles.card}>
            <Text style={styles.lessonTitle}>Tiết 1 ➝ 3</Text>
            <Text style={styles.lessonText}>Học máy cơ bản</Text>
            <Text style={styles.lessonText}>Giáo viên: Nguyễn Thị Thanh Tân</Text>
            <Text style={styles.lessonText}>Phòng A306</Text>
          </View>
        )}
        {currentPosition === 1 && (
          <View style={styles.card}>
            <Text style={styles.lessonTitle}>Tiết 4 ➝ 5</Text>
            <Text style={styles.lessonText}>Toán rời rạc</Text>
            <Text style={styles.lessonText}>Phòng B201</Text>
          </View>
        )}
        {currentPosition === 2 && (
          <View style={styles.card}>
            <Text style={styles.lessonTitle}>Tiết 1 ➝ 5</Text>
            <Text style={styles.lessonText}>Kỹ thuật lập trình</Text>
            <Text style={styles.lessonText}>Phòng C103</Text>
          </View>
        )}
        {/* Bạn có thể thêm tiếp cho các ngày khác */}
      </View>
    </View>
  );
};

export default WeeklySchedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 10,
  },
  scheduleContainer: {
    marginTop: 20,
  },
  card: {
    backgroundColor: '#A7DAF8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  lessonTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  lessonText: {
    fontSize: 14,
    color: 'black',
  },
});

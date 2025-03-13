import { Container } from '@/app/src/components';
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import WeeklySchedule from './WeeklySchedule';

const ScheduleScreen = () => {
  const [checked, setChecked] = useState('day');

  return (
    <Container isScroll={true}>
      <ScrollView style={styles.container}>
        {/* Tiêu đề */}
        <Text style={styles.header}>Lịch hôm nay của bạn</Text>

        {/* Chế độ chọn lịch */}
        <View style={styles.radioContainer}>
          <RadioButton.Group onValueChange={value => setChecked(value)} value={checked}>
            <View style={styles.radioItem}>
              <RadioButton value="day" color="black" />
              <Text style={styles.radioText}>Lịch học theo ngày</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton value="week" color="black" />
              <Text style={styles.radioText}>Lịch học theo tuần</Text>
            </View>
          </RadioButton.Group>
        </View>

        {/* Render daily or weekly schedule based on selected option */}
        {checked === 'day' ? (
          <>
            {/* Danh sách tiết học */}
            <View style={[styles.card, { backgroundColor: '#A7DAF8' }]}>
              <Text style={styles.lessonTitle}>Tiết 1 ➝ 3</Text>
              <Text style={styles.lessonText}>Học máy cơ bản</Text>
              <Text style={styles.lessonText}>D17CNPM4-101002005</Text>
              <Text style={styles.lessonText}>Giáo viên: Nguyễn Thị Thanh Tân</Text>
              <Text style={styles.lessonText}>Phòng A306</Text>
            </View>

            <View style={[styles.card, { backgroundColor: '#FAD79E' }]}>
              <Text style={styles.lessonTitle}>Tiết 4 ➝ 5</Text>
              <Text style={styles.lessonText}>Học máy cơ bản</Text>
              <Text style={styles.lessonText}>D17CNPM4-101002005</Text>
              <Text style={styles.lessonText}>Phòng A306</Text>
            </View>

            <View style={[styles.card, { backgroundColor: '#D5B4F3' }]}>
              <Text style={styles.lessonTitle}>Tiết 1 ➝ 5</Text>
              <Text style={styles.lessonText}>Học máy cơ bản</Text>
              <Text style={styles.lessonText}>D17CNPM4-101002005</Text>
              <Text style={styles.lessonText}>Giáo viên: Nguyễn Thị Thanh Tân</Text>
              <Text style={styles.lessonText}>Phòng A105</Text>
            </View>

            {/* Chú thích */}
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#A7DAF8' }]} />
                <Text style={styles.legendText}>Lịch học</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#FAD79E' }]} />
                <Text style={styles.legendText}>Lịch thi</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#D5B4F3' }]} />
                <Text style={styles.legendText}>Lịch thực hành</Text>
              </View>
            </View>
          </>
        ) : (
          <WeeklySchedule />
        )}
      </ScrollView>
    </Container>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 10,
  },
  radioContainer: {
    backgroundColor: '#E7F1FB',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioText: {
    fontSize: 14,
    color: 'black',
  },
  card: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  lessonTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  lessonText: {
    fontSize: 14,
    color: 'black',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 15,
    height: 15,
    borderRadius: 3,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: 'black',
  },
});
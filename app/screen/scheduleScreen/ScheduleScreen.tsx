import { Container, CardComponent } from '@/app/src/components';
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import WeeklySchedule from './WeeklySchedule';
import { colors, ColorType } from '@/app/src/constants/colors';

// Define the Lesson interface with strict type
interface Lesson {
  time: string;
  subject: string;
  studentId: string;
  teacher?: string; // Optional to match your data structure
  room: string;
  type: 'study' | 'exam' | 'practice'; // Strict union type
}

const ScheduleScreen = () => {
  const [checked, setChecked] = useState('day');

  // Define daily lesson data with strict typing
  const dailyLessons: Lesson[] = [
    {
      time: "Tiết 1 ➝ 3",
      subject: "Học máy cơ bản",
      studentId: "D17CNPM4-101002005",
      teacher: "Giáo viên: Nguyễn Thị Thanh Tân",
      room: "Phòng A306",
      type: 'study' as const,
    },
    {
      time: "Tiết 4 ➝ 5",
      subject: "Học máy cơ bản",
      studentId: "D17CNPM4-101002005",
      room: "Phòng A306",
      type: 'exam' as const,
    },
    {
      time: "Tiết 1 ➝ 5",
      subject: "Học máy cơ bản",
      studentId: "D17CNPM4-101002005",
      teacher: "Giáo viên: Nguyễn Thị Thanh Tân",
      room: "Phòng A105",
      type: 'practice' as const,
    },
  ];

  // Function to determine background color based on lesson type
  const getBackgroundColor = (type: 'study' | 'exam' | 'practice'): ColorType => {
    switch (type) {
      case 'study':
        return 'Light_Sky_Blue'; // Return the color name, not the hex value
      case 'exam':
        return 'Pastel_Gold';
      case 'practice':
        return 'Pastel_Purple';
      default:
        return 'Light_Sky_Blue'; // Fallback with defined color name
    }
  };

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
            {dailyLessons.map((lesson, index) => (
              <CardComponent
                key={index}
                title={lesson.time}
                description={[
                  { text: lesson.subject, icon: '📚' },
                  { text: lesson.studentId, icon: '📝' },
                  { text: lesson.teacher || '', icon: '👩‍🏫' }, // Handle optional teacher
                  { text: lesson.room, icon: '🏫' },
                ]}
                backgroundColor={getBackgroundColor(lesson.type)}
              />
            ))}

            {/* Chú thích */}
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: colors.Light_Sky_Blue }]} />
                <Text style={styles.legendText}>Lịch học</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: colors.Pastel_Gold }]} />
                <Text style={styles.legendText}>Lịch thi</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: colors.Pastel_Purple }]} />
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
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { CardComponent } from '../../src/components';
import { colors, ColorType } from '../../src/constants/colors';
import { Lesson } from '../../src/types/schedule';
import { fetchStudentScheduleByWeek } from '../../src/services/scheduleService';
import DateTimePicker from '@react-native-community/datetimepicker';

interface WeeklyScheduleProps {
  selectedDate: Date;
  studentId: string;
  semesterId: number;
}

const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ selectedDate, studentId, semesterId }) => {
  const [weeklyLessons, setWeeklyLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date>(selectedDate);
  const [endDate, setEndDate] = useState<Date>(new Date(selectedDate.getTime() + 6 * 24 * 60 * 60 * 1000));
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  useEffect(() => {
    fetchWeeklySchedule();
  }, [studentId, semesterId, startDate]);

  const fetchWeeklySchedule = async () => {
    setLoading(true);
    setError(null);
    try {
      const startDateString = startDate.toISOString().split('T')[0];
      const endDateString = endDate.toISOString().split('T')[0];
      console.log('Debug: fetchWeeklySchedule - Params:', { studentId, startDate: startDateString, endDate: endDateString, semesterId });
      const schedules = await fetchStudentScheduleByWeek(studentId, startDateString, endDateString, semesterId);
      console.log('Debug: WeeklySchedule - Raw API Response:', schedules);

      if (!Array.isArray(schedules)) {
        throw new Error('Dữ liệu trả về từ API không phải là mảng');
      }

      const lessons: Lesson[] = schedules.map(schedule => ({
        time: `${new Date(schedule.startTime).getHours()}:00 ➝ ${new Date(schedule.endTime).getHours()}:00`,
        subject: schedule.subject || 'Chưa có môn học',
        studentId: studentId || '',
        teacher: schedule.teacher || 'Chưa có giáo viên',
        room: schedule.room || 'Chưa có phòng',
        color: getBackgroundColor(schedule.type),
        type: schedule.type || 'study',
        date: new Date(schedule.startTime).toISOString().split('T')[0],
      }));
      console.log('Debug: WeeklySchedule - Mapped Lessons:', lessons);
      setWeeklyLessons(lessons);
    } catch (err: any) {
      console.error('Debug: WeeklySchedule - Error fetching schedule:', err.message);
      setError('Không thể tải lịch học tuần. Vui lòng thử lại sau hoặc liên hệ quản trị viên.');
      const mockSchedules = [
        {
          startTime: new Date(`${startDate.toISOString().split('T')[0]}T09:00:00`),
          endTime: new Date(`${startDate.toISOString().split('T')[0]}T11:00:00`),
          subject: 'Toán',
          teacher: 'Nguyễn Văn B',
          room: 'Phòng 101',
          type: 'study' as 'study',
        },
      ];
      const lessons: Lesson[] = mockSchedules.map(schedule => ({
        time: `${new Date(schedule.startTime).getHours()}:00 ➝ ${new Date(schedule.endTime).getHours()}:00`,
        subject: schedule.subject,
        studentId: studentId || '',
        teacher: schedule.teacher,
        room: schedule.room,
        color: getBackgroundColor(schedule.type),
        type: schedule.type as 'study' | 'exam' | 'practice',
        date: new Date(schedule.startTime).toISOString().split('T')[0],
      }));
      setWeeklyLessons(lessons);
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundColor = (type: 'study' | 'exam' | 'practice'): ColorType => {
    switch (type) {
      case 'study':
        return 'Light_Sky_Blue';
      case 'exam':
        return 'Pastel_Gold';
      case 'practice':
        return 'Pastel_Purple';
      default:
        return 'Light_Sky_Blue';
    }
  };

  const onDateChange = (event: any, selected: Date | undefined) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selected) {
      setStartDate(selected);
      setEndDate(new Date(selected.getTime() + 6 * 24 * 60 * 60 * 1000));
    }
  };

  if (loading) return <Text style={styles.loading}>Đang tải...</Text>;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.datePickerContainer}>
        <Text style={styles.dateLabel}>
          Tuần từ {startDate.toISOString().split('T')[0]} đến {endDate.toISOString().split('T')[0]}
        </Text>
        <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.datePickerButtonText}>Chọn ngày bắt đầu</Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
          onChange={onDateChange}
        />
      )}

      {weeklyLessons.length === 0 ? (
        <Text style={styles.noDataText}>Không có lịch học trong tuần này</Text>
      ) : (
        <ScrollView>
          {weeklyLessons.map((lesson, index) => (
            <CardComponent
              key={index}
              title={`${lesson.date} | ${lesson.time}`}
              description={[
                { text: lesson.subject, icon: '📚' },
                { text: lesson.studentId || '', icon: '📝' },
                { text: lesson.teacher || '', icon: '👩‍🏫' },
                { text: lesson.room, icon: '🏫' },
              ]}
              backgroundColor={lesson.color as ColorType}
            />
          ))}
        </ScrollView>
      )}

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: 'white' },
  loading: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#4A90E2' },
  error: { textAlign: 'center', marginTop: 20, fontSize: 16, color: 'red' },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  dateLabel: { fontSize: 14, color: '#4A90E2' },
  datePickerButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  datePickerButtonText: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
  legendContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  legendColor: { width: 15, height: 15, borderRadius: 3, marginRight: 5 },
  legendText: { fontSize: 12, color: 'black' },
  noDataText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#666' },
});

export default WeeklySchedule;
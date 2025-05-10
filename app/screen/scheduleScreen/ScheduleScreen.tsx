import { Container, CardComponent } from '../../src/components';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import WeeklySchedule from './WeeklySchedule';
import { colors, ColorType } from '../../src/constants/colors';
import { getProfile } from '../../src/api/authService';
import { useSchedule } from '../../src/context/ScheduleContext';
import { fetchStudentScheduleByDay } from '../../src/services/scheduleService';
import { Lesson } from '../../src/types/schedule';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabParamList } from '../../src/routers/TabNavigator';
import DateTimePicker from '@react-native-community/datetimepicker'; // Thêm import

interface ScheduleScreenProps {
  route: RouteProp<TabParamList, 'ScheduleScreenTab'>;
  navigation: NativeStackNavigationProp<TabParamList, 'ScheduleScreenTab'>;
}

const ScheduleScreen: React.FC<ScheduleScreenProps> = ({ route, navigation }) => {
  const { studentId, setStudentId } = useSchedule();
  const [checked, setChecked] = useState<'day' | 'week'>('day');
  const [dailyLessons, setDailyLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isProfileFetched, setIsProfileFetched] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Ngày được chọn
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false); // Hiển thị calendar picker

  useEffect(() => {
    const fetchProfile = async () => {
      if (!isProfileFetched) {
        try {
          const profile = await getProfile();
          console.log('Debug: ScheduleScreen - Profile:', profile);
          if (profile.studentId) {
            setStudentId(profile.studentId.toString());
          } else {
            setError('Student ID không được tìm thấy trong hồ sơ');
          }
          setIsProfileFetched(true);
        } catch (err) {
          console.error('Debug: ScheduleScreen - Error fetching profile:', err);
          setError('Không thể tải thông tin hồ sơ');
          setIsProfileFetched(true);
        }
      }
    };
    fetchProfile();
  }, [isProfileFetched]);

  useEffect(() => {
    if (studentId && isProfileFetched) {
      console.log('Debug: ScheduleScreen - Fetching schedule for studentId:', studentId, 'checked:', checked);
      fetchDailySchedule();
    } else {
      console.log('Debug: ScheduleScreen - studentId or profile not ready:', { studentId, isProfileFetched });
    }
  }, [studentId, checked, isProfileFetched, selectedDate]); // Thêm selectedDate vào dependency

  const fetchDailySchedule = async () => {
    setLoading(true);
    setError(null);
    try {
      const dateString = selectedDate.toISOString().split('T')[0]; // Định dạng YYYY-MM-DD
      console.log('Debug: fetchDailySchedule - Params:', { studentId, date: dateString });
      if (!studentId) {
        throw new Error('Student ID is null');
      }
      const schedules = await fetchStudentScheduleByDay(studentId, dateString);
      console.log('Debug: ScheduleScreen - Schedules from API:', schedules);

      const lessons: Lesson[] = schedules.map(schedule => ({
        time: `${new Date(schedule.startTime).getHours()}:00 ➝ ${new Date(schedule.endTime).getHours()}:00`,
        subject: schedule.subject,
        studentId: studentId || '',
        teacher: schedule.teacher,
        room: schedule.room,
        color: getBackgroundColor(schedule.type),
        type: schedule.type,
      }));
      setDailyLessons(lessons);
    } catch (err: any) {
      console.error('Debug: ScheduleScreen - Error fetching schedule:', err);
      setError('Không thể tải lịch học. Vui lòng thử lại sau hoặc liên hệ quản trị viên.');
      const mockSchedules = [
        {
          startTime: new Date(`${selectedDate.toISOString().split('T')[0]}T09:00:00`),
          endTime: new Date(`${selectedDate.toISOString().split('T')[0]}T11:00:00`),
          subject: 'Toán',
          teacher: 'Nguyễn Văn B',
          room: 'Phòng 101',
          type: 'study' as 'study' | 'exam' | 'practice',
        },
      ];
      const lessons: Lesson[] = mockSchedules.map(schedule => ({
        time: `${new Date(schedule.startTime).getHours()}:00 ➝ ${new Date(schedule.endTime).getHours()}:00`,
        subject: schedule.subject,
        studentId: studentId || '',
        teacher: schedule.teacher,
        room: schedule.room,
        color: getBackgroundColor(schedule.type),
        type: schedule.type,
      }));
      setDailyLessons(lessons);
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
    setShowDatePicker(Platform.OS === 'ios'); // Ẩn picker trên Android sau khi chọn
    if (selected) {
      setSelectedDate(selected);
    }
  };

  console.log('Debug: ScheduleScreen - State:', { loading, error, dailyLessons });

  if (loading) return <Text style={styles.loading}>Đang tải...</Text>;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <Container isScroll={true}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Lịch của bạn</Text>

        <View style={styles.datePickerContainer}>
          <Text style={styles.dateLabel}>Ngày được chọn: {selectedDate.toISOString().split('T')[0]}</Text>
          <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.datePickerButtonText}>Chọn ngày</Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
            onChange={onDateChange}
          />
        )}

        <View style={styles.radioContainer}>
          <View style={styles.radioItem}>
            <TouchableOpacity style={styles.radioButton} onPress={() => setChecked('day')}>
              <View style={styles.radioOuterCircle}>
                {checked === 'day' && <View style={styles.radioInnerCircle} />}
              </View>
            </TouchableOpacity>
            <Text style={styles.radioText}>Lịch học theo ngày</Text>
          </View>
          <View style={styles.radioItem}>
            <TouchableOpacity style={styles.radioButton} onPress={() => setChecked('week')}>
              <View style={styles.radioOuterCircle}>
                {checked === 'week' && <View style={styles.radioInnerCircle} />}
              </View>
            </TouchableOpacity>
            <Text style={styles.radioText}>Lịch học theo tuần</Text>
          </View>
        </View>

        {checked === 'day' ? (
          <>
            {dailyLessons.length === 0 ? (
              <Text style={styles.noDataText}>Không có lịch học vào ngày này</Text>
            ) : (
              dailyLessons.map((lesson, index) => (
                <CardComponent
                  key={index}
                  title={lesson.time}
                  description={[
                    { text: lesson.subject, icon: '📚' },
                    { text: lesson.studentId || '', icon: '📝' },
                    { text: lesson.teacher || '', icon: '👩‍🏫' },
                    { text: lesson.room, icon: '🏫' },
                  ]}
                  backgroundColor={lesson.color as ColorType}
                />
              ))
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
          </>
        ) : (
          <WeeklySchedule selectedDate={selectedDate} studentId={studentId} />
        )}
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: 'white' },
  loading: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#4A90E2' },
  error: { textAlign: 'center', marginTop: 20, fontSize: 16, color: 'red' },
  header: { fontSize: 18, fontWeight: 'bold', color: '#4A90E2', marginBottom: 10 },
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
  radioContainer: { backgroundColor: '#E7F1FB', padding: 10, borderRadius: 8, marginBottom: 15 },
  radioItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  radioButton: { padding: 5 },
  radioOuterCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInnerCircle: { width: 10, height: 10, borderRadius: 5, backgroundColor: 'black' },
  radioText: { fontSize: 14, color: 'black', marginLeft: 10 },
  legendContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  legendColor: { width: 15, height: 15, borderRadius: 3, marginRight: 5 },
  legendText: { fontSize: 12, color: 'black' },
  noDataText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#666' },
});

export default ScheduleScreen;
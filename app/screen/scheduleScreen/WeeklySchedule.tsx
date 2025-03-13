import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PrintIcon from 'react-native-vector-icons/MaterialIcons';
import CalendarPicker from 'react-native-calendar-picker';
import Modal from 'react-native-modal';

const labels = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6"] as const;

interface Lesson {
  time: string;
  subject: string;
  teacher: string;
  room: string;
  color: string;
  type: 'study' | 'exam';
}

interface DaySchedule {
  day: string;
  lessons: Lesson[];
}

const scheduleData: DaySchedule[] = [
  {
    day: "Thứ 2",
    lessons: [
      { time: "Tiết 1 ➝ 3", subject: "Học máy cơ bản", teacher: "Nguyễn Thị Thanh Tân", room: "A306", color: "#A7DAF8", type: "study" },
      { time: "Tiết 4 ➝ 5", subject: "Toán rời rạc", teacher: "Lê Minh Tâm", room: "B201", color: "#F7D794", type: "study" }
    ]
  },
  {
    day: "Thứ 3",
    lessons: [
      { time: "Tiết 1 ➝ 5", subject: "Kỹ thuật lập trình", teacher: "Nguyễn Văn Nam", room: "C103", color: "#DAB6FC", type: "study" }
    ]
  },
  {
    day: "Thứ 4",
    lessons: []
  },
  {
    day: "Thứ 5",
    lessons: []
  },
  {
    day: "Thứ 6",
    lessons: [
      { time: "Tiết 2 ➝ 4", subject: "Cấu trúc dữ liệu", teacher: "Trần Hữu Nghĩa", room: "D202", color: "#85E3FF", type: "exam" }
    ]
  }
];

const WeeklySchedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'all' | 'study' | 'exam'>('all');
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const handlePreviousWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 7);
    setSelectedDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 7);
    setSelectedDate(newDate);
  };

  const handleDatePress = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const handleCurrent = () => {
    setSelectedDate(new Date());
  };

  const handlePrint = () => {
    console.log("Print schedule");
  };

  const handleBack = () => {
    console.log("Go back");
  };

  const formatDate = (date: Date): string => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const daysWithLessons = labels
    .map((day, index) => ({
      day,
      index,
      lessons: (scheduleData.find(s => s.day === day) || { lessons: [] }).lessons.filter(
        lesson => viewMode === 'all' || lesson.type === viewMode
      )
    }))
    .filter(day => day.lessons.length > 0);

  const screenWidth = Dimensions.get('window').width ;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Lịch học theo tuần</Text>

      <View style={styles.topRowContainer}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setViewMode('all')}
          >
            <View style={[styles.toggleCircle, viewMode === 'all' && styles.toggleCircleSelected]} />
            <Text style={styles.toggleText}>Tất cả</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setViewMode('study')}
          >
            <View style={[styles.toggleCircle, viewMode === 'study' && styles.toggleCircleSelected]} />
            <Text style={styles.toggleText}>Lịch học</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setViewMode('exam')}
          >
            <View style={[styles.toggleCircle, viewMode === 'exam' && styles.toggleCircleSelected]} />
            <Text style={styles.toggleText}>Lịch thi</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.dateButton} onPress={handleDatePress}>
          <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
          <Icon name="calendar" size={16} color="#4A90E2" style={styles.dateIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.actionRowContainer}>
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCurrent}>
            <Icon name="clock-o" size={16} color="#4A90E2" />
            <Text style={styles.actionText}>Hiện tại</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleBack}>
            <Icon name="arrow-left" size={16} color="#4A90E2" />
            <Text style={styles.actionText}>Trở về</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleNextWeek}>
            <Icon name="chevron-right" size={16} color="#4A90E2" />
            <Text style={styles.actionText}>Tiếp </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        isVisible={showDatePicker}
        onBackdropPress={() => setShowDatePicker(false)}
        style={styles.modal}
      >
        <View style={[styles.calendarContainer, { width: screenWidth }]}>
          <Text style={styles.calendarHeader}>
            Tháng {selectedDate.getMonth() + 1} {selectedDate.getFullYear()}
          </Text>
          <CalendarPicker
            onDateChange={handleDateChange}
            selectedDayColor="#4A90E2"
            selectedDayTextColor="#FFFFFF"
            todayBackgroundColor="#E6F0FA"
            minDate={new Date(2023, 0, 1)}
            maxDate={new Date(2026, 11, 31)}
            initialDate={selectedDate}
            startFromMonday={true} // Start the week from Monday
            weekdays={['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']} // Correct weekday order
            months={[
              'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
              'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
            ]}
            previousTitle="Trước"
            nextTitle="Sau"
            textStyle={{ fontSize: 14, color: '#4A90E2' }}
            selectedDayStyle={{ borderRadius: 15 }}
            todayTextStyle={{ fontWeight: 'bold' }}
            showDayStragglers={true} // Show days from previous/next month
          />
        </View>
      </Modal>

      <View style={styles.scheduleContainer}>
        {labels.map((day, index) => {
          const daySchedule = scheduleData.find(s => s.day === day) || { lessons: [] };
          const filteredLessons = daySchedule.lessons.filter(
            lesson => viewMode === 'all' || lesson.type === viewMode
          );
          if (filteredLessons.length > 0) {
            const isLast = daysWithLessons[daysWithLessons.length - 1].index === index;

            return (
              <View key={index} style={styles.row}>
                <View style={styles.stepContainer}>
                  <View style={styles.stepCircle}>
                    <Text style={styles.stepNumber}>{index + 1}</Text>
                  </View>
                  {!isLast && <View style={styles.separator} />}
                </View>

                <View style={styles.dayContent}>
                  <Text style={styles.dayTitle}>{day}</Text>
                  <View style={styles.lessonContainer}>
                    {filteredLessons.map((lesson, lessonIndex) => (
                      <View key={lessonIndex} style={[styles.card, { backgroundColor: lesson.color }]}>
                        <Text style={styles.lessonTitle}>{lesson.time}</Text>
                        <Text style={styles.lessonText}>📚 {lesson.subject}</Text>
                        <Text style={styles.lessonText}>👨‍🏫 {lesson.teacher}</Text>
                        <Text style={styles.lessonText}>🏫 {lesson.room}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            );
          }
          return null;
        })}

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
      </View>
    </ScrollView>
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
    textAlign: 'center',
  },
  topRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionRowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  toggleCircle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: 2,
    borderColor: '#4A90E2',
    backgroundColor: 'white',
    marginRight: 5,
  },
  toggleCircleSelected: {
    backgroundColor: '#4A90E2',
  },
  toggleText: {
    fontSize: 14,
    color: '#4A90E2',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F0FA',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#4A90E2',
  },
  dateIcon: {
    marginLeft: 5,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  actionText: {
    fontSize: 14,
    color: '#4A90E2',
    marginLeft: 5,
  },
  scheduleContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  stepContainer: {
    alignItems: 'center',
    width: 60,
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  stepNumber: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  separator: {
    width: 2,
    height: '100%',
    backgroundColor: '#4A90E2',
    position: 'absolute',
    top: 30,
    bottom: 0,
  },
  dayContent: {
    flex: 1,
    paddingLeft: 20,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 5,
  },
  lessonContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  card: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 5,
    width: '100%',
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
    marginTop: 20,
    paddingLeft: 80,
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
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  calendarContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 10,
  },
  calendarHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
    textAlign: 'center',
    marginBottom: 10,
  },
});
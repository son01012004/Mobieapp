import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Container } from '@/app/src/components';

const NotificationScreen = () => {
  const notifications = [
    { id: 1, title: 'Hệ thống cập nhật', content: 'Phiên bản mới đã được cập nhật, vui lòng kiểm tra.', time: '10 phút trước' },
    { id: 2, title: 'Lịch đăng ký học phần', content: 'Hạn đăng ký học phần sắp kết thúc.', time: '1 giờ trước' },
    { id: 3, title: 'Thanh toán học phí', content: 'Bạn còn 3 ngày để hoàn tất học phí học kỳ này.', time: 'Hôm qua' },
  ];

  return (
    <Container isScroll={true}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Thông báo</Text>
      </View>
      {notifications.map((item) => (
        <View key={item.id} style={styles.notificationCard}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.content}>{item.content}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      ))}
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3b82f6',
    padding: 16,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  notificationCard: {
    backgroundColor: '#cfe8ff',
    margin: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  time: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
});

export default NotificationScreen;

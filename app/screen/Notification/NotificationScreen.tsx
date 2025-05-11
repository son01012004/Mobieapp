import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Container from '@/app/src/components/Container';
import api from '../../src/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Định nghĩa kiểu cho thông báo
interface Notification {
  id: number;
  title: string;
  content: string;
  time: string;
  sentAt: string;
  isRead: boolean;
}

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const studentId = 1; // ID sinh viên (có thể thay đổi thành động)
  const recipientId = 1; // ID của user tương ứng với sinh viên (có thể thay đổi)

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await api.get(`/api/notifications/student/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: any[] = response.data;

      const formattedNotifications = data.map((item) => ({
        id: item.id,
        title: item.title,
        content: item.content,
        sentAt: item.sentAt,
        isRead: item.isRead,
        time: calculateTimeAgo(item.sentAt),
      }));

      setNotifications(formattedNotifications);

      // Đánh dấu các thông báo chưa đọc là đã đọc khi người dùng vào màn hình này
      for (const notification of formattedNotifications) {
        if (!notification.isRead) {
          await markAsRead(notification.id);
        }
      }
    } catch (err: any) {
      console.error('Error fetching notifications:', err);
      setError(
        err.response?.status === 404
          ? 'Không tìm thấy thông báo.'
          : err.message === 'Network Error'
          ? 'Không có kết nối mạng. Vui lòng kiểm tra kết nối.'
          : 'Không thể tải thông báo. Vui lòng thử lại.'
      );
      if (err.response) {
        Alert.alert('Lỗi API', `Mã lỗi: ${err.response.status} - ${err.response.data?.message || 'Lỗi không xác định'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: number) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await api.post(
        `/api/notifications/mark-as-read/${notificationId}/${recipientId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Cập nhật lại danh sách thông báo
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif.id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
    } catch (err: any) {
      console.error('Error marking notification as read:', err);
    }
  };

  // Gọi fetchNotifications khi màn hình được focus
  useFocusEffect(
    React.useCallback(() => {
      fetchNotifications();
    }, [])
  );

  // Hàm tính thời gian cách đây
  const calculateTimeAgo = (sentAt: string) => {
    const now = new Date();
    const sent = new Date(sentAt);
    const diffMs = now.getTime() - sent.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffDays > 0) return `${diffDays} ngày trước`;
    if (diffHours > 0) return `${diffHours} giờ trước`;
    if (diffMins > 0) return `${diffMins} phút trước`;
    return 'Vừa xong';
  };

  if (loading) {
    return (
      <Container isScroll={true}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text style={styles.loadingText}>Đang tải...</Text>
        </View>
      </Container>
    );
  }

  if (error) {
    return (
      <Container isScroll={true}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchNotifications}>
            <Text style={styles.retryButtonText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }

  return (
    <Container isScroll={true}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Thông báo</Text>
        <View style={{ width: 24 }} />
      </View>
      {notifications.length === 0 ? (
        <Text style={styles.noNotifications}>Không có thông báo nào.</Text>
      ) : (
        notifications.map((item) => (
          <View
            key={item.id}
            style={[styles.notificationCard, { backgroundColor: item.isRead ? '#e6f0fa' : '#cfe8ff' }]}
          >
            <Text style={[styles.title, { fontWeight: item.isRead ? 'normal' : 'bold' }]}>
              {item.title}
            </Text>
            <Text style={styles.content}>{item.content}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        ))
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#3b82f6',
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
  },
  notificationCard: {
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#3b82f6',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF0000',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noNotifications: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginTop: 20,
  },
});

export default NotificationScreen;
import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { Container } from '@/app/src/components';


const trainingData = [
  {
    semester: 'HK1 (2023-2024)',
    points: 95,
    classification: 'Xuất sắc'
  },
  {
    semester: 'HK2 (2023-2024)',
    points: 88,
    classification: 'Giỏi'
  },
  {
    semester: 'HK1 (2022-2023)',
    points: 76,
    classification: 'Khá'
  },
  {
    semester: 'HK2 (2022-2023)',
    points: 60,
    classification: 'Trung bình'
  }
];

const getClassificationColor = (classification) => {
  switch (classification) {
    case 'Xuất sắc': return '#4CAF50';
    case 'Giỏi': return '#2196F3';
    case 'Khá': return '#FFC107';
    case 'Trung bình': return '#FF5722';
    default: return '#000';
  }
};

const TrainingPointsScreen = () => {
  return (
    <Container>
      <ScrollView>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#333' }}>
            Bảng Điểm Rèn Luyện
          </Text>
          {trainingData.map((item, index) => (
            <View
              key={index}
              style={{
                marginBottom: 20,
                borderWidth: 1,
                borderColor: '#ddd',
                borderRadius: 10,
                overflow: 'hidden',
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', backgroundColor: '#4CAF50', color: '#fff', padding: 12 }}>
                {item.semester}
              </Text>
              <View style={{ flexDirection: 'row', backgroundColor: '#f0f0f0', padding: 10 }}>
                <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center', color: '#555' }}>Điểm Rèn Luyện</Text>
                <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center', color: '#555' }}>Xếp Loại</Text>
              </View>
              <View style={{ flexDirection: 'row', padding: 12 }}>
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 16, color: '#333' }}>{item.points}</Text>
                <Text style={{ flex: 1, textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: getClassificationColor(item.classification) }}>
                  {item.classification}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </Container>
  );
};

export default TrainingPointsScreen;
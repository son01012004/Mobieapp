import { View } from 'react-native';
import React from 'react';
import Container from '../../src/components/Container';
import { Section } from '@bsdaoquang/rncomponent';
import TextComponent from '../../src/components/TextComponet';

const HomeScreen = () => {
  return (
    <Container isScroll={true}>

      {/* Danh sách các phần nội dung */}
      {Array.from({ length: 10 }).map((_, index) => (
        <Section key={`item${index}`} styles={{ marginBottom: 10 }}>
          <TextComponent text="Phần 2: Khởi tạo dự án React Native với Typescript | Fullstack React Native Ecommerce
          Trong series bạn sẽ học được:
          - Xây dựng ứng dụng React Native typescript từ những bước đầu tiên.
          - Xây dựng ứng dụng React Native fullstack cực cool với Firebase có thể đánh gục mọi nhà tuyển dụng.
          - Xây dựng trang admin cho ứng dụng bằng NextJS typescript và Firebase.
          - Quản lý dự án của bạn với Github.
          - Và Rất nhiều kiến thức hữu ích đang chờ đón bạn mỗi ngày."
          />
        </Section>
      ))}

    </Container>
  );
};

export default HomeScreen;

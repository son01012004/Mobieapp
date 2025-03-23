import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Container } from '@/app/src/components';

type Payment = {
  id: number;
  batch: string;
  code: string;
  description: string;
  amount: number;
};

const PaymentScreen = () => {
  const [selectedPayments, setSelectedPayments] = useState<number[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<string>('all');
  const [showPicker, setShowPicker] = useState<boolean>(false);

  // Dữ liệu mẫu
  const payments: Payment[] = [
    {
      id: 1,
      batch: 'Kỳ I',
      code: 'VXD 101',
      description: 'Thu tiền giữ xe đạp Kỳ I (01/01 - 31/07)',
      amount: 250000,
    },
    {
      id: 2,
      batch: 'Kỳ I',
      code: 'HP 202',
      description: 'Học phí Kỳ I (Năm 2025)',
      amount: 1500000,
    },
    {
      id: 3,
      batch: 'Kỳ II',
      code: 'VXD 206',
      description: 'Thu tiền giữ xe đạp Kỳ II (01/08 - 31/12)',
      amount: 250000,
    },
    {
      id: 4,
      batch: 'Kỳ II',
      code: 'HP 303',
      description: 'Học phí Kỳ II (Năm 2025)',
      amount: 1600000,
    },

    {
      id: 5,
      batch: 'Kỳ II',
      code: 'HP 304',
      description: 'Học phí Kỳ II (Năm 2024)',
      amount: 1600000,
    },

    {
      id: 6,
      batch: 'Kỳ I',
      code: 'HP 304',
      description: 'Học phí Kỳ I (Năm 2024)',
      amount: 1600000,
    },
    // Thêm các dòng khác nếu cần để kiểm tra cuộn dọc
  ];

  // Lọc dữ liệu theo đợt
  const filteredPayments: Payment[] =
    selectedBatch === 'all'
      ? payments
      : payments.filter((p) => p.batch === selectedBatch);

  // Chọn/bỏ chọn một dòng
  const toggleSelection = (id: number) => {
    setSelectedPayments((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Chọn/bỏ chọn toàn bộ
  const toggleSelectAll = () => {
    const allIds: number[] = filteredPayments.map((p) => p.id);
    if (selectedPayments.length === filteredPayments.length) {
      setSelectedPayments([]);
    } else {
      setSelectedPayments(allIds);
    }
  };

  // Tính tổng tiền các mục đã chọn
  const totalAmount = filteredPayments
    .filter((item) => selectedPayments.includes(item.id))
    .reduce((sum, item) => sum + item.amount, 0);

  // Các lựa chọn cho modal dropdown
  const batchOptions = ['all', 'Kỳ I', 'Kỳ II'];

  return (
    <Container>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Thanh toán trực tuyến</Text>
      </View>

      {/* Phần chọn đợt */}
      <View style={styles.filterContainer}>
        <View style={styles.filterLabelContainer}>
          <Text style={styles.filterLabel}>Chọn đợt:</Text>
        </View>
        <TouchableOpacity
          style={styles.pickerWrapper}
          onPress={() => setShowPicker(true)}
        >
          <Text style={styles.pickerText}>
            {selectedBatch === 'all' ? 'Tất cả' : selectedBatch}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal dropdown cho lựa chọn đợt */}
      <Modal visible={showPicker} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setShowPicker(false)}
        >
          <View style={styles.modalContainer}>
            {batchOptions.map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => {
                  setSelectedBatch(option);
                  setShowPicker(false);
                }}
                style={styles.modalOption}
              >
                <Text style={styles.modalOptionText}>
                  {option === 'all' ? 'Tất cả' : option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Nội dung cuộn dọc */}
      <ScrollView style={styles.contentScroll}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Danh sách khoản thu</Text>

          {/* Bảng cuộn ngang */}
          <ScrollView horizontal style={styles.tableScroll}>
            <View>
              {/* Phần tiêu đề bảng - cố định */}
              <View style={[styles.tableRow, styles.tableHeaderRow]}>
                <View style={[styles.tableCell, styles.colSTT]}>
                  <Text style={styles.headerCellText}>STT</Text>
                </View>
                <View style={[styles.tableCell, styles.colBatch]}>
                  <Text style={styles.headerCellText}>Đợt</Text>
                </View>
                <View style={[styles.tableCell, styles.colCode]}>
                  <Text style={styles.headerCellText}>Mã</Text>
                </View>
                <View style={[styles.tableCell, styles.colDescription]}>
                  <Text style={styles.headerCellText}>Nội dung thu</Text>
                </View>
                <View style={[styles.tableCell, styles.colAmount]}>
                  <Text style={styles.headerCellText}>Số tiền</Text>
                </View>
                <View style={[styles.tableCell, styles.colSelect]}>
                  <CheckBox
                    checked={
                      selectedPayments.length === filteredPayments.length &&
                      filteredPayments.length > 0
                    }
                    onPress={toggleSelectAll}
                    containerStyle={styles.checkBoxContainer}
                  />
                </View>
              </View>

              {/* Phần dữ liệu bảng - có thể cuộn dọc */}
              <ScrollView style={styles.tableBodyScroll}>
                {filteredPayments.map((item, index) => (
                  <View
                    key={item.id}
                    style={[
                      styles.tableRow,
                      index % 2 === 1 && styles.tableRowAlternate,
                    ]}
                  >
                    <View style={[styles.tableCell, styles.colSTT]}>
                      <Text style={styles.dataCellText}>{index + 1}</Text>
                    </View>
                    <View style={[styles.tableCell, styles.colBatch]}>
                      <Text style={styles.dataCellText}>{item.batch}</Text>
                    </View>
                    <View style={[styles.tableCell, styles.colCode]}>
                      <Text style={styles.dataCellText}>{item.code}</Text>
                    </View>
                    <View style={[styles.tableCell, styles.colDescription]}>
                      <Text style={styles.dataCellText}>{item.description}</Text>
                    </View>
                    <View style={[styles.tableCell, styles.colAmount]}>
                      <Text style={styles.dataCellText}>
                        {item.amount.toLocaleString()} VND
                      </Text>
                    </View>
                    <View style={[styles.tableCell, styles.colSelect]}>
                      <CheckBox
                        checked={selectedPayments.includes(item.id)}
                        onPress={() => toggleSelection(item.id)}
                        containerStyle={styles.checkBoxContainer}
                      />
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </ScrollView>
        </View>

        {/* Tổng tiền và nút Thanh toán */}
        <View style={styles.summaryContainer}>
          <Text style={styles.totalText}>
            Tổng tiền: {totalAmount.toLocaleString()} VND
          </Text>
          <TouchableOpacity style={styles.payButton}>
            <Text style={styles.payButtonText}>Thanh toán</Text>
          </TouchableOpacity>
        </View>

        {/* Lưu ý */}
        <View style={styles.noteContainer}>
          <Text style={styles.note}>
            1. Để thanh toán trực tuyến qua ngân hàng thẻ ATM phải đăng ký{' '}
            <Text style={styles.highlight}>Thanh toán online.</Text>
          </Text>
          <Text style={styles.note}>
            2. Vui lòng kiểm tra{' '}
            <Text style={styles.highlight}>HẠN MỨC THẺ</Text> trước khi thanh toán.
          </Text>
          <Text style={styles.note}>
            3. Xem hướng dẫn thanh toán{' '}
            <Text style={styles.link}>tại đây</Text>.
          </Text>
          <Text style={styles.note}>
            4. Để hủy giao dịch chờ gạch nợ, vui lòng bấm{' '}
            <Text style={styles.link}>vào đây</Text>.
          </Text>
          <Text style={styles.note}>
            5. Khuyến cáo thanh toán qua các loại thẻ ATM nội địa, QR-Code.
          </Text>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3b82f6',
    padding: 14,
    alignItems: 'center',
    elevation: 2,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  filterLabelContainer: {
    justifyContent: 'center',
    marginRight: 10,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
  },
  pickerText: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 5,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    width: 200,
  },
  modalOption: {
    padding: 10,
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333',
  },
  contentScroll: {
    flex: 1,
    marginHorizontal: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  tableScroll: {
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
  },
  tableHeaderRow: {
    backgroundColor: '#e8edf2',
  },
  tableRowAlternate: {
    backgroundColor: '#f9fafc',
  },
  tableCell: {
    padding: 5,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  colSTT: { width: 40 },
  colBatch: { width: 70 },
  colCode: { width: 80 },
  colDescription: { width: 200 },
  colAmount: { width: 120 },
  colSelect: {
    width: 60,
    borderRightWidth: 0,
    alignItems: 'center',
  },
  headerCellText: {
    fontWeight: 'bold',
    color: '#333',
  },
  dataCellText: {
    color: '#333',
  },
  checkBoxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  tableBodyScroll: {
    maxHeight: 250, // Giới hạn chiều cao, nếu vượt quá sẽ có thanh cuộn dọc
  },
  summaryContainer: {
    alignItems: 'center',
    marginTop: 6,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  payButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
  },
  payButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteContainer: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 10,
    elevation: 2,
    marginBottom: 20,
  },
  note: {
    fontSize: 14,
    marginVertical: 4,
    color: '#444',
  },
  highlight: {
    color: 'red',
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default PaymentScreen;
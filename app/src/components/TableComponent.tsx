import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Label } from '@bsdaoquang/rncomponent';
import { sizes } from '../constants/sizes';
import { colors, ColorType } from '../constants/colors';


//file nay la file component cua ban co the su dung
//  cai nay voi nhung duw lieuj dang bnag co the xem file TransciptScreen de xem cach dung

// Define the shape of each table cell data
interface TableCellData {
  key: string; // Unique key to access the data
  value: string | number; // Value to display
}

// Define the shape of a column configuration
interface TableColumn {
  key: string; // Matches the key in TableCellData
  header: string; // Display name for the column
  flex?: number; // Optional flex value for column width (defaults to 1)
  align?: 'left' | 'center' | 'right'; // Optional text alignment (used for style)
  color?: ColorType; // Optional color for header text
  size?: number; // Optional font size for header text
}

// Define the props for the TableComponent
type Props = {
  data: TableCellData[][]; // 2D array of rows and cells
  columns: TableColumn[]; // Array of column configurations
  headerColor?: ColorType; // Optional default color for header text
  headerSize?: number; // Optional default font size for header text
  rowColor?: ColorType; // Optional default color for row text
  rowSize?: number; // Optional default font size for row text
  style?: StyleProp<ViewStyle>; // Optional custom style for the table container
  borderColor?: ColorType; // Optional border color
  backgroundColor?: ColorType; // Optional background color for the table
};

const TableComponent: React.FC<Props> = ({
  data,
  columns,
  headerColor = 'Dark',
  headerSize = sizes.title,
  rowColor = 'Black',
  rowSize = sizes.text,
  style,
  borderColor = 'Gray',
  backgroundColor = 'White',
}) => {
  return (
    <View style={[styles.tableContainer, { backgroundColor: colors[backgroundColor] }, style]}>
      {/* Table Header */}
      <View style={[styles.tableHeader, { borderBottomColor: colors.Light_Sky_Blue }]}>
        {columns.map((column, index) => (
          <View key={index} style={[styles.headerCell, { flex: column.flex ?? 1, justifyContent: 'center' }]}>
            <Label
              text={column.header}
              size={column.size ?? headerSize}
              color={colors[column.color ?? headerColor]}
            />
          </View>
        ))}
      </View>

      {/* Table Rows */}
      {data.map((row, rowIndex) => (
        <View key={rowIndex} style={[styles.tableRow, { borderBottomColor: colors.Light_Sky_Blue }]}>
          {columns.map((column, colIndex) => {
            const cellData = row.find((cell) => cell.key === column.key);
            return (
              <View
                key={colIndex}
                style={[styles.cell, { flex: column.flex ?? 1, justifyContent: 'center', alignItems: column.align === 'left' ? 'flex-start' : column.align === 'right' ? 'flex-end' : 'center' }]}
              >
                <Label
                  text={cellData ? cellData.value.toString() : ''}
                  size={rowSize}
                  color={colors[rowColor]}
                />
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 4,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#E6F0FA',
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  headerCell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TableComponent;
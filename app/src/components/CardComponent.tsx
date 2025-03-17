import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { colors, ColorType } from '../constants/colors';
import { sizes } from '../constants/sizes';

type DescriptionItem = {
  text: string;
  icon?: string;
};

type Props = {
  title: string;
  description: DescriptionItem[];
  backgroundColor: ColorType; // Ensure this is a required ColorType
  titleSize?: number;
  descriptionSize?: number;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
};

const CardComponent = (props: Props) => {
  const { title, description, backgroundColor, titleSize, descriptionSize, style, titleStyle, descriptionStyle } = props;

  return (
    <View style={[styles.card, { backgroundColor: colors[backgroundColor] }, style]}>
      <Text style={[styles.title, { fontSize: titleSize ?? sizes.title }, titleStyle]}>
        {title}
      </Text>
      {description.map((item, index) => (
        <View key={index} style={styles.attributeRow}>
          {item.icon && <Text style={styles.icon}>{item.icon}</Text>}
          <Text
            style={[styles.description, { fontSize: descriptionSize ?? sizes.text }, descriptionStyle]}
          >
            {item.text}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  attributeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    marginRight: 5,
  },
  description: {
    color: 'gray',
  },
});

export default CardComponent;
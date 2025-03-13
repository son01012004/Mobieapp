import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import { Label } from '@bsdaoquang/rncomponent';
import { sizes } from '../constants/sizes';
import { colors,ColorType } from '../constants/colors';
type Props = {
    text: string;
    size?: number;
    font?: string;
    flex?: number;
    numberOfLines?: number;
    color?: ColorType;
    sytles?: StyleProp<TextStyle>;
    type?: 'text' | 'title' | 'bigTitle';

};

const TextComponent = (props: Props) => {
    const { text, size, font, flex, numberOfLines, color } = props;
    let fontSize: number = sizes.text;
    let fontFamily: string = 'Roboto-Regular';

    switch (props.type) {
        case 'text':
            fontSize = size ?? sizes.text;
            fontFamily = font ?? 'Roboto-Regular';
            break;
        case 'title':
            fontSize = size ?? sizes.title;
            fontFamily = font ?? 'Roboto-Bold';
            break;
        case 'bigTitle':
            fontSize = size ?? sizes.bigTitile;
            fontFamily = font ?? 'Roboto-Bold';
            break;
    }
    return <Label
        text={text}
        font={font ?? fontFamily} 
        flex={flex}
        numberOfLine={numberOfLines}
        size={size ?? fontSize}
        color={colors[color ?? 'Black']} />;


};

export default TextComponent;


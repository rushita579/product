import { StyleSheet } from 'react-native'
import colors from './Color';
import flex from './flex';
import margin from './margin';
import padding from './padding';
export * from './Color';



export  const styles = StyleSheet.create({
    ...colors,
    ...flex,
    ...margin,
    ...padding,
})


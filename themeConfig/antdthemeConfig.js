import { colors, sizes } from '@/styles/styleVariable';
import { theme } from 'antd';

export const antdThemeConfigs = {
  token: {
    colorPrimary: colors._primaryColor,
    // colorInfo: '#00665F',
    borderRadius: sizes._borderRadius,
    // colorBgBase: '#F6F7F8',
    // colorTextBase: '#061837',
    // fontSize: 16,
    // fontFamily: 'var(--font-satoshi)',
  },
  components: {
    // Input: {
    //   colorBorder: 'rgb(143,149,178)',
    //   controlHeight: 48,
    //   controlHeightLG: 52,
    //   colorText: 'rgb(105,111,140)',
    //   inputFontSize: 16,
    // },
    // Button: {
    //   controlHeight: 48,
    //   controlHeightLG: 52,
    //   contentFontSize: 16,
    //   fontWeight: 700,
    //   contentLineHeight: 0,
    //   defaultBorderColor: '',
    //   defaultColor: '#52bd94',
    // },
    Radio: {
      /* here is your component tokens */
      // buttonColor: 'rgba(0, 102, 95, 1)',
      // dotSize: 0,
      // radioSize: 20,
    },
    // FloatButton: {
    //   colorBgElevated: '#00665F',
    //   colorFillContent: '#00665F',
    // },
  },
};

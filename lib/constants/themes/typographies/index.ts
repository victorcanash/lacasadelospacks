import type { ThemeFontPropertyElement } from '@core/types/themes';

const typographies = {
  default: {
    textAlign: 'left',
    lineHeight: '24px',
    letterSpacing: '-0.33px',   
  } as ThemeFontPropertyElement,
  title: {
    fontSize: '24px',
    fontWeight: '800',
    lineHeight: '30px',
  } as ThemeFontPropertyElement,
  secondTitle: {
    fontSize: '20px',
    fontWeight: '700',
    lineHeight: '26px',
  } as ThemeFontPropertyElement,
  content: {
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '24px',
  } as ThemeFontPropertyElement,
  secondContent: {
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '22px',
  } as ThemeFontPropertyElement,
  button: {
    fontSize: '16px',
    fontWeight: '700',
    lineHeight: '24px',
    textTransform: 'uppercase',
  } as ThemeFontPropertyElement,
  headerBanner: {
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '24px',
    textAlign: 'center',
    textTransform:'uppercase',
  } as ThemeFontPropertyElement,
  homeBanner: {
    default: {
      fontSize: '36px',
      fontWeight: '900',
      lineHeight: '39px',
      letterSpacing: '0.17px',
    } as ThemeFontPropertyElement,
    small: {
      fontSize: '33px',
      fontWeight: '900',
      lineHeight: '35px',
      letterSpacing: '0.17px',
    } as ThemeFontPropertyElement,
  },
};

export default typographies;

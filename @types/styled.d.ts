import 'styled-components/native';

import { Themes } from '../global/theme';

declare module 'styled-components/native' {
    type ThemeType = typeof Themes;
    export interface DefaultTheme extends ThemeType {}
}
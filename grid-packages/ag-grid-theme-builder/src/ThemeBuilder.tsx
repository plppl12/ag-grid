import '@fontsource/inter';
import { CssBaseline, CssVarsProvider, extendTheme } from '@mui/joy';
import { parentThemeClassAtom } from 'atoms/parentTheme';
import { initStore } from 'atoms/store';
import { App, ThemeBuilderAppProps } from 'components/App';
import { Provider } from 'jotai';
import { useMemo } from 'react';

const theme = extendTheme({
  components: {
    JoyStack: {
      defaultProps: {
        useFlexGap: true,
        gap: 2,
      },
    },
  },
});

export const ThemeBuilder = (props: ThemeBuilderAppProps) => {
  const store = useMemo(initStore, []);
  const initialDark = store.get(parentThemeClassAtom).includes('-dark');
  return (
    <Provider store={store}>
      <CssVarsProvider theme={theme} defaultMode={initialDark ? 'dark' : 'light'}>
        <CssBaseline />
        <App {...props} />
      </CssVarsProvider>
    </Provider>
  );
};

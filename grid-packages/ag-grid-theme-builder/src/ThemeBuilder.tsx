import '@fontsource/inter';
import { CssBaseline, CssVarsProvider } from '@mui/joy';
import { parentThemeNameAtom } from 'atoms/parentTheme';
import { initStore } from 'atoms/store';
import { App, ThemeBuilderAppProps } from 'components/App';
import { Provider } from 'jotai';
import { useMemo } from 'react';

export const ThemeBuilder = (props: ThemeBuilderAppProps) => {
  const store = useMemo(initStore, []);
  const initialDark = store.get(parentThemeNameAtom).includes('-dark');
  return (
    <Provider store={store}>
      <CssVarsProvider defaultMode={initialDark ? 'dark' : 'light'}>
        <CssBaseline />
        <App {...props} />
      </CssVarsProvider>
    </Provider>
  );
};

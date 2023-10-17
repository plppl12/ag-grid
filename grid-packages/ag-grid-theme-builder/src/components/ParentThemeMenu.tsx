import { useParentTheme, useSetParentTheme } from 'atoms/parentTheme';
import { allThemes, getThemeOrThrow } from 'model/themes';

export const ParentThemeMenu = () => {
  const parentTheme = useParentTheme();
  const setParentTheme = useSetParentTheme();

  return (
    <select
      value={parentTheme.class}
      onChange={(e) => setParentTheme(getThemeOrThrow(e.target.value))}
    >
      {allThemes.map((theme) => (
        <option key={theme.class} value={theme.class}>
          {theme.label}
        </option>
      ))}
    </select>
  );
};

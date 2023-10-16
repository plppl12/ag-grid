import { Download } from '@mui/icons-material';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
} from '@mui/joy';
import { useRenderedCss } from 'atoms/renderedCss';
import { useThemeNameAtom } from 'atoms/themeName';
import { CopyButton } from './CopyButton';

export const DownloadDialog = () => {
  const [themeName, setThemeName] = useThemeNameAtom();
  const themeCssName = makeCssThemeName(themeName);
  const cssContent = getCssDocComment(themeCssName) + useRenderedCss();
  const downloadHref = `data:text/css;charset=utf-8,${encodeURIComponent(cssContent)}`;

  return (
    <ModalDialog>
      <ModalClose />
      <Stack gap={4}>
        <Typography level="title-lg">Download Theme CSS</Typography>
        <FormControl>
          <FormLabel>Theme Name</FormLabel>
          <Input value={themeName} onChange={(e) => setThemeName(e.target.value)} />
          {themeCssName && <FormHelperText>CSS name: .{themeCssName}</FormHelperText>}
        </FormControl>
        <Stack direction="row" gap={4}>
          <CopyButton payload={cssContent}>Copy CSS</CopyButton>
          <Button
            component="a"
            startDecorator={<Download />}
            href={downloadHref}
            download={themeCssName + '.css'}
          >
            Download
          </Button>
        </Stack>
      </Stack>
    </ModalDialog>
  );
};

const getCssDocComment = (cssName: string) => `/*
 * To use your new theme, copy the CSS below into your application stylesheets and add
 * the CSS class to the div containing the grid, *in addition to* the Alpine Theme class:
 * <div id="myGrid" class="ag-theme-alpine ${cssName}"></div> * Link to docs
 */

`;

const makeCssThemeName = (humanName: string) =>
  'ag-theme-' +
  (humanName
    // strip accents
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    // replace
    .replaceAll(/[^0-9a-z]/gi, ' ')
    .trim()
    .replaceAll(/\s+/g, '-') || 'custom');

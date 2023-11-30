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
import { useThemeClass, useThemeLabelAtom } from 'atoms/theme';
import { CopyButton } from './CopyButton';

export const DownloadDialog = () => {
  const [themeLabel, setThemeLabel] = useThemeLabelAtom();
  const className = useThemeClass();
  const renderedCss = useRenderedCss();
  const downloadHref = `data:text/css;charset=utf-8,${encodeURIComponent(renderedCss)}`;

  return (
    <ModalDialog>
      <ModalClose />
      <Stack gap={4}>
        <Typography level="title-lg">Download Theme CSS</Typography>
        <FormControl>
          <FormLabel>Theme Name</FormLabel>
          <Input value={themeLabel} onChange={(e) => setThemeLabel(e.target.value)} />
          {className && (
            <FormHelperText>Your theme will have the CSS class name .{className}</FormHelperText>
          )}
        </FormControl>
        <Stack direction="row" gap={4}>
          <CopyButton payload={renderedCss}>Copy CSS</CopyButton>
          <Button
            component="a"
            startDecorator={<Download />}
            href={downloadHref}
            download={className + '.css'}
          >
            Download
          </Button>
        </Stack>
      </Stack>
    </ModalDialog>
  );
};

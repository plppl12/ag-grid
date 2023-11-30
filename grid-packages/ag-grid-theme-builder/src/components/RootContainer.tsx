import styled from '@emotion/styled';
import { Delete, Download } from '@mui/icons-material';
import { Button, Modal } from '@mui/joy';
import { useRenderedCss } from 'atoms/renderedCss';
import { useThemeClass } from 'atoms/theme';
import { Inspector } from 'components/inspector/Inspector';
import { memo, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { DownloadDialog } from './DownloadDialog';
import { GridPreview } from './GridPreview';

export const RootContainer = memo(() => {
  const themeClass = useThemeClass();
  const renderedCss = useRenderedCss();
  const [showDownload, setShowDownload] = useState(false);

  return (
    <>
      <style>{renderedCss}</style>
      <DefaultsElement className={themeClass} id="theme-builder-defaults-computation" />
      <Container>
        <TopRow>
          <Button
            startDecorator={<Delete />}
            onClick={() => {
              if (confirm('Discard all of your theme customisations?')) {
                localStorage.clear();
                location.reload();
              }
            }}
          >
            Discard changes
          </Button>
          <Button startDecorator={<Download />} onClick={() => setShowDownload(true)}>
            Download Theme
          </Button>
        </TopRow>
        <Columns>
          <LeftColumn>
            <Inspector />
          </LeftColumn>
          <RightColumn>
            <GridPreview />
          </RightColumn>
        </Columns>
        <Tooltip
          id="theme-builder-tooltip"
          className="tooltip"
          place="top"
          anchorSelect="[data-tooltip-content]"
        />
      </Container>
      <Modal open={showDownload} onClose={() => setShowDownload(false)}>
        <>
          <DownloadDialog />
        </>
      </Modal>
    </>
  );
});

const Container = styled('div')`
  height: 100%;
  display: grid;
  grid-template-areas:
    'header header'
    'menu main';
  grid-template-columns: 300px auto;
  grid-template-rows: min-content auto;
  gap: 20px;

  .tooltip {
    max-width: 400px;
  }
`;

const DefaultsElement = styled('div')`
  position: absolute;
  transform: translateY(-10);
`;

const Header = styled('div')`
  grid-area: header;
  display: flex;
  justify-content: space-between;
`;

const Menu = styled('div')`
  grid-area: menu;
  overflow: auto;
`;

const Main = styled('div')`
  grid-area: main;
`;

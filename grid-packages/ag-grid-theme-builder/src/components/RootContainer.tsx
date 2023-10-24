import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';
import '@ag-grid-community/styles/ag-theme-balham.css';
import '@ag-grid-community/styles/ag-theme-material.css';
import styled from '@emotion/styled';
import { Delete, Download } from '@mui/icons-material';
import { Button, Modal } from '@mui/joy';
import { useParentTheme } from 'atoms/parentTheme';
import { useRenderedCss } from 'atoms/renderedCss';
import { useThemeClass } from 'atoms/theme';
import { useResetVariableDefaults } from 'atoms/variableDefaults';
import { Inspector } from 'components/inspector/Inspector';
import { memo, useLayoutEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { DownloadDialog } from './DownloadDialog';
import { GridPreview } from './GridPreview';

export const RootContainer = memo(() => {
  const parentTheme = useParentTheme();
  const themeClass = useThemeClass();
  const renderedCss = useRenderedCss();
  const resetVariableDefaults = useResetVariableDefaults();
  const [hasRenderedStyles, setHasRenderedStyles] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

  useLayoutEffect(() => {
    setHasRenderedStyles(true);
    resetVariableDefaults();
  }, [renderedCss, resetVariableDefaults]);

  return (
    <>
      <style>{renderedCss}</style>
      <DefaultsElement
        className={`${parentTheme.class} ${themeClass}`}
        id="theme-builder-defaults-computation"
      />
      <Container>
        {hasRenderedStyles && (
          <>
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
          </>
        )}
      </Container>
      <Modal open={showDownload} onClose={() => setShowDownload(false)}>
        {/* <div>Hi!</div> */}
        <>
          <DownloadDialog />
        </>
      </Modal>
    </>
  );
});

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 20px;

  .tooltip {
    max-width: 400px;
  }
`;

const DefaultsElement = styled('div')`
  position: absolute;
  transform: translateY(-10);
`;

const TopRow = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 20px;
`;

const Columns = styled('div')`
  display: flex;
  flex: 1;

  .tooltip {
    max-width: 400px;
  }
`;

const LeftColumn = styled('div')`
  display: flex;
  flex-direction: column;
  flex: 1.5;
  min-width: 200px;
  max-width: 400px;
  margin-right: 20px;
  gap: 20px;
`;

const RightColumn = styled('div')`
  flex: 2.5;
  overflow-x: auto;
`;

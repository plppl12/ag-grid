import { Sheet, Stack } from '@mui/joy';
import { useParentTheme } from 'atoms/parentTheme';
import { VariableControl } from 'components/controls/VariableControl';
import { withErrorBoundary } from 'components/ErrorBoundary';
import { Feature } from 'model/features';
import { getThemeChain } from 'model/themes';
import { getVariableInfo } from 'model/variableInfo';
import { memo } from 'react';

export type FeatureEditorProps = {
  feature: Feature;
};

const FeatureEditor = ({ feature }: FeatureEditorProps) => {
  const parentTheme = useParentTheme();

  return (
    <Sheet>
      <Stack>
        {feature.variableNames
          .filter((v) => {
            const specificToTheme = getVariableInfo(v)?.specificToTheme;
            if (specificToTheme == null) return true;
            return getThemeChain(parentTheme).find((t) => t.class === specificToTheme) != null;
          })
          .map((name) => (
            <VariableControl key={name} variableName={name} feature={feature} />
          ))}
      </Stack>
    </Sheet>
  );
};

const FeatureEditorWrapped = memo(withErrorBoundary(FeatureEditor));

export { FeatureEditorWrapped as FeatureEditor };

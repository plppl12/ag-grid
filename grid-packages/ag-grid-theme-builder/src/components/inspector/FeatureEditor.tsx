import { Sheet, Stack } from '@mui/joy';
import { VariableControl } from 'components/controls/VariableControl';
import { withErrorBoundary } from 'components/ErrorBoundary';
import { Feature } from 'model/features';
import { memo } from 'react';

export type FeatureEditorProps = {
  feature: Feature;
};

const FeatureEditor = ({ feature }: FeatureEditorProps) => {
  return (
    <Sheet>
      <Stack>
        {feature.variableNames.map((name) => (
          <VariableControl key={name} variableName={name} feature={feature} />
        ))}
      </Stack>
    </Sheet>
  );
};

const FeatureEditorWrapped = memo(withErrorBoundary(FeatureEditor));

export { FeatureEditorWrapped as FeatureEditor };

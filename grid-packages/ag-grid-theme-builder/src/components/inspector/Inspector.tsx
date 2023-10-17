import { Divider, Stack } from '@mui/joy';
import { useCurrentFeature } from 'atoms/currentFeature';
import { useEnabledFeatures } from 'atoms/enabledFeatures';
import { EnableFeatureButton } from 'components/inspector/EnableFeatureButton';
import { FeatureEditor } from 'components/inspector/FeatureEditor';
import { FeatureEditorPanel } from 'components/inspector/FeatureEditorPanel';
import { InspectFeatureButton } from './InspectFeatureButton';

export const Inspector = () => {
  const enabled = useEnabledFeatures();
  const inline = enabled.filter((f) => f.alwaysEnabled);
  const inspectable = enabled.filter((f) => !f.alwaysEnabled);
  const current = useCurrentFeature();

  return (
    <Stack sx={{ position: 'relative' }}>
      {inline.map((feature) => (
        <FeatureEditor key={feature.name} feature={feature} />
      ))}
      <Divider />
      <EnableFeatureButton />
      {inspectable.map((feature) => (
        <InspectFeatureButton key={feature.name} feature={feature} />
      ))}
      <FeatureEditorPanel feature={current} />
    </Stack>
  );
};

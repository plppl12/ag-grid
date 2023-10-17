import { Divider, FormControl, FormLabel, Option, Select, Stack } from '@mui/joy';
import { useCurrentFeature } from 'atoms/currentFeature';
import { useEnabledFeatures } from 'atoms/enabledFeatures';
import { EnableFeatureButton } from 'components/inspector/EnableFeatureButton';
import { FeatureEditorPanel } from 'components/inspector/FeatureEditorPanel';
import { InspectFeatureButton } from './InspectFeatureButton';

export const Inspector = () => {
  const enabled = useEnabledFeatures();
  const current = useCurrentFeature();

  return (
    <Stack sx={{ position: 'relative' }}>
      <FormControl>
        <FormLabel>Chrome</FormLabel>
        <Select value="foo">
          <Option value="foo">Alpine foo</Option>
        </Select>
      </FormControl>
      <Divider />
      <EnableFeatureButton />
      {enabled.map((feature) => (
        <InspectFeatureButton key={feature.name} feature={feature} />
      ))}
      <FeatureEditorPanel feature={current} />
    </Stack>
  );
};

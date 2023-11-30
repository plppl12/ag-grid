import { AccordionGroup, Divider, Stack } from '@mui/joy';
import { useCurrentFeature } from 'atoms/currentFeature';
import { useEnabledFeatures } from 'atoms/enabledFeatures';
import { EnableFeatureButton } from 'components/inspector/EnableFeatureButton';
import { FeatureEditorPanel } from 'components/inspector/FeatureEditorPanel';
import { allSchemes } from 'model/schemes';
import { InspectFeatureButton } from './InspectFeatureButton';
import { SchemeEditor } from './SchemeEditor';

export const Inspector = () => {
  const enabled = useEnabledFeatures();
  const current = useCurrentFeature();

  return (
    <Stack sx={{ position: 'relative', '@media': {} }}>
      <AccordionGroup sx={{ borderRadius: 10 }}>
        {allSchemes.map((scheme) => (
          <SchemeEditor key={scheme.name} scheme={scheme} />
        ))}
      </AccordionGroup>

      <Divider />
      <EnableFeatureButton />
      {enabled.map((feature) => (
        <InspectFeatureButton key={feature.name} feature={feature} />
      ))}
      <FeatureEditorPanel feature={current} />
    </Stack>
  );
};

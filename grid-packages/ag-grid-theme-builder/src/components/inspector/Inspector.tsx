import { Box, Divider, FormControl, FormLabel, Option, Select, Stack, Typography } from '@mui/joy';
import { useCurrentFeature } from 'atoms/currentFeature';
import { useEnabledFeatures } from 'atoms/enabledFeatures';
import { useChromeColorAtom } from 'atoms/schemes';
import { EnableFeatureButton } from 'components/inspector/EnableFeatureButton';
import { FeatureEditorPanel } from 'components/inspector/FeatureEditorPanel';
import { allSchemes } from 'model/schemes';
import { InspectFeatureButton } from './InspectFeatureButton';

export const Inspector = () => {
  const enabled = useEnabledFeatures();
  const current = useCurrentFeature();
  const [chromeColor, setChromeColor] = useChromeColorAtom();

  return (
    <Stack sx={{ position: 'relative' }}>
      {allSchemes.map((scheme) => (
        <FormControl key={scheme.name}>
          <FormLabel>{scheme.label}</FormLabel>
          <Select
            value={chromeColor}
            onChange={(_, option) => {
              if (option) {
                setChromeColor(option);
              }
            }}
          >
            {scheme.options.map((option) => (
              <Option key={option.value} value={option} label={option.label}>
                <Box sx={{ display: 'block' }}>
                  {option.label}
                  <Typography level="body-sm">{option.description}</Typography>
                </Box>
              </Option>
            ))}
          </Select>
        </FormControl>
      ))}
      <Divider />
      <EnableFeatureButton />
      {enabled.map((feature) => (
        <InspectFeatureButton key={feature.name} feature={feature} />
      ))}
      <FeatureEditorPanel feature={current} />
    </Stack>
  );
};

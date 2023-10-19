import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControl,
  FormLabel,
  Option,
  Select,
  Stack,
  Typography,
} from '@mui/joy';
import { useSchemeValueAtom } from 'atoms/schemes';
import { VariableControl } from 'components/controls/VariableControl';
import { Scheme } from 'model/schemes/Scheme';
import { memo } from 'react';

type SchemeEditorProps = {
  scheme: Scheme;
};

const SchemeEditor = ({ scheme }: SchemeEditorProps) => {
  const [schemeValueOrNull, setSchemeValue] = useSchemeValueAtom(scheme);
  const schemeValue = schemeValueOrNull || scheme.options[0];

  const availableVariables = Object.keys(schemeValue.variables);

  return (
    <Accordion key={scheme.name}>
      <AccordionSummary slotProps={{ button: { component: 'div' } }}>
        <FormControl>
          <FormLabel>{scheme.label}</FormLabel>
          <Select
            onClick={stopPropagation}
            onMouseDown={stopPropagation}
            onMouseUp={stopPropagation}
            value={schemeValue}
            onChange={(_, option) => {
              setSchemeValue(option);
            }}
          >
            {scheme.options.map((option) => (
              <Option
                onClick={stopPropagation}
                key={option.value}
                value={option}
                label={option.label}
              >
                <Box sx={{ display: 'block' }}>
                  {option.label}
                  <Typography level="body-sm">{option.description}</Typography>
                </Box>
              </Option>
            ))}
          </Select>
        </FormControl>
      </AccordionSummary>
      <AccordionDetails>
        <Stack>
          {availableVariables.length === 0
            ? `${schemeValue.label} has no options`
            : availableVariables.map((variableName) => (
                <VariableControl key={variableName} variableName={variableName} />
              ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

const SchemeEditorWrapped = memo(SchemeEditor);

export { SchemeEditorWrapped as SchemeEditor };

const stopPropagation = (e: { stopPropagation: () => void }) => {
  e.stopPropagation();
};

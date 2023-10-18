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
import { useSchemeValue, useSetSchemeOption } from 'atoms/schemes';
import { VariableControl } from 'components/controls/VariableControl';
import { Scheme } from 'model/schemes/Scheme';
import { memo } from 'react';

type SchemeEditorProps = {
  scheme: Scheme;
};

const SchemeEditor = ({ scheme }: SchemeEditorProps) => {
  const schemeValue = useSchemeValue(scheme);
  const setSchemeOption = useSetSchemeOption(scheme);
  //   const setSchemeVariable = useSetSchemeVariable(scheme);

  const availableVariables = Object.keys(schemeValue.option.variables);

  return (
    <Accordion key={scheme.name}>
      <AccordionSummary>
        <FormControl>
          <FormLabel>{scheme.label}</FormLabel>
          <Select
            onClick={stopPropagation}
            onMouseDown={stopPropagation}
            onMouseUp={stopPropagation}
            value={schemeValue.option}
            onChange={(_, option) => {
              setSchemeOption(option);
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
            ? `${schemeValue.option.label} has no options`
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

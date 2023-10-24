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
import { Scheme, SchemeOption } from 'model/schemes/Scheme';
import { titleCase } from 'model/utils';
import { memo } from 'react';

type SchemeEditorProps = {
  scheme: Scheme;
};

const SchemeEditor = ({ scheme }: SchemeEditorProps) => {
  const [schemeValueOrNull, setSchemeValue] = useSchemeValueAtom(scheme);
  const schemeValue = schemeValueOrNull || scheme.options[0];

  const availableVariables = Object.keys(schemeValue.variables);

  return (
    // TODO use react-collapse instead of accordion, because of the need to put
    // a button within the summary
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
                label={optionLabel(option)}
              >
                <Box sx={{ display: 'block' }}>
                  {optionLabel(option)}
                  {option.description && <Typography level="body-sm">{option.description}</Typography>}
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

const optionLabel = ({label, value}: SchemeOption) => label || titleCase(value);

const SchemeEditorWrapped = memo(SchemeEditor);

export { SchemeEditorWrapped as SchemeEditor };

const stopPropagation = (e: { stopPropagation: () => void }) => {
  e.stopPropagation();
};

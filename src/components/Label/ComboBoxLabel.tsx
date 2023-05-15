import { Combobox } from '@headlessui/react';
import type { LabelProps } from './Label';
import { LabelContainer, labelClassNames } from './bin';

type ComboBoxLabelProps = Omit<LabelProps, 'htmlFor'>;

export const ComboBoxLabel = ({
  text,
  inline = false,
  srOnly = false,
  required = false,
}: ComboBoxLabelProps) => {
  
  if (srOnly) return <Combobox.Label className="sr-only">{text}</Combobox.Label>;
  
  return (
    <LabelContainer inline={inline} required={required}>
      <Combobox.Label className={labelClassNames}>
        {text}
      </Combobox.Label>
    </LabelContainer>
  );
};

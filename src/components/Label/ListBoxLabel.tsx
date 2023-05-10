import { Listbox } from '@headlessui/react';
import type { LabelProps } from './Label';
import { LabelContainer, labelClassNames } from './bin';

type ListBoxLabelProps = Omit<LabelProps, 'htmlFor'>;

export const ListBoxLabel = ({
  text,
  inline = false,
  srOnly = false,
  required = false,
}: ListBoxLabelProps) => {
  
  if (srOnly) return <Listbox.Label className="sr-only">{text}</Listbox.Label>;
  
  return (
    <LabelContainer inline={inline} required={required}>
      <Listbox.Label className={labelClassNames}>
        {text}
      </Listbox.Label>
    </LabelContainer>
  );
};

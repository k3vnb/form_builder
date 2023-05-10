import type { LabelProps } from './Label';
import { LabelContainer, labelClassNames } from './bin';

type LegendProps = Omit<LabelProps, 'htmlFor'>;

export const Legend = ({
  text,
  inline = false,
  srOnly = false,
  required = false,
}: LegendProps) => {
  
  if (srOnly) return <legend className="sr-only">{text}</legend>;
  
  return (
    <LabelContainer inline={inline} required={required}>
      <legend className={labelClassNames}>
        {text}
      </legend>
    </LabelContainer>
  );
};

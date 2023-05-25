import { Nullable } from '../../../var/types';
import type { InputHelperTextProps } from './InputHelperText';

type AriaDescrByArgs = Pick<InputHelperTextProps, 'id' | 'show' | 'isInvalid'>;

export const getAriaDescribedById = ({ id, show, isInvalid }: AriaDescrByArgs): Nullable<string> => {
  if (!show) return null;
  return isInvalid ? `${id}-error` : `${id}-description`;
};

interface AriaAttrsArgs {
  ariaDescribedById: Nullable<string>;
  isInvalid: boolean;
}

type AriaAttrsReturnType = Record<string, string>;

export const getInputAriaAttributes = ({
  isInvalid,
  ariaDescribedById,
}: AriaAttrsArgs): Nullable<AriaAttrsReturnType> => {
  if (!ariaDescribedById) return {};
  return {
    'aria-describedby': ariaDescribedById,
    'aria-invalid': isInvalid ? 'true' : 'false',
  };
};

import React from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { getInputStyles } from '../../../util';

interface OptionCheckIconProps {
  selected?: boolean;
  active?: boolean;
}

export const OptionCheckIcon = ({
  selected = false,
  active = false,
}: OptionCheckIconProps) => {

  const styles = React.useMemo(() => (
    getInputStyles(stylesheet, { selected, active })
  ), [active, selected]);

  if (!selected) return null;

  return (
    <span className={styles.container}>
      <CheckIcon className={styles.icon} aria-hidden="true" />
    </span>
  );
}

const stylesheet = {
  container: {
    baseStyles: 'absolute inset-y-0 left-0 flex items-center pl-1.5',
    active: 'text-white',
    default: 'text-indigo-600',
  },
  icon: 'h-5 w-5',
};
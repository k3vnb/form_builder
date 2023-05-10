import React from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';

interface OptionCheckIconProps {
  selected?: boolean;
  active?: boolean;
}

export const OptionCheckIcon = ({
  selected = false,
  active = false,
}: OptionCheckIconProps) => {

  const containerClassNames = React.useMemo(() => (
    `${styles.container.baseStyles} ${active ? styles.container.active : styles.container.default}`
  ), [active]);

  if (!selected) return null;

  return (
    <span className={containerClassNames}>
      <CheckIcon className={styles.icon} aria-hidden="true" />
    </span>
  );
}

const styles = {
  container: {
    baseStyles: 'absolute inset-y-0 left-0 flex items-center pl-1.5',
    active: 'text-white',
    default: 'text-indigo-600',
  },
  icon: 'h-5 w-5',
};
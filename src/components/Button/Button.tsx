// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';

import { ReactNode, ComponentPropsWithoutRef } from 'react';
import { IconContext } from 'react-icons/lib';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children?: ReactNode;
  preIcon?: ReactNode;
  posIcon?: ReactNode;
  model?: 'single' | 'border';
  variant?: 'secondary' | 'primary' | 'danger' | 'toggle' | 'icon' | undefined;
  customClass?: string;
}

export function ButtonToggle(props: ButtonProps) {
  const { children, customClass, ...rest } = props;

  return (
    <button
      data-testid="button"
      type="button"
      className={`default-button default-toggle ${customClass}`}
      {...rest}
    >
      <div className="w-fit m-auto flex gap-2 items-baseline">{children}</div>
    </button>
  );
}

export function ButtonIcon(props: ButtonProps) {
  const { children, model = 'single', customClass, ...rest } = props;

  const models: Models = {
    single:
      'disabled:text-tertiary disabled:bg-secondary disabled:border-tertiary disabled:hover:border-tertiary',
    border:
      'border-0 bg-secondary hover:bg-tertiary disabled:bg-secondary disabled:text-tertiary',
  };

  interface Models {
    [key: string]: string | object;
  }

  return (
    <button
      data-testid="button"
      type="button"
      className={`default-button default-icon ${models[model]} ${customClass}`}
      {...rest}
    >
      <div className="w-fit m-auto flex gap-2 items-baseline">{children}</div>
    </button>
  );
}

export function Button(props: ButtonProps) {
  const {
    children,
    preIcon,
    posIcon,
    variant = 'primary',
    customClass,
    ...rest
  } = props;

  interface Classes {
    [key: string]: string | object;
  }

  const classes: Classes = {
    primary: 'default-primary',
    secondary: 'default-secondary',
    danger: 'default-danger',
    toggle: 'default-toggle',
    icon: 'default-icon',
  };

  const isToggle = variant === 'toggle';
  const isIcon = variant === 'icon';

  return isToggle ? (
    <ButtonToggle {...props} />
  ) : isIcon ? (
    <ButtonIcon {...props} />
  ) : (
    <button
      data-testid="button"
      type="button"
      className={`default-button px-4 py-3 ${classes[variant]} ${customClass}`}
      {...rest}
    >
      <div className="w-fit m-auto flex gap-2 items-baseline">
        <div className="m-auto">
          <IconContext.Provider value={{ className: 'w-6 h-6' }}>
            {preIcon}
          </IconContext.Provider>
        </div>
        {children}
        <div className="m-auto">
          <IconContext.Provider value={{ className: 'w-6 h-6' }}>
            {posIcon}
          </IconContext.Provider>
        </div>
      </div>
    </button>
  );
}

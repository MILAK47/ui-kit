// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';

import { ReactNode, ComponentPropsWithoutRef, cloneElement } from 'react';

export interface TransactionProps extends ComponentPropsWithoutRef<'div'> {
  preIcon: JSX.Element;
  title: string;
  address: string;
  posIcon: JSX.Element;
  amount: string;
  date: string;
  customClass?: string;
  variant?: 'secondary' | 'primary' | undefined;
  children?: ReactNode;
}

interface Classes {
  [key: string]: string | object;
}

export function Transaction(props: TransactionProps) {
  let {
    preIcon,
    title,
    address,
    posIcon,
    amount,
    date,
    variant = 'primary',
    children,
    customClass,
    ...rest
  } = props;

  const CLASSES: Classes = {
    root: 'flex justify-center items-center',
    primary: {
      default: 'default-primary',
      preIcon: 'bg-primary text-f-primary rounded-full p-1 h-8 w-8 mr-2',
    },
    secondary: {
      default: 'default-secondary',
      preIcon: 'bg-neutral text-f-secondary rounded-full p-1 h-8 w-8 mr-2',
    },
  };

  const VARIANT = CLASSES[variant] as Classes;

  const clonedPreIcon = preIcon
    ? cloneElement(preIcon, {
        className: VARIANT.preIcon,
      })
    : null;

  return (
    <div
      data-testid="transaction"
      className={`h-14 w-full p-3 rounded-lg mas-menu-active cursor-pointer 
                  flex flex-row items-center justify-between
                  ${CLASSES.root}
                  ${VARIANT.default}
                  ${customClass}`}
      {...rest}
    >
      <div className={`${CLASSES.root}`}>
        {clonedPreIcon}
        <div className="flex-col grid justify-items-start">
          <div>{title}</div>
          <div className={`${CLASSES.root} gap-1`}>
            <div>to:</div>
            <div className="underline underline-offset-2">
              {address.slice(0, 4)}...{address.slice(-4)}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col grid justify-items-end">
        <div className={`${CLASSES.root} gap-2`}>
          {amount}
          {posIcon}
        </div>
        <div>{date}</div>
      </div>
    </div>
  );
}

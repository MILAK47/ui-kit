// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect } from 'react';

import { ComponentPropsWithoutRef, useState, MouseEvent } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface IOption extends ComponentPropsWithoutRef<'div'> {
  icon?: JSX.Element;
  item: string;
  select?: number;
}

interface IDropdownProps extends ComponentPropsWithoutRef<'div'> {
  options: IOption[];
  size?: 'xs' | 'md';
  select?: number;
  readOnly?: boolean;
}

function Icon({ toggle }: { toggle: boolean }) {
  let IconclassName = 'max-w-fit stroke-current';

  return toggle ? (
    <FiChevronUp className={IconclassName} />
  ) : (
    <FiChevronDown className={IconclassName} />
  );
}

export function Dropdown(props: IDropdownProps) {
  let { size = 'md', select = 0, options, readOnly = false } = props;

  const classes = {
    xs: {
      button: 'w-full px-3 py-4 h-7 rounded hover:rounded',
      panel: 'w-full rounded hover:rounded',
      item: 'px-3 py-4 h-7 rounded hover:rounded',
      icon: 'pr-3',
    },
    md: {
      button: 'w-full px-6 py-3 h-14 rounded-lg hover:rounded-lg',
      panel: 'w-full rounded-lg hover:rounded-lg',
      item: 'w-full px-6 py-3 h-14 rounded-lg hover:rounded-lg',
      icon: 'pr-2',
    },
  };

  const firstObject = options[select];
  const [toggle, setToggle] = useState(false);
  const [selected, setSelected] = useState(firstObject);
  const hidden = toggle ? '' : 'hidden';

  // refresh the selected item when the select prop changes
  useEffect(() => {
    setSelected(options[select]);
  }, [select, options]);

  const customButtonClass = classes[size].button;
  const customItemClass = classes[size].item;
  const customIconClass = classes[size].icon;
  const customPanelClass = classes[size].panel;

  function toggleDropdown() {
    if (readOnly) return;

    setToggle(!toggle);
  }

  function handleOnClick(
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    idx: number,
  ) {
    let { onClick } = options[idx];

    setSelected(options[idx]);
    setToggle(!toggle);
    onClick?.(e);
  }

  return (
    <div className="relative flex-none" data-testid="dropdown">
      {readOnly && (
        <div
          className={`bg-primary absolute flex-none opacity-50 ${customButtonClass}`}
        ></div>
      )}

      <button
        data-testid={`dropdown-button`}
        onClick={toggleDropdown}
        type="button"
        className={`flex default-button border-secondary justify-between
                    ${customButtonClass}
                    items-center text-f-primary bg-secondary
                    hover:bg-tertiary hover:border-tertiary
                    disabled:text-f-disabled-1 disabled:bg-c-disabled-2 disabled:border-c-disabled-1`}
      >
        <div className={customIconClass}>{selected?.icon}</div>
        <div className="mas-menu-active p-2 truncate">{selected?.item}</div>
        <Icon toggle={toggle} />
      </button>
      <div
        id="options"
        className={`${hidden} mt-2 bg-secondary py-1.5 absolute z-10 ${customPanelClass}`}
      >
        <ul
          className="h-auto max-h-64 overflow-y-auto"
          aria-labelledby="dropdownUsersButton"
        >
          {options.map((option, idx) => {
            return (
              <li data-testid={`dropdown-item-${idx}`} key={idx}>
                <div
                  data-testid="dropdown-label"
                  onClick={(e) => handleOnClick(e, idx)}
                  className={`flex items-center cursor-pointer text-f-primary
                              ${customItemClass}
                              hover:bg-neutral/[.15] active:bg-neutral/[.3]
                              disabled:text-f-disabled-1 disabled:bg-c-disabled-2 disabled:border-c-disabled-1`}
                >
                  <div
                    data-testid={`dropdown-icon-${idx}`}
                    className={customIconClass}
                  >
                    {option.icon}
                  </div>
                  <div
                    data-testid={`dropdown-item-${idx}`}
                    className="mas-menu-active p-2 truncate"
                  >
                    {option.item}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

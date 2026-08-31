'use client';

import Select, { type SingleValue, type StylesConfig } from 'react-select';
import type { CSSProperties } from 'react';

export type SelectValue = string | number;

export interface SelectOption {
  value: SelectValue;
  label: string;
}

interface SelectFieldProps {
  inputId: string;
  name?: string;
  value: SelectValue | null;
  options: readonly SelectOption[];
  onChange: (value: SelectValue | null) => void;
  placeholder?: string;
  isDisabled?: boolean;
  isSearchable?: boolean;
  required?: boolean;
  ariaDescribedBy?: string;
  className?: string;
  compact?: boolean;
}

const selectStyles: StylesConfig<SelectOption, false> = {
  control: (base, state) => ({
    ...base,
    minHeight: 'var(--select-height)',
    borderColor: state.isFocused ? '#7e22ce' : '#d6d3d1',
    borderRadius: 'var(--select-radius)',
    backgroundColor: '#ffffff',
    boxShadow: state.isFocused ? '0 0 0 2px rgb(126 34 206 / 0.2)' : 'none',
    cursor: state.isDisabled ? 'not-allowed' : 'pointer',
    fontSize: '0.875rem',
    transition: 'border-color 150ms ease, box-shadow 150ms ease',
    '&:hover': {
      borderColor: state.isFocused ? '#7e22ce' : '#a8a29e',
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: '0 0.875rem',
  }),
  input: (base) => ({
    ...base,
    color: '#111827',
    margin: 0,
    padding: 0,
  }),
  placeholder: (base) => ({
    ...base,
    color: '#9ca3af',
  }),
  singleValue: (base) => ({
    ...base,
    color: '#111827',
    fontWeight: 600,
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? '#7e22ce' : '#6b7280',
    padding: '0 0.625rem',
    '&:hover': { color: '#7e22ce' },
  }),
  menu: (base) => ({
    ...base,
    zIndex: 40,
    overflow: 'hidden',
    border: '1px solid #e7e5e4',
    borderRadius: '0.75rem',
    boxShadow: '0 18px 45px rgb(28 25 23 / 0.14)',
  }),
  menuList: (base) => ({
    ...base,
    padding: '0.375rem',
  }),
  option: (base, state) => ({
    ...base,
    borderRadius: '0.5rem',
    backgroundColor: state.isSelected
      ? '#6b21a8'
      : state.isFocused
        ? '#faf5ff'
        : '#ffffff',
    color: state.isSelected ? '#ffffff' : '#1f2937',
    cursor: 'pointer',
    fontSize: '0.875rem',
    padding: '0.625rem 0.75rem',
    '&:active': {
      backgroundColor: state.isSelected ? '#581c87' : '#f3e8ff',
    },
  }),
};

export default function SelectField({
  inputId,
  name,
  value,
  options,
  onChange,
  placeholder = 'Select an option',
  isDisabled,
  isSearchable = false,
  required,
  ariaDescribedBy,
  className,
  compact = false,
}: SelectFieldProps) {
  const selectedOption = options.find((option) => option.value === value) ?? null;

  const handleChange = (option: SingleValue<SelectOption>) => {
    onChange(option?.value ?? null);
  };

  return (
    <div
      className={className}
      style={
        {
          '--select-height': compact ? '2.75rem' : '3rem',
          '--select-radius': compact ? '0.5rem' : '0.75rem',
        } as CSSProperties
      }
    >
      <Select<SelectOption, false>
        inputId={inputId}
        instanceId={inputId}
        name={name}
        value={selectedOption}
        options={options}
        onChange={handleChange}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isSearchable={isSearchable}
        required={required}
        aria-describedby={ariaDescribedBy}
        menuPlacement="auto"
        classNamePrefix="nbtf-select"
        styles={selectStyles}
      />
    </div>
  );
}

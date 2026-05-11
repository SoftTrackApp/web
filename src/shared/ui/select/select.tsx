import ReactSelect, { type Props } from 'react-select';

export function Select(props: Props) {
  return (
    <ReactSelect
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderRadius: 8,
          borderColor: state.isFocused ? 'hsla(263, 60%, 50%, 1)' : 'hsla(263, 4%, 74%, 1)',
          boxShadow: state.isFocused ? '0 0 0 1px #7c3aed' : 'none',
          '&:hover': {
            borderColor: 'hsla(263, 60%, 50%, 1)',
          },
        }),
      }}
      noOptionsMessage={() => 'Ничего не найдено'}
      {...props}
    />
  );
}

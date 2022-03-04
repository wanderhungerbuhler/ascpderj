import { FormControl, FormLabel, Input as ChackraInput, InputProps as ChackraInputProps } from '@chakra-ui/react';

interface InputProps extends ChackraInputProps {
  name: string;
  label?: string;
}

export function Input({ name, label, ...rest }: InputProps) {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name} mt="2" color="gray.500">{label}</FormLabel>}
      <ChackraInput
        borderWidth={.1}
        name={name}
        id={name}
        focusBorderColor="blue.500"
        bgColor="gray.900"
        variant="filled"
        _hover={{
          bgColor: "gray.900"
        }}
        size="lg"
        {...rest}
      />
    </FormControl>
  );
}

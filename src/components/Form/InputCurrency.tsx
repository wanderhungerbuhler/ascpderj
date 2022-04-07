import * as React from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input as ChackraInput, InputProps as ChackraInputProps } from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends ChackraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
  decimalsLimit?: number;
  decimalScale?: number;
}

import CurrencyInput from 'react-currency-input-field';

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, decimalsLimit, decimalScale, error = null, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name} mt="2" color="gray.500">{label}</FormLabel>}
      <ChackraInput
        as={CurrencyInput}
        decimalSeparator=","
        groupSeparator="."
        decimalsLimit={decimalsLimit}
        decimalScale={decimalScale}
        // intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
        borderWidth={.1}
        name={name}
        id={name}
        focusBorderColor="blue.500"
        bgColor="gray.900"
        variant="filled"
        _hover={{
          bgColor: "gray.900"
        }}
        error={error?.message}
        size="lg"
        ref={ref}
        {...rest}
      />
      {!!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
}

export const InputCurrency = forwardRef(InputBase);

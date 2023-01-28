import React, { Dispatch, SetStateAction } from 'react'

export type InputType = {
  fieldType: string;
  name: string;
  error: null | string;
  value: string;
  id: number;
  type?: string;
}

export type Props = {
  children: React.ReactNode;
  inputs: InputType[];
  setInputs: Dispatch<SetStateAction<InputType[]>>;
  setIsFailValidate: Dispatch<SetStateAction<boolean>>;
  title: string;
}

import { FormEventHandler } from 'react';

export type Props = {
  submit: FormEventHandler<HTMLFormElement>;
  isEmptyTriggered?: boolean;
  setText: (value: string) => void;
  isDisabledButton: boolean;
}

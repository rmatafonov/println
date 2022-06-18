type CallbackType = (arg: string) => void

export type Props = {
  setEditorText: CallbackType;
  isEmptyTriggered?: boolean;
}

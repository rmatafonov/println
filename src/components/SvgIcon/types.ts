import { SVGProps } from 'react';

export type Props = {
  name: string;
  color: string;
  size: string;
} & SVGProps<SVGAElement>

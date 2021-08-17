import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface PTagProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>  {
  size?: 's' | 'm' | 'l'
}
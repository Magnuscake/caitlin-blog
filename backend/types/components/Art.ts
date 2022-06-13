import { Media } from './Media';

export interface Art {
  id: number;
  attributes: {
    title: string;
    description: text;
    content: string;
    media: { data: Media };
  }
}
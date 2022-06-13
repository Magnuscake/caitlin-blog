import { Media } from './Media';

export interface Photo {
  id: number;
  attributes: {
    title: string;
    description: text;
    content: string;
    media: { data: Media };
    slug: string;
  }
}
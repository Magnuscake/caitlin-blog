import { Media } from './Media';

export interface Seo {
  id: number;
  attributes: {
    metaTitle: string;
    metaDescription: text;
    shareImage: { data: Media };
  }
}
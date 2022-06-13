import { Media } from './Media';
import { Seo } from './Seo';

export interface Global {
  id: number;
  attributes: {
    siteName: string;
    defaultSeo: { data: Seo } | number;
    favicon: { data: Media };
  }
}
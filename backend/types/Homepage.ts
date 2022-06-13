import { Hero } from './Hero';
import { Seo } from './Seo';

export interface Homepage {
  id: number;
  attributes: {
    seo: { data: Seo } | number;
    hero: { data: Hero } | number;
  }
}
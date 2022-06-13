import { Category } from './Category';
import { Media } from './Media';

export interface Post {
  id: number;
  attributes: {
    title: string;
    description: text;
    content: string;
    slug: string;
    image: { data: Media };
    posts: { data: Category } | number;
  }
}
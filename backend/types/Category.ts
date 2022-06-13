import { Post } from './Post';

export interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
    category: { data: Post[] } | number[];
  }
}
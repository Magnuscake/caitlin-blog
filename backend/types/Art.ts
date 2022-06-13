import { Art } from './components/Art';

export interface Art {
  id: number;
  attributes: {
    photos: { data: Art[] } | number[];
    videos: { data: Art[] } | number[];
  }
}
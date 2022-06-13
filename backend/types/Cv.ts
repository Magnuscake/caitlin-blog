import { Work } from './Work';

export interface Cv {
  id: number;
  attributes: {
    work: { data: Work[] } | number[];
    name: string;
    email: string;
    education: { data: Work[] } | number[];
    achievements: { data: Work[] } | number[];
  }
}
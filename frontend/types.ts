// component types
export interface HeroComponent {
  id: number;
  title: string;
}

export interface SeoComponent {
  id: number;
  attributes: {
    metaTitle: string;
    metaDescription: string;
    shareImage: { data: Media };
  };
}

export interface ArtComponent {
  id: number;
  attributes: {
    title: string;
    description: string;
    content: string;
    media: { data: Media };
  };
}

export interface WorkComponent {
  id: number;
  title?: string;
  year: number;
  details?: string;
}

export interface Homepage {
  id: number;
  attributes: {
    seo: { data: SeoComponent } | number;
    hero: HeroComponent;
  };
}

export interface CV {
  id: number;
  attributes: {
    work: WorkComponent[];
    name: string;
    email: string;
    education: WorkComponent[];
    achievements: WorkComponent[];
  };
}

// media types
export interface MediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: string;
  url: string;
}

export interface Media {
  attributes: {
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: {
      thumbnail: MediaFormat;
      medium: MediaFormat;
      small: MediaFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string;
    provider: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

// collection content types
export interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
    category: { data: Post[] } | number[];
  };
}

export interface Post {
  id: number;
  attributes: {
    title: string;
    description: string;
    content: string;
    slug: string;
    heroImage: { data: Media };
    publishedAt: Date;
  };
}

export interface Art {
  id: number;
  attributes: {
    title: string;
    description: string;
    content: string;
    slug: string;
    media: { data: Array<Media> | Media };
    publishedAt: Date;
  };
}

export interface Photo extends Art {
  attributes: {
    title: string;
    description: string;
    content: string;
    slug: string;
    media: { data: Array<Media> | Media };
    heroPhoto: { data: Media };
    publishedAt: Date;
  };
}

export interface Video {
  id: number;
  attributes: {
    title: string;
    description: string;
    content: string;
    slug: string;
    video: { data: Media };
    publishedAt: Date;
  };
}

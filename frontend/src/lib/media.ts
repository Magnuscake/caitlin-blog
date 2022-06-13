import type { Media } from "types";
import { getStrapiURL } from "./api";

export interface IMedia {
  data: Media | Array<Media>;
}

export function getStrapiMedia(media: IMedia) {
  if (typeof media.data === "object" && !Array.isArray(media.data)) {
    const { url } = media.data.attributes;
    const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
    return imageUrl;
  }
}

// Get multiple media urls
export function getAllStrapiMedia(media: IMedia) {
  if (typeof media.data === "object" && Array.isArray(media.data)) {
    const allMedia = media.data.forEach((item) => {
      const { url } = item.attributes;
      const mediaUrl = url.startsWith("/") ? getStrapiURL(url) : url;

      return mediaUrl;
    });

    return allMedia;
  }
}

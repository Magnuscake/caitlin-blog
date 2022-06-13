import { getStrapiMedia } from "@lib/media";
import NextImage, { ImageProps } from "next/image";

import type { Media } from "types";

export interface IImageProps {
  image: {
    data: Media;
  };
  h?: number;
  w?: number;
  fit?: ImageProps["objectFit"];
}

const Image = ({ image, h, w, fit }: IImageProps) => {
  const { alternativeText, width, height } = image.data.attributes;

  return (
    <NextImage
      layout="responsive"
      width={w ?? width}
      height={h ?? height}
      objectFit={fit ?? "contain"}
      src={getStrapiMedia(image) || ""}
      alt={alternativeText || ""}
    />
  );
};

export default Image;

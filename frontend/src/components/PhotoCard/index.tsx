import { FC } from "react";
import Link from "next/link";
import { Overlay, Box, Transition, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";

import type { Photo } from "types";

import Image from "@components/Image";

export interface IPhotoCardProps {
  photo: Photo;
}

const PhotoCard: FC<IPhotoCardProps> = ({ photo }) => {
  const { hovered, ref } = useHover();

  const { title, description, heroPhoto, slug } = photo.attributes;

  return (
    <Link passHref href={`/art/photos/${slug}`}>
      <div ref={ref} style={{ alignSelf: "center", position: "relative" }}>
        <Image image={heroPhoto} />
        <Transition
          mounted={hovered}
          transition="fade"
          duration={400}
          timingFunction="ease"
        >
          {(styles) => (
            <Overlay
              style={{ ...styles }}
              gradient={`linear-gradient(0deg, rgba(28,28,28,0.9037815809917717) 0%, rgba(2,0,36,0) 80%);`}
            >
              <Box
                sx={{
                  color: "#fff",
                  width: "100%",
                  textAlign: "center",
                  position: "absolute",
                  bottom: 40,
                }}
              >
                <Text size="lg">{title}</Text>
                <Text size="sm">{description}</Text>
              </Box>
            </Overlay>
          )}
        </Transition>
      </div>
    </Link>
  );
};

export default PhotoCard;

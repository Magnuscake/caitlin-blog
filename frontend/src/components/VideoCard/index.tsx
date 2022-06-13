import { FC } from "react";
import { Overlay, Box, Transition, Text, Title } from "@mantine/core";
import Link from "next/link";
import { useHover } from "@mantine/hooks";

import type { Video } from "types";

import { getStrapiURL } from "@lib/api";

export interface IVideoCardProps {
  video: Video;
}

// prettier-ignore
// PIP icon keeps popping up when only using the video tag, so insert the video
// into an iframe
const getIframeSrc = (videoUrl: string) => `
  <html>
    <head>
      <style>
        body { margin: 0;padding: 0; }
        .bg-video-wrap { position: relative;overflow: hidden; width: 100%; height: 100vh;display: flex; }
        video { object-fit: cover; min-width: 100%; min-height: 100vh; z-index: 1; pointer-events: none; }
      </style>

    </head>
    <body>
      <div class='bg-video-wrap'>
        <video muted nocontrols controlslist="noplaybackrate" nodownload nofullscreen>
          <source src=${getStrapiURL(videoUrl)}#t=10 type='video/mp4'>
        </video>
      </div>
    </body>
  </html>
`;


const VideoCard: FC<IVideoCardProps> = ({ video }) => {
  const { hovered, ref } = useHover();

  const { title, description, media, slug } = video.attributes;

  return (
    <Link passHref href={`/art/videos/${slug}`}>
      <div
        ref={ref}
        style={{
          width: "100%",
          height: 220,
          alignSelf: "center",
          position: "relative",
        }}
      >
        <iframe
          frameBorder="0"
          width="100%"
          height="220"
          allowFullScreen
          srcDoc={
            // sigh...typeguard
            typeof media.data === "object" && !Array.isArray(media.data)
              ? getIframeSrc(media.data.attributes.url)
              : ""
          }
        />
        <Transition
          mounted={hovered}
          transition="fade"
          duration={400}
          timingFunction="ease"
        >
          {(styles) => (
            <Overlay
              style={{ ...styles }}
              gradient={`linear-gradient(0deg, rgba(28,28,28,0.9037815809917717) 0%, rgba(2,0,36,0) 100%);`}
            >
              <Box
                sx={{
                  color: "#fff",
                  width: "100%",
                  textAlign: "center",
                  position: "absolute",
                  bottom: 30,
                }}
                px={10}
              >
                <Title order={3}>{title}</Title>
                <Text>{description}</Text>
              </Box>
            </Overlay>
          )}
        </Transition>
      </div>
    </Link>
  );
};

export default VideoCard;

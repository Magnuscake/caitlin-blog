import type { NextPage } from "next";
import { Container, SimpleGrid, Title, Text } from "@mantine/core";

import type { Video } from "types";

import VideoCard from "@components/VideoCard";

import { fetchAPI } from "@lib/api";

export interface IVideoProps {
  videos: Array<Video>;
}

const Videos: NextPage<IVideoProps> = ({ videos }) => {
  return (
    <Container size="lg">
      <Title order={2} mb={40}>
        le monde est ma toile
      </Title>
      <Text>Nothing to see here at the moment</Text>
      {/*!videos || videos === [] || !videos.length ? (
        <Text>Nothing to see here at the moment</Text>
      ) : (
        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: 1005, cols: 2, spacing: "md" },
            { maxWidth: 600, cols: 1, spacing: "sm" },
          ]}
        >
          {videos.map((video: Video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </SimpleGrid>
      )*/}
    </Container>
  );
};

// export async function getStaticProps() {
//   const videosRes = await fetchAPI("/art-videos", { populate: "*" });
//
//   return {
//     props: {
//       videos: videosRes.data,
//     },
//     revalidate: 1,
//   };
// }
export default Videos;

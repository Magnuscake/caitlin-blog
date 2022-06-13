import type { NextPage } from "next";
import { Container, SimpleGrid, Text, Title } from "@mantine/core";

import type { Photo } from "types";

import PhotoCard from "@components/PhotoCard";

import { fetchAPI } from "@lib/api";

export interface IPhotoProps {
  photos: Array<Photo>;
}

const Photos: NextPage<IPhotoProps> = ({ photos }) => {
  return (
    <Container size="lg">
      <Title order={2} mb={40}>
        le monde est ma toile
      </Title>
      {!photos || photos === [] || !photos.length ? (
        <Text>Nothing to see here at the moment</Text>
      ) : (
        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: 1005, cols: 2, spacing: "md" },
            { maxWidth: 600, cols: 1, spacing: "sm" },
          ]}
        >
          {photos.map((photo: Photo) => (
            <PhotoCard photo={photo} key={photo.id} />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export async function getStaticProps() {
  const photosRes = await fetchAPI("/photos", { populate: "*" });

  return {
    props: {
      photos: photosRes.data,
    },
    revalidate: 10,
  };
}
export default Photos;

import { GetStaticPaths, GetStaticProps } from "next";
import {
  Container,
  Image as MantineImage,
  Text,
  Title,
  Divider,
  createStyles,
} from "@mantine/core";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";

import SEO from "@components/SEO";

import { fetchAPI } from "@lib/api";
import { getStrapiMedia } from "@lib/media";
import { Photo } from "types";

export interface IPhotoProps {
  photo: Photo;
}

const useStyles = createStyles({
  imgContainer: {
    width: "80%",
    marginBottom: "1.4rem",

    // Static media query
    "@media (max-width: 800px)": {
      width: "100%",
    },
  },
});

const Photo = ({ photo }: IPhotoProps) => {
  const { title, description, content, media, publishedAt } = photo.attributes;
  const imageUrl = getStrapiMedia(media);

  const { classes } = useStyles();

  const seo = {
    metaTitle: title,
    metaDescription: description,
    shareImage: media,
    article: true,
  };

  return (
    <>
      <SEO seo={seo} />
      <Container size="md" style={{ display: "grid", placeItems: "center" }}>
        <div
          data-src={imageUrl}
          data-srcset={imageUrl}
          style={{ textAlign: "center" }}
        >
          <Title order={1} style={{ marginBottom: "0.3rem" }}>
            {title}
          </Title>
          <Text size="lg" style={{ marginBottom: "0.9rem" }}>
            {description}
          </Text>
        </div>
        <div className={classes.imgContainer}>
          <MantineImage
            radius="sm"
            src={imageUrl}
            alt={
              (typeof media.data === "object" &&
                !Array.isArray(media.data) &&
                media.data.attributes.alternativeText) ||
              ""
            }
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
            }}
          />
        </div>
        <Container size="sm">
          <section
            style={{ margin: "0 auto", fontSize: "1.15rem", lineHeight: 1.25 }}
          >
            <ReactMarkdown children={content} />
          </section>
        </Container>
        <Divider
          style={{ width: "100%" }}
          my="md"
          size="md"
          label={<Moment format="MMM Do YYYY">{publishedAt}</Moment>}
        />
      </Container>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const photoRes = await fetchAPI("/photos", { fields: ["slug"] });
  return {
    paths: photoRes.data.map((photo: Photo) => ({
      params: {
        slug: photo.attributes.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const photoRes = await fetchAPI("/photos", {
    filters: {
      slug: params?.slug,
    },
    populate: ["heroImage"],
  });

  return {
    props: { photo: photoRes.data[0] },
    revalidate: 1,
  };
};

export default Photo;

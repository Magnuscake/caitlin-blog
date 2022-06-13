import { useState, useEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { Container, Text, Title, Divider } from "@mantine/core";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import ReactPlayer from "react-player";

import SEO from "@components/SEO";

import { fetchAPI } from "@lib/api";
import { getStrapiMedia } from "@lib/media";

import { Video } from "types";

export interface IVideoProps {
  video: Video;
}

const Video = ({ video }: IVideoProps) => {
  const [isSSR, setIsSSR] = useState(false);

  useEffect(() => {
    setIsSSR(true);
  }, []);

  const { title, description, content, media, publishedAt } = video.attributes;
  const videoUrl = getStrapiMedia(media);

  const seo = {
    metaTitle: title,
    metaDescription: description,
    shareImage: media,
    article: true,
  };

  return (
    <>
      {/*
      <SEO seo={seo} />
      <Container size="md" style={{ display: "grid", placeItems: "center" }}>
        <div
          data-src={videoUrl}
          data-srcset={videoUrl}
          style={{ textAlign: "center" }}
        >
          <Title order={1} style={{ marginBottom: "0.3rem" }}>
            {title}
          </Title>
          <Text size="lg" style={{ marginBottom: "0.9rem" }}>
            {description}
          </Text>
        </div>
        <div>{isSSR && <ReactPlayer url={videoUrl} controls />}</div>
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
      */}
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const videosRes = await fetchAPI("/art-videos", { fields: ["slug"] });
  return {
    paths: videosRes.data.map((video: Video) => ({
      params: {
        slug: video.attributes.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const videoRes = await fetchAPI("/art-videos", {
    filters: {
      slug: params?.slug,
    },
    populate: ["media"],
  });

  return {
    props: { video: videoRes.data[0] },
    revalidate: 1,
  };
};

export default Video;

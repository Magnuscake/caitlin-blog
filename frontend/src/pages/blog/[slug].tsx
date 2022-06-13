import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import {
  Container,
  Image as MantineImage,
  Text,
  Title,
  Divider,
} from "@mantine/core";
import { GetStaticPaths, GetStaticProps } from "next";

import SEO from "@components/SEO";

import { fetchAPI } from "@lib/api";
import { getStrapiMedia } from "@lib/media";
import { Post } from "types";

export interface IBlogPost {
  post: Post;
}

const BlogPost = ({ post }: IBlogPost) => {
  const { title, description, content, heroImage, publishedAt } =
    post.attributes;
  const imageUrl = getStrapiMedia(post.attributes.heroImage);

  const seo = {
    metaTitle: post.attributes.title,
    metaDescription: post.attributes.description,
    shareImage: post.attributes.heroImage,
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
          <div
            style={{
              width: "100%",
              marginBottom: "1.4rem",
            }}
          >
            <MantineImage
              radius="sm"
              src={imageUrl}
              alt={heroImage.data.attributes.alternativeText || ""}
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
              }}
            />
          </div>
        </div>
        <section
          style={{ margin: "0 auto", fontSize: "1.15rem", lineHeight: 1.25 }}
        >
          <ReactMarkdown children={content} />
        </section>
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
  const postRes = await fetchAPI("/posts", { fields: ["slug"] });

  return {
    paths: postRes.data.map((post: Post) => ({
      params: {
        slug: post.attributes.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postRes = await fetchAPI("/posts", {
    filters: {
      slug: params?.slug,
    },
    populate: ["heroImage"],
  });

  return {
    props: { post: postRes.data[0] },
    revalidate: 1,
  };
};

export default BlogPost;

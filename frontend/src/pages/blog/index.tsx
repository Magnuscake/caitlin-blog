import type { NextPage } from "next";
import { Container, Title, SimpleGrid, Box, Text } from "@mantine/core";
import BlogCard from "@components/BlogCard";

import type { Post } from "types";
import { fetchAPI } from "@lib/api";

export interface IBlogProps {
  posts: Array<Post>;
}

const Blog: NextPage<IBlogProps> = ({ posts }) => {
  return (
    <Container size="lg">
      <Title order={2} mb={60}>
        My Musings
      </Title>
      {!posts || posts === [] || !posts.length ? (
        <Text>Nothing to see here at the moment</Text>
      ) : (
        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: 990, cols: 2, spacing: "sm" },
            { maxWidth: 600, cols: 1, spacing: "sm" },
          ]}
        >
          {posts.map((post: Post) => (
            <Box
              key={post.id}
              sx={{
                transition: "all .2s ease-in-out",
                "&:hover": {
                  transform: "translate3d(0px, -3px, 0px)",
                },
              }}
            >
              <BlogCard post={post} key={post.id} />
            </Box>
          ))}
          {posts.map((post: Post) => (
            <Box
              key={post.id}
              sx={{
                transition: "all .2s ease-in-out",
                "&:hover": {
                  transform: "translate3d(0px, -3px, 0px)",
                },
              }}
            >
              <BlogCard post={post} key={post.id} />
            </Box>
          ))}
          {posts.map((post: Post) => (
            <Box
              key={post.id}
              sx={{
                transition: "all .2s ease-in-out",
                "&:hover": {
                  transform: "translate3d(0px, -3px, 0px)",
                },
              }}
            >
              <BlogCard post={post} key={post.id} />
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const postRes = await fetchAPI("/posts", { populate: "*" });

  return {
    props: {
      // posts: postsRes.data,
      posts: postRes.data,
    },
    revalidate: 10,
  };
}

export default Blog;

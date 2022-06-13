import { Card, Text, Group, useMantineTheme } from "@mantine/core";
import Link from "next/link";

import type { Post } from "types";

import Image from "@components/Image";

export interface IBlogCard {
  post: Post;
}

const BlogCard = ({ post }: IBlogCard) => {
  const theme = useMantineTheme();

  const { title, description, heroImage, slug } = post.attributes;

  return (
    <Link passHref href={`/blog/${slug}`}>
      <Card
        p="lg"
        style={{
          height: "auto",
          width: "100%",
          margin: "0 auto",
          padding: "30px",
          border: "1px solid rgba(0, 0, 0, 0.2)",
        }}
      >
        <Card.Section>
          <Image image={heroImage} h={360} w={500} fit="cover" />
        </Card.Section>

        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text size="lg" weight={500}>
            {title}
          </Text>
        </Group>

        <Text size="sm" style={{ lineHeight: 1.5 }}>
          {description}
        </Text>
      </Card>
    </Link>
  );
};

export default BlogCard;

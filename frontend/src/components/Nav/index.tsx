import { useState, ReactElement } from "react";
import Link from "next/link";
import { Box, Title, Group, Button, Popover, Stack } from "@mantine/core";

export interface Link {
  title: string;
  href: string;
}

const Nav = () => {
  const [opened, setOpened] = useState(false);

  return (
    <Box
      sx={(theme) => ({
        padding: theme.spacing.xl,
        display: "flex",
        justifyContent: "space-between",
      })}
    >
      <Link passHref href="/">
        <Title order={1} style={{ fontWeight: 300, cursor: "pointer" }}>
          CK
        </Title>
      </Link>
      <Group spacing="lg">
        <Link href="/blog" passHref>
          <Button color="dark" variant="subtle">
            blog
          </Button>
        </Link>

        <Popover
          opened={opened}
          onClose={() => setOpened(false)}
          position="bottom"
          placement="center"
          withArrow
          trapFocus={false}
          closeOnEscape={false}
          transition="pop"
          width={160}
          target={
            <Button
              onClick={() => setOpened(true)}
              color="dark"
              variant="subtle"
            >
              art
            </Button>
          }
        >
          <Stack>
            <Link passHref href="/art/photos">
              <Button
                onClick={() => setOpened(false)}
                color="dark"
                variant="subtle"
              >
                photos
              </Button>
            </Link>

            <Link passHref href="/art/videos">
              <Button
                onClick={() => setOpened(false)}
                color="dark"
                variant="subtle"
              >
                videos
              </Button>
            </Link>
          </Stack>
        </Popover>

        <Link href="/cv" passHref>
          <Button color="dark" variant="subtle">
            CV
          </Button>
        </Link>
      </Group>
    </Box>
  );
};

export default Nav;

import { NextPage } from "next";
import { Box, Container, Divider, Text, Title } from "@mantine/core";

import type { CV, WorkComponent } from "types";
import { fetchAPI } from "@lib/api";
import ReactMarkdown from "react-markdown";

export interface ICVProps {
  cv: CV;
}
const CV: NextPage<ICVProps> = ({ cv }) => {
  const { name, email, education, work } = cv.attributes;

  return (
    <Container size="lg">
      <Title order={1}>{`Hi, I'm ${name}`}</Title>
      <section style={{ margin: "19px 0" }}>
        <Title order={2}>Education</Title>
        <Divider my={9} />
        {!education || education === [] || !education.length ? (
          <Text>This remains empty </Text>
        ) : (
          education
            .sort((a, b) => b.year - a.year)
            .map((item: WorkComponent) => (
              <Box key={item.id}>
                <Text size="xl" weight={700}>
                  {item.year}
                </Text>
                <Text>{item.details}</Text>
              </Box>
            ))
        )}
      </section>

      <section style={{ margin: "19px 0" }}>
        <Title order={2}>Work</Title>
        <Divider my={9} />
        {!work || work === [] || !work.length ? (
          <Text>This remains empty </Text>
        ) : (
          work
            .sort((a, b) => b.year - a.year)
            .map((item: WorkComponent) => (
              <Box key={item.id}>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <Text size="xl" weight={700} style={{ marginRight: "30px" }}>
                    {item.year}
                  </Text>
                  {item.title && (
                    <Text size="xl" weight={700}>
                      {item.title}
                    </Text>
                  )}
                </div>
                {item.details && <ReactMarkdown children={item.details} />}
              </Box>
            ))
        )}
      </section>
    </Container>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const cvRes = await fetchAPI("/cv", { populate: "*" });

  return {
    props: {
      cv: cvRes.data,
    },
    revalidate: 10,
  };
}

export default CV;

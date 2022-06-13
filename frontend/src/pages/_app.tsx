import { createContext } from "react";
import App from "next/app";
import Head from "next/head";
import type { AppProps, AppContext } from "next/app";
import { Global, MantineProvider } from "@mantine/core";

import Nav from "@components/Nav";
import { fetchAPI } from "@lib/api";
import { getStrapiMedia } from "@lib/media";

export const GlobalContext = createContext({});

function MyApp({ Component, pageProps }: AppProps) {
  const { global } = pageProps;

  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href={getStrapiMedia(global.attributes.favicon)}
        />
      </Head>
      <Global
        styles={[
          {
            body: {
              background: "#f2f2f2",
            },
          },
        ]}
      />
      <GlobalContext.Provider value={global.attributes}>
        <MantineProvider
          theme={{
            headings: {
              fontFamily: "'Assistant', serif",
              fontWeight: 600,
            },
            fontFamily: "'Assistant', serif",
          }}
          styles={{ Button: { root: { fontSize: 15 } } }}
          withNormalizeCSS
          withGlobalStyles
        >
          <div style={{ marginBottom: "90px" }}>
            <Nav />
            <Component {...pageProps} />
          </div>
        </MantineProvider>
      </GlobalContext.Provider>
    </>
  );
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx: AppContext) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  const globalRes = await fetchAPI("/global", {
    populate: {
      favicon: "*",
      defaultSeo: {
        populate: "*",
      },
    },
  });
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data } };
};

export default MyApp;

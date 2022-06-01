import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import { routes } from "../src/routes";
import { Article } from "../@types";
import ArticleComponent from "../components/Article/Article";
import { Container } from "@material-ui/core";
import Error from "next/error";
import { Box } from "@mui/system";

type Props = {
  articles: Article[];
  errorCode: number | boolean;
};

const Home: NextPage<Props> = (props: Props) => {
  const { articles = [], errorCode } = props;

  if (errorCode) {
    return <Error statusCode={+errorCode} />;
  }

  return (
    <Layout>
      <Head>
        <title>{routes.articles.label}</title>
      </Head>

      <Container maxWidth="md">
        <Box display="flex" flexDirection="column" gap="24px">
          {articles.length > 0
            ? articles.map((ar: Article) => (
                <ArticleComponent {...ar} key={ar.title} />
              ))
            : "Nothing to show"}
        </Box>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
}) => {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const baseUrl = req ? `${protocol}://${req.headers.host}` : "";

  const response = await fetch(baseUrl + "/api/articles");
  const errorCode = response.ok ? false : response.status;
  const { data } = await response.json();

  return {
    props: {
      articles: data,
      errorCode,
    },
  };
};

export default Home;

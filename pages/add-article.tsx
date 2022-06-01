import { NextPage } from "next";
import Layout from "../components/Layout/Layout";
import Head from "next/head";
import { routes } from "../src/routes";
import ArticleCreateForm from "../components/ArticleCreateForm/ArticleCreateForm";
import { Container } from "@material-ui/core";

const AddArticle: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>{routes.addArticle.label}</title>
      </Head>

      <Container maxWidth="sm">
        <ArticleCreateForm />
      </Container>
    </Layout>
  );
};

export default AddArticle;

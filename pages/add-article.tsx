import { NextPage } from 'next';
import Layout from '../components/Layout/Layout';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { Button } from '@material-ui/core';
import { routes } from '../src/routes';

const AddArticle: NextPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>{routes.addArticle.label}</title>
        </Head>

        <main className={styles.main}>
          <Button variant="contained">Add Article</Button>
        </main>

        <footer className={styles.footer}>

        </footer>
      </div>
    </Layout>
  )
}

export default AddArticle

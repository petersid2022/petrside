import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { GetStaticProps, GetStaticPaths } from 'next';

export default function Post({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) {
    
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <section className={utilStyles.introSection}>
      <article>
        <h1 style={{marginTop:'-20px'}} className={utilStyles.headingPostTitle}>{postData.title}</h1>
        <div style={{marginTop:'2px', marginBottom:'8px'}} className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div
          className={utilStyles.content}
          style={{marginBottom:'-1rem'}}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
      </section>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string);
  return {
    props: {
      postData,
    },
  };
};

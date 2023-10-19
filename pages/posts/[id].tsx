import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import WordCount from '../../components/wordcount';
import utilStyles from '../../styles/utils.module.css';
import { GetStaticProps, GetStaticPaths } from 'next';
import { RxDotFilled } from 'react-icons/rx';

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
            <section className={utilStyles.PostSection}>
                <article>
                    <h1 className={utilStyles.headingPostTitleId}>{postData.title}</h1>
                    <div style={{ marginTop:'12px' }} className={utilStyles.lightText}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                            <Date dateString={postData.date} />
                            <span style={{ marginLeft: '3px', marginRight: '3px', fontSize: '10px' }}><RxDotFilled /></span>
                            <span>
                                <WordCount input={postData.contentHtml} /> min read
                            </span>
                        </div>
                    </div>
                    <div
                        className={utilStyles.content}
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

import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import WordCount from '../../components/wordcount';
import utilStyles from '../../styles/utils.module.css';
import { GetStaticProps, GetStaticPaths } from 'next';
import { RxDotFilled } from 'react-icons/rx';
//import { AiOutlineRead } from 'react-icons/ai';
//import { AiOutlineCalendar } from 'react-icons/ai';
import { BsCalendar2Date } from 'react-icons/bs';
import { BsClockHistory } from 'react-icons/bs';

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
                    <h1 style={{ marginTop: '-20px' }} className={utilStyles.headingPostTitleId}>{postData.title}</h1>
                    <div style={{ marginTop: '8px', marginBottom: '4px' }} className={utilStyles.lightText}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <span style={{ marginRight: '4px', fontSize: '16px' }}><BsCalendar2Date /></span>
                            <Date dateString={postData.date} />
                            <span style={{ marginLeft: '6px', marginRight: '6px', fontSize: '8px' }}><RxDotFilled /></span>
                            <span style={{ marginRight: '4px', fontSize: '16px' }}><BsClockHistory /></span>
                            <span>
                                <WordCount input={postData.contentHtml} /> min read
                            </span>
                        </div>
                    </div>
                    <div
                        className={utilStyles.content}
                        style={{ marginBottom: '-0.85rem' }}
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

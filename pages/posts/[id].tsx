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
            <div className="bg-white max-w-fit rounded overflow-hidden shadow-2xl">
                <div className="px-6 py-4">
                    <div className="font-bold text-3xl">{postData.title}</div>
                    <div className="py-2 text-gray-500 text-base flex items-center">
                        <Date dateString={postData.date} />
                        <span className="mx-2 text-sm">
                            <RxDotFilled />
                        </span>
                        <span>
                            <WordCount input={postData.contentHtml} /> min read
                        </span>
                    </div>
                    <div
                        className={utilStyles.content}
                        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                    />
                </div>
            </div>
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

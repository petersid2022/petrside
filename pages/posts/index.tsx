import Head from 'next/head';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Link from 'next/link';

interface PostData {
    id: string;
    date: string;
    title: string;
}

interface PostsPageProps {
    allPostsData: PostData[];
}

export default function PostsPage({ allPostsData }: PostsPageProps) {
    return (
        <Layout>
            <Head>
                <title>All Blog Posts</title>
            </Head>
            <section className={utilStyles.introSectionAllPosts} style={{ maxWidth: '60rem' }}>
                <h1 className={utilStyles.headingLg} style={{ marginTop: '-0.2rem' }}>All Blog Posts</h1>
                <ul className={utilStyles.postList}>
                    {allPostsData.map((post) => (
                        <li className={utilStyles.postItem} key={post.id}>
                            <Link href={`/posts/${post.id}`}>
                                <p className={utilStyles.postLink}>{post.title}</p>
                            </Link>
                            <div className={utilStyles.lightText}>
                                {new Date(post.date).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                })}
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
            <br />
        </Layout>
    );
}

export async function getStaticProps() {
    const allPostIds = getAllPostIds();
    const allPostsData = await Promise.all(
        allPostIds.map(async ({ params }) => {
            const postData = await getPostData(params.id as string);
            return {
                id: params.id as string,
                title: postData.title,
                date: postData.date,
            };
        })
    );

    return {
        props: {
            allPostsData,
        },
    };
}


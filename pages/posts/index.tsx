import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import { getAllPostIds, getPostData } from '../../lib/posts';
import WordCount from '../../components/wordcount';
import { BsClockHistory } from 'react-icons/bs';
import { BsCalendar2Date } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

interface PostData {
    id: string;
    date: string;
    title: string;
    contentHtml: string;
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
            <section className={utilStyles.introSectionAllPosts}>
                <div className={utilStyles.headingAllPosts}>
                    <h1 style={{ marginTop: '-10px', marginBottom: '-1px' }} className={utilStyles.headingPostTitle}>All Blog Posts</h1>
                </div>
                <ul style={{ marginTop: '10px' }} className={utilStyles.postList}>
                    {allPostsData.map((post) => (
                        <li className={utilStyles.postItem} key={post.id}>
                            <Link style={{ textDecoration: 'none' }} href={`/posts/${post.id}`}>
                                <div className={utilStyles.SoftBorderAroundAllPost}>
                                    <h1 style={{ textDecoration: 'none' }} className={utilStyles.postLink}>{post.title}</h1>
                                    <div style={{ display: 'flex', alignItems: 'center' }} className={utilStyles.lightText}>
                                        <span style={{ marginRight: '4px', fontSize: '16px' }}><BsCalendar2Date /></span>
                                        <div >
                                            {new Date(post.date).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </div>
                                        <span style={{ marginLeft: '6px', marginRight: '6px', fontSize: '8px' }}><RxDotFilled /></span>
                                        <span style={{ marginRight: '4px', fontSize: '16px' }}><BsClockHistory /></span>
                                        <span>
                                            <WordCount input={post.contentHtml} /> min read
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
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
                contentHtml: postData.contentHtml,
            };
        })
    );

    return {
        props: {
            allPostsData,
        },
    };
}

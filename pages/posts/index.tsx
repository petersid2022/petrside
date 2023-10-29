import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import WordCount from '../../components/wordcount';
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
            <div className="bg-white rounded overflow-hidden shadow-2xl">
                <div className="px-6 py-4">
                    <div className="font-bold text-3xl mb-2">All Blog Posts</div>
                    <ul className="mt-5 mb-2 space-y-3">
                        {allPostsData.map((post) => (
                            <li
                                key={post.id}
                                className="border-2 border-gray-300 px-2 py-1 rounded hover:bg-gray-200 hover:border-gray-500"
                            >
                                <Link style={{ textDecoration: 'none' }} href={`/posts/${post.id}`}>
                                    <p className="text-xl font-medium text-slate-950">
                                        {post.title}
                                    </p>
                                    <div className="text-gray-500 text-base mt-2 flex items-center">
                                        <span>
                                            {new Date(post.date).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </span>
                                        <span className="mx-2 text-sm">
                                            <RxDotFilled />
                                        </span>
                                        <span>
                                            <WordCount input={post.contentHtml} /> minute read
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
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


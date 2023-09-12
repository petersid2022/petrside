import React, { useState } from 'react';
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
    const [searchQuery, setSearchQuery] = useState('');
    const filteredPosts = allPostsData.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Layout>
            <Head>
                <title>All Blog Posts</title>
            </Head>
            <section className={utilStyles.introSectionAllPosts}>
                <div className={utilStyles.headingWithSearch}>
                    <h1 className={utilStyles.headingPostTitle}>All Blog Posts</h1>
                    {/*
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={utilStyles.searchInput}
                    />
                    */}
                </div>
                <ul style={{marginTop:'10px'}} className={utilStyles.postList}>
                    {filteredPosts.map((post) => (
                        <li className={utilStyles.postItem} key={post.id}>
                            <Link href={`/posts/${post.id}`}>
                                <h1 className={utilStyles.postLink}>{post.title}</h1>
                            </Link>
                            <div className={utilStyles.lightText}>
                                {new Date(post.date).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </div>
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
            };
        })
    );

    return {
        props: {
            allPostsData,
        },
    };
}


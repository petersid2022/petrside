import Head from 'next/head';
import React from 'react';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import WordCount from '../components/wordcount';
import { getPostData } from '../lib/posts';
import { RxDotFilled } from 'react-icons/rx';

interface HomeProps {
    allPostsData: {
        id: string;
        date: string;
        title: string;
        contentHtml: string;
    }[];
}

export default function Home({ allPostsData }: HomeProps) {
    const latestPost = allPostsData[0];

    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div className="bg-white max-w-fit rounded overflow-hidden shadow-2xl mb-20 sm:mb-0">
                <div className="px-6 py-4">
                    <div className="font-bold text-3xl mb-2">About</div>
                    <p className="text-gray-700 text-2xl text-justify">
                        Welcome to my blog! I'm Peter Sideris (petrside), an Electrical Engineering student based in Greece. This is where I'm going to post anything I happen to find interesting or cool. Thanks for stopping by!
                    </p>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:pl-6 pb-3 px-6 text-center">
                    <Link className="hover:no-underline mb-2 md:mb-0" href="/about">
                        <h1 className="text-xl bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">About Me</h1>
                    </Link>
                    <Link className="md:ml-4 md:mr-2 hover:no-underline mb-2 md:mb-0" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                        <h1 className="text-xl bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">Resume</h1>
                    </Link>
                    <Link className="md:mx-2 hover:no-underline mb-2 md:mb-0" href="https://github.com/petersid2022" target="_blank" rel="noopener noreferrer">
                        <h1 className="text-xl bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">GitHub</h1>
                    </Link>
                    <Link className="md:ml-2 hover:no-underline mb-2 md:mb-0" href="https://www.linkedin.com/in/petros-sideris-a7bb50281" target="_blank" rel="noopener noreferrer">
                        <h1 className="text-xl bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">LinkedIn</h1>
                    </Link>
                </div>
                <div className="px-6 flex items-center justify-between">
                    <div className="font-bold text-3xl mb-2">Latest Blog Post</div>
                    <Link className="hover:no-underline" href="/posts">
                        <h1 className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-0.5 px-2 border border-gray-400 rounded shadow">Show All</h1>
                    </Link>
                </div>
                <ul className="px-6 pb-4 list-none">
                    <li className="mb-0" key={latestPost.id}>
                        <Link href={`/posts/${latestPost.id}`}>
                            <h1 className="text-xl hover:underline inline-block">{latestPost.title}</h1>
                        </Link>
                        <div className="flex items-center no-underline">
                            <Date dateString={latestPost.date} />
                            <span className="ml-1 mr-1 text-xs"><RxDotFilled /></span>
                            <span>
                                <WordCount input={latestPost.contentHtml} /> min read
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
            <footer className="font-semibold text-gray-800 fixed bottom-0 left-0 w-full text-center text-base leading-snug -z-10 pb-2"> 
                <p>&copy; Peter Sideris. All Rights and Lefts reserved.</p>
                <Link className="inline-block" href={"https://github.com/petersid2022/petrside"} target="_blank" rel="noopener noreferrer">
                    <p>Made with &#x2764;&#xFE0F; using Next.js</p>
                </Link>
            </footer>
        </Layout>
    );
}

export async function getStaticProps() {
    const sortedPosts = getSortedPostsData();
    const allPostsData = await Promise.all(
        sortedPosts.map(async (post) => {
            const postData = await getPostData(post.id);
            return {
                ...post,
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

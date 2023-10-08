import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import WordCount from '../components/wordcount';
import { useDarkMode } from '../components/DarkModeProvider';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { BsFillSunFill } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import React, { useEffect } from 'react';

interface HomeProps {
    allPostsData: {
        id: string;
        date: string;
        title: string;
    }[];
}

export default function Home({ allPostsData }: HomeProps) {
    const latestPost = allPostsData[0];
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark-mode');
            document.body.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.introSection}>
                <div className={utilStyles.latestPostContainer}>
                    <h2 className={utilStyles.headingAbout}>About</h2>
                    <button style={{ fontSize: '25px', marginTop: '-30px' }} onClick={toggleDarkMode}>
                        {isDarkMode ? <BsFillMoonStarsFill /> : <BsFillSunFill />}
                    </button>
                </div>
                <p style={{ marginTop: '-1px' }} className={utilStyles.introText}>
                    Welcome to my blog! I'm Peter Sideris (petrside), an Electrical Engineering student based in Greece. This is where I'm going to post anything I happen to find interesting or cool. Thanks for stopping by!
                </p>
                <div style={{ height: '5px', visibility: 'hidden' }}></div>
                <div style={{ height: '10px', visibility: 'hidden' }}></div>
                <div className={utilStyles.showlinksBorderContainer}>
                    <Link href="/about">
                        <span className={utilStyles.showlinksBorder}>About Me</span>
                    </Link>
                    <div style={{ width: '15px', visibility: 'hidden' }}></div>
                    <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                        <span className={utilStyles.showlinksBorder}>Resume</span>
                    </Link>
                    <div style={{ width: '15px', visibility: 'hidden' }}></div>
                    <Link href="https://github.com/petersid2022" target="_blank" rel="noopener noreferrer">
                        <span className={utilStyles.showlinksBorder}>GitHub</span>
                    </Link>
                    <div style={{ width: '15px', visibility: 'hidden' }}></div>
                    <Link href="https://www.linkedin.com/in/petros-sideris-a7bb50281" target="_blank" rel="noopener noreferrer">
                        <span className={utilStyles.showlinksBorder}>LinkedIn</span>
                    </Link>
                </div>
                <div style={{ height: '10px', visibility: 'hidden' }}></div>
                <div style={{ height: '10px', visibility: 'hidden' }}></div>
                {/*
                <hr />
                */}
                <hr style={{ borderColor: '#ccc', borderWidth: '2px', borderStyle: 'dashed' }} />
                <div style={{ height: '17px', visibility: 'hidden' }}></div>
                <div style={{ marginTop: '-4.2px' }} className={utilStyles.latestPostContainer}>
                    <h2 style={{ marginTop: '-4px' }} className={utilStyles.headingLg}>Latest Blog Post</h2>
                    <Link href="/posts">
                        <span className={utilStyles.showAllLink}>Show All</span>
                    </Link>
                </div>
                <div style={{ height: '12.8px', visibility: 'hidden' }}></div>
                <ul className={utilStyles.postList}>
                    <li className={utilStyles.postItem} key={latestPost.id}>
                        <Link style={{ textDecoration: 'none' }} href={`/posts/${latestPost.id}`}>
                            <div className={utilStyles.SoftBorderAroundLatestPost}>
                                <h1 style={{ textDecoration: 'none' }} className={utilStyles.postLink}>{latestPost.title}</h1>
                                <div style={{display:'flex', alignItems:'center'}} className={utilStyles.lightText}>
                                    <Date dateString={latestPost.date} />
                                    <span style={{ marginLeft: '6px', marginRight: '6px', fontSize: '8px' }}><RxDotFilled /></span>
                                    <span>
                                        <WordCount input={latestPost.id} /> min read
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </li>
                </ul>
                <div style={{ height: '7px', visibility: 'hidden' }}></div>
            </section>
            <footer className={utilStyles.footer}>
                {isDarkMode ?
                    <div>
                        <p style={{ color: '#000' }}>© Peter Sideris. All rights and lefts reserved.</p>
                        <Link style={{ display: 'inline-block', color: '#000' }} href={"https://github.com/petersid2022/petrside"} target="_blank" rel="noopener noreferrer">
                            <p>Made with ❤️ using Next.js</p>
                        </Link>
                    </div>
                    :
                    <div>
                        <p style={{ color: '#f0f0f0' }}>© Peter Sideris. All rights and lefts reserved.</p>
                        <Link style={{ display: 'inline-block', color: '#f0f0f0' }} href={"https://github.com/petersid2022/petrside"} target="_blank" rel="noopener noreferrer">
                            <p>Made with ❤️ using Next.js</p>
                        </Link>
                    </div>
                }
            </footer>
        </Layout>
    );
}

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
}



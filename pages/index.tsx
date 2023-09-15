import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';

interface HomeProps {
    allPostsData: {
        id: string;
        date: string;
        title: string;
    }[];
}

export default function Home({ allPostsData }: HomeProps) {
    const latestPost = allPostsData[0];
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.introSection}>
                <h2 className={utilStyles.headingAbout}>About Me</h2>
                <div style={{ height: '7.8px', visibility: 'hidden' }}></div>
                <div className={utilStyles.SoftBorderAroundAbout}>
                    <p className={utilStyles.introText}>
                        Welcome to my blog! I'm Peter Sideris, an Electrical Engineering student based in Greece. This is where I'm going to post anything I happen to find cool. Thanks for stopping by!
                    </p>
                </div>
                {/*
                <div style={{marginRight:'15px'}} className={utilStyles.showlinksBorder}>
                    <a href="https://github.com/petersid2022" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
                <div style={{marginRight:'15px'}} className={utilStyles.showlinksBorder}>
                    <a href="https://www.linkedin.com/in/petros-sideris-a7bb50281" target="_blank" rel="noopener noreferrer" >LinkedIn</a>
                </div>
                <div className={utilStyles.showlinksBorder}>
                    <a href="https://drive.google.com/file/d/1wLu2UU0h6ivmWHjhv0evWRhyXU9gkHiK/view?usp=sharing" target="_blank" rel="noopener noreferrer">Resume</a>
                </div>
                */}
                <div style={{ height: '10px', visibility: 'hidden' }}></div>
                <div style={{ height: '10px', visibility: 'hidden' }}></div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link href="https://github.com/petersid2022" target="_blank" rel="noopener noreferrer">
                        <span className={utilStyles.showlinksBorder}>GitHub</span>
                    </Link>
                    <div style={{ width: '15px', visibility: 'hidden' }}></div>
                    <Link href="https://www.linkedin.com/in/petros-sideris-a7bb50281" target="_blank" rel="noopener noreferrer">
                        <span className={utilStyles.showlinksBorder}>LinkedIn</span>
                    </Link>
                    <div style={{ width: '15px', visibility: 'hidden' }}></div>
                    <Link href="https://drive.google.com/file/d/1wLu2UU0h6ivmWHjhv0evWRhyXU9gkHiK/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                        <span className={utilStyles.showlinksBorder}>Resume</span>
                    </Link>
                </div>
                <div style={{ height: '10px', visibility: 'hidden' }}></div>
                <div style={{ height: '10px', visibility: 'hidden' }}></div>
                <hr />
                <div style={{ height: '10px', visibility: 'hidden' }}></div>
                {/*<div style={{marginTop:'-2.2px'}} className={utilStyles.latestPostContainer}>*/}
                <div style={{marginTop:'-4.2px'}} className={utilStyles.latestPostContainer}>
                    <h2 style={{marginTop:'-4px'}} className={utilStyles.headingLg}>Latest Blog Post</h2>
                    <Link href="/posts">
                        <span className={utilStyles.showAllLink}>Show All</span>
                        {/*<span style={{marginTop:'10px'}} className={utilStyles.showAllLink}>Show All</span>*/}
                    </Link>
                </div>
                {/*<div style={{ height: '7.8px', visibility: 'hidden' }}></div>*/}
                <div style={{ height: '7.8px', visibility: 'hidden' }}></div>
                <ul className={utilStyles.postList}>
                    <li className={utilStyles.postItem} key={latestPost.id}>
                    <Link style={{textDecoration:'none'}} href={`/posts/${latestPost.id}`}>
                        <div className={utilStyles.SoftBorderAroundLatestPost}>
                            <h1 style={{textDecoration:'none'}} className={utilStyles.postLink}>{latestPost.title}</h1>
                            <div className={utilStyles.lightText}>
                                <Date dateString={latestPost.date} />
                            </div>
                        </div>
                    </Link>
                    </li>
                </ul>
                <div style={{ height: '10px', visibility: 'hidden' }}></div>
                <footer className={utilStyles.footer}>
                    <p>© Peter Sideris. All rights and lefts reserved.</p>
                    <Link style={{ display:'inline-block', color: '#666'}} href={"https://github.com/petersid2022/petrside"} target="_blank" rel="noopener noreferrer">
                        <p>Made with ❤️ using Next.js</p>
                    </Link>
                </footer>
            </section>
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


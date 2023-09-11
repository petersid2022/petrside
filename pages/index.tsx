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
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.introSection}>
                <p className={utilStyles.introText}>
                    Hi there! I'm a passionate electrical engineering student from Greece, here to document anything I find interesting.
                </p>
                <div className={utilStyles.socialLinks}>
                    <a href="https://github.com/petersid2022" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="https://www.linkedin.com/in/petros-sideris-a7bb50281" target="_blank" rel="noopener noreferrer" className={utilStyles.link}>LinkedIn</a>
                    <a href="https://drive.google.com/file/d/1zJyUxkw-olI919BbqOcqpjHIPcXhrA5u/view?usp=sharing" target="_blank" rel="noopener noreferrer">Resume</a>
                </div>
            </section>
            <section className={utilStyles.blogSection}>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.postList}>
                    {allPostsData.map(({ id, date, title }) => (
                        <li className={utilStyles.postItem} key={id}>
                            <Link href={`/posts/${id}`}>
                                <h1 className={utilStyles.postLink}>{title}</h1>
                            </Link>
                            <small className={utilStyles.postDate}>
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))}
                </ul>
            </section>
            <footer className={utilStyles.footer}>
                <p>© Peter Sideris. All rights and lefts reserved.</p>
                <p>Made with ❤️ using next.js</p>
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


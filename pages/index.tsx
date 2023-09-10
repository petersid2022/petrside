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
            <section className={utilStyles.headingMd}>
                <p>Engineering student from Greece, here to document anything I happen to find interesting. 
                <a href="https://github.com/petersid2022" target="_blank" rel="noopener noreferrer" className={utilStyles.link}>GitHub</a>
                <a href="https://www.linkedin.com/in/petros-sideris-a7bb50281" target="_blank" rel="noopener noreferrer" className={utilStyles.link}>LinkedIn</a>
                <a href="https://drive.google.com/file/d/1zJyUxkw-olI919BbqOcqpjHIPcXhrA5u/view?usp=sharing" target="_blank" rel="noopener noreferrer" className={utilStyles.link}>Resume</a>
                </p>
            </section>
            <section className={`${utilStyles.headingMd} `}>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {allPostsData.map(({ id, date, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/posts/${id}`}>{title}</Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))}
                </ul>
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


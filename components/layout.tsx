import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import { useRouter } from 'next/router'
import { TiArrowBack } from 'react-icons/ti';

const name = 'Peter Sideris';
export const siteTitle = 'petrside';

export default function Layout({
    children,
    home,
}: {
    children: React.ReactNode;
    home?: boolean;
}) {
    const router = useRouter();

    const goBack = () => {
        router.back();
    };

    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <meta name="description" content="petrside" />
                <meta name="og:title" content={siteTitle} />
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <div style={{ marginTop: '-25px' }}></div>
                        <Link href={"https://youtu.be/2yfXgu37iyI?t=197"} target="_blank" rel="noopener noreferrer">
                            <Image
                                priority
                                src="/images/profile.jpg"
                                className={utilStyles.borderCircle}
                                height={300}
                                width={300}
                                quality={100}
                                alt={name}
                            />
                        </Link>
                        <h1 className={utilStyles.NameCss}>{name}</h1>
                    </>
                ) : (
                    <>
                    </>
                )}
            </header>
            {!home && (
                <div style={{ marginRight: '50px', marginLeft: '10px', marginBottom: '10px' }}>
                    <div className={utilStyles.headingDd}>
                        <button onClick={goBack} style={{ textDecoration: 'none' }}>
                            <span className={utilStyles.iconText}>
                                <TiArrowBack className={utilStyles.icon} />
                                Go Back
                            </span>
                        </button>
                    </div>
                </div>
            )}
            <main>{children}</main>
        </div>
    );
}

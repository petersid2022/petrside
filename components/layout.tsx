import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
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
    const goBack = () => {
        window.history.back();
    };

    return (
        <div className={styles.container}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <meta name="description" content="petrside" />
                <meta name="og:title" content={siteTitle} />
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <div style={{ marginTop: '-25px' }}></div>
                        <Image
                            priority={true}
                            src="/images/profile.jpg"
                            className={utilStyles.borderCircle}
                            height={200}
                            width={200}
                            quality={100}
                            alt="Alekos Fassianos"
                        />
                        <h1 className={utilStyles.NameCss}>Petros Sideris</h1>
                    </>
                ) : (
                    <>
                    </>
                )}
            </header>
            {!home && (
                <div style={{ marginRight: '50px', marginBottom: '10px' }}>
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

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
//import { FaAnglesLeft} from 'react-icons/fa6';
import { TiArrowBack } from 'react-icons/ti';
import { useRouter } from 'next/router'

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
            {/*
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="petrside"
                />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        */}
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <div style={{ marginTop: '-25px' }}></div>
                        <Image
                            priority
                            src="/images/profile.jpg"
                            className={utilStyles.borderCircle}
                            height={300}
                            width={300}
                            quality={100}
                            alt={name}
                        />
                        <Link style={{ display: 'inline-block'}} href={"https://youtu.be/2yfXgu37iyI?feature=shared"} target="_blank" rel="noopener noreferrer">
                            <p className={utilStyles.quote}>"...the whole point of a Doomsday machine is lost if you keep it a secret..." -Dr. Strangelove</p>
                        </Link>
                        <h1 className={utilStyles.TEST}>{name}</h1>
                    </>
                ) : (
                    <>
                        {/*
            <Link href="/">
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt={name}
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h2>
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt={name}
              />
            <h2 className={utilStyles.headingLg}>
                {name}
            </h2>
            */}
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

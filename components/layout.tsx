import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import { FaBackwardFast } from 'react-icons/fa6';
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
        router.push('/');
    };

  return (
    <div className={styles.container}>
      <Head>
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
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
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
      <main>{children}</main>
      {!home && (
        <div className={utilStyles.headingDd}>
          <button onClick={goBack} style={{ display: 'inline', textDecoration: 'none' }}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <FaBackwardFast style={{ marginTop: '2px', marginRight: '10px' }} />
            Home 
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import { TiArrowBack } from 'react-icons/ti';
import { useRouter } from 'next/router'

const name = 'Peter Sideris';
export const siteTitle = 'Peter Sideris';
const image = '/images/profile.jpg';

export default function Layout({
    children,
    home,
}: {
    children: React.ReactNode;
    home?: boolean;
}) {
    const router = useRouter()

    const goBack = () => {
        router.back()
    };

    return (
        <div className={styles.container}>
            <Head>
                <meta name="robots" content="follow, index" />
                <meta name="description" content={name} />
                <meta property="og:site_name" content={name} />
                <meta property="og:description" content={name} />
                <meta property="og:title" content={name} />
                <meta property="og:image" content={image} />
                <meta name="description" content={siteTitle} />
                <meta name="og:title" content={siteTitle} />
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <Image
                            priority={true}
                            src="/images/profile.jpg"
                            className={utilStyles.borderCircle}
                            height={200}
                            width={200}
                            quality={100}
                            alt={name}
                        />
                        <div className="flex items-center py-5">
                            <h1 className="text-5xl tracking-tight font-extrabold text-gray-900 items-center">{name}</h1>
                        </div>
                    </>
                ) : (
                    <>
                    </>
                )}
            </header>
            {!home && (
                <div className="mb-2">
                    <div className={utilStyles.headingDd}>
                        <button onClick={goBack} className="hover:no-underline">
                            <div className="bg-transparent hover:bg-[#fbf8fd] text-gray-800 font-semibold py-0 px-0 border border-transparent hover:border-gray-300 rounded hover:shadow">
                                <span className={utilStyles.iconTextLight} >
                                    <TiArrowBack className="mt-0.5 mr-0.5" />
                                    Go Back
                                </span>
                            </div>
                        </button>
                    </div>
                </div>
            )}
            <main>{children}</main>
        </div>
    );
}

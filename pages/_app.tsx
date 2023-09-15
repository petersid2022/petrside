import '../styles/global.css';
import { AppProps } from 'next/app';
import BackgroundSVG from '../components/BackgroundSVG';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <BackgroundSVG />
            <Component {...pageProps} />;
        </>
    );
}

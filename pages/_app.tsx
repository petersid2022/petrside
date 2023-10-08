import '../styles/global.css';
import { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { DarkModeProvider } from '../components/DarkModeProvider';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <DarkModeProvider>
                <Component {...pageProps} />
                <Analytics />
            </DarkModeProvider>
        </>
    );
}

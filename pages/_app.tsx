import '../styles/global.css';
import 'tailwindcss/tailwind.css'; // Import the compiled Tailwind CSS file
import { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
            <Analytics />
        </>
    );
}

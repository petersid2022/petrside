import React from 'react';
import utilStyles from '../styles/utils.module.css';

const BackgroundSVG: React.FC = () => {
    return (
        <div className={utilStyles.SVG} style={{ position: 'fixed', zIndex: -1, top: 0, left: 0 }}>
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="100%"
                height="155%"  // Adjust the height here to make it taller
                viewBox="0 0 1600 1350" // Adjust the viewBox for the new height
                preserveAspectRatio="xMidYMax slice"
                style={{ position: 'absolute', top: 0, left: 0 }}
            >
                <defs>
                    <linearGradient id="bg">
                    {/*
                        <stop offset="0%" style={{ stopColor: 'rgba(130, 158, 249, 0.06)' }} />
                        <stop offset="50%" style={{ stopColor: 'rgba(76, 190, 255, 0.6)' }} />
                        <stop offset="100%" style={{ stopColor: 'rgba(115, 209, 72, 0.2)' }} />
                    */}
                        <stop offset="0%" style={{ stopColor: '#233757' }} />
                        <stop offset="50%" style={{ stopColor: '#2a4b7b' }} />
                        <stop offset="100%" style={{ stopColor: '#35465e' }} />
                    </linearGradient>
                    <path
                        id="wave"
                        fill="url(#bg)"
                        d="M-363.852,402.589c0,0,236.988-61.997,505.475,0 s371.981,58.998,575.971,0s293.985-59.278,505.474,8.859s493.475,68.368,716.963-6.995v760.106H-363.852V402.589z"
                    />
                </defs>
                <g>
                    <use xlinkHref="#wave" opacity=".3">
                        <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="translate"
                            dur="6s"
                            calcMode="spline"
                            values="270 230; -334 180; 270 230"
                            keyTimes="0; .5; 1"
                            keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                            repeatCount="indefinite"
                        />
                    </use>
                    <use xlinkHref="#wave" opacity=".6">
                        <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="translate"
                            dur="8s"
                            calcMode="spline"
                            values="-270 230;243 220;-270 230"
                            keyTimes="0; .6; 1"
                            keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                            repeatCount="indefinite"
                        />
                    </use>
                    <use xlinkHref="#wave" opacity=".9">
                        <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="translate"
                            dur="4s"
                            calcMode="spline"
                            values="0 230;-140 200;0 230"
                            keyTimes="0; .4; 1"
                            keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                            repeatCount="indefinite"
                        />
                    </use>
                </g>
            </svg>
        </div>
    );
};

export default BackgroundSVG;


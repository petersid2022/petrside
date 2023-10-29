import React from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import ProjectCard from '../../components/ProjectCard';

export default function PostsPage() {

    const notableProjects = [
        {
            title: 'greek_stemmer',
            description: 'Stemmer library written in Go, enabling various NLP tasks using the Greek language',
            url: 'https://github.com/petersid2022/greek_stemmer',
        },
        {
            title: 'Chip-8 Emulator',
            description: 'An emulator for the Chip8 virtual machine written in Go',
            url: 'https://github.com/petersid2022/chip8',
        },
        {
            title: 'RackJS',
            description: 'Webapp for managing kitchen inventory, built using the MERN stack',
            url: 'https://github.com/petersid2022/rackjs',
        },
        {
            title: 'petrside.gr',
            description: 'This very website, that serves as my personal portfolio/blog, built using Next.js',
            url: 'https://github.com/petersid2022/petrside',
        },
        {
            title: 'skroutz-prosfores-scraper-go',
            description: 'CLI based scraper written in Go, that scrapes for any deals on skroutz',
            url: 'https://github.com/petersid2022/skroutz-prosfores-scraper-go',
        },
        {
            title: 'riscv-emulator',
            description: 'RISC-V (RV32I) emulator written in Rust, currently supporting only RV32I instructions',
            url: 'https://github.com/petersid2022/skroutz-prosfores-scraper-go',
        },
    ];
    return (
        <Layout>
            <Head>
                <title>About me</title>
            </Head>
            <div className="bg-white max-w-fit rounded overflow-hidden shadow-2xl">
                <div className="px-6 pt-4 pb-5">
                    <div className="font-bold text-3xl mb-2">Three things to know about me:</div>
                    <ul className="text-gray-700 text-xl text-justify mb-2 list-decimal list-inside">
                        <li className="mb-2">I am extremely thrilled to be working in the field of
                        engineering, particularly with new and cutting-edge technologies in both hardware and software
                        domains.</li>
                        <li className="mb-2">I have a strong passion for open-source initiatives and firmly believe in the power of collaborative
                        development. I'm also deeply fascinated by the vast possibilities presented by
                        embedded systems and low-level programming.</li>
                        <li className="mb-2">My particular interest right now lies in exploring the potential of utilising Rust on embedded single board computers
                        (SBCs), like the Raspberry Pi.</li>
                        Overall, I'm really excited to explore hardware and firmware development, using my skills to build solid and efficient solutions.
                    </ul>
                    <div className="font-bold text-3xl mb-4">Cool projects I've worked on include:</div>
                    <div className="w-full flex flex-wrap gap-2 gap-y-3 justify-around">
                        {notableProjects.map((project, index) => (
                            <ProjectCard
                                key={index}
                                title={project.title}
                                description={project.description}
                                url={project.url}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

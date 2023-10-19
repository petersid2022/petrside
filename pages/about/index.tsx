import React from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import ProjectCard from '../../components/ProjectCard'; // Adjust the import path as needed

export default function PostsPage() {

    const notableProjects = [
        {
            title: 'greek_stemmer',
            description: 'Greek Stemmer Library written in Go',
            url: 'https://github.com/petersid2022/greek_stemmer',
        },
        {
            title: 'Chip-8 Emulator',
            description: 'An emulator for the Chip8 virtual machine written in Go',
            url: 'https://github.com/petersid2022/chip8',
        },
        {
            title: 'RackJS',
            description: 'Webapp for managing kitchen inventory, written in React',
            url: 'https://github.com/petersid2022/rackjs',
        },
        {
            title: 'petrside.gr',
            description: 'My personal website, built using Next.js',
            url: 'https://github.com/petersid2022/petrside',
        },
        {
            title: 'riscv-emulator',
            description: 'RV32I emulator in Rust',
            url: 'https://github.com/petersid2022/skroutz-prosfores-scraper-go',
        },
        {
            title: 'skroutz-prosfores-scraper-go',
            description: 'Web scraper written in Go, that scrapes any new deals on skroutz.gr',
            url: 'https://github.com/petersid2022/skroutz-prosfores-scraper-go',
        },
    ];
    return (
        <Layout>
            <Head>
                <title>About me</title>
            </Head>
            <section className={utilStyles.introSectionAbout}>
                <div className={utilStyles.headingAllPosts}>
                    <h1 style={{ marginTop: '-10px' }} className={utilStyles.headingPostTitle}>About Me</h1>
                </div>
                <h1 style={{ textAlign: 'justify', lineHeight:'1.65rem'}} className={utilStyles.content}>
                    My name is Peter Sideris and I'm an Electrical Engineering student from Greece.
                    I am extremely thrilled to be working in the field of
                    engineering, particularly with new and cutting-edge technologies in both hardware and software
                    domains.
                    <br />
                    I have a strong passion for open-source initiatives and firmly believe in the power of collaborative
                    development. I'm also deeply fascinated by the vast possibilities presented by
                    embedded systems and low-level programming.
                    <br />
                    My particular enthusiasm right now lies in exploring the potential of utilising Rust on embedded single board computers
                    (SBCs), like the Raspberry Pi. I'm eager to dive into the world of hardware and firmware development, leveraging my
                    skills to create efficient and reliable solutions.
                </h1>
                <hr style={{ marginTop: '6px', borderColor: '#ccc', borderWidth: '2px', borderStyle: 'dashed' }} />
                <h1 style={{margin:'10px 0px'}} className={utilStyles.headingProjects}>Notable Projects</h1>
                <div className={utilStyles.projectsContainer}>
                    {notableProjects.map((project, index) => (
                        <ProjectCard key={index} title={project.title} description={project.description} url={project.url} />
                    ))}
                </div>
            </section>
        </Layout>
    );
}

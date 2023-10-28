import React from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
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
            <section className={utilStyles.introSectionAbout}>
                <h1 style={{ marginBottom: '1rem' }} className={utilStyles.headingPostTitleId}>About Me</h1>
                <h1 style={{ textAlign: 'justify', lineHeight: '1.65rem' }} className={utilStyles.content}>
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
                <hr style={{ margin: '1rem 0rem', borderColor: '#ccc', borderWidth: '2px', borderStyle: 'dashed' }} />
                <h1 style={{ margin: '10px 0px 18px' }} className={utilStyles.headingProjects}>Cool projects I've worked on include:</h1>
                {/*
                <div className={utilStyles.projectsContainer}>
                    {notableProjects.map((project, index) => (
                        <ProjectCard key={index} title={project.title} description={project.description} url={project.url} />
                    ))}
                </div>
                */}
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
            </section>
        </Layout>
    );
}

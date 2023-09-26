// ProjectCard.tsx
import React from 'react';
import Link from 'next/link';
import utilStyles from '../styles/utils.module.css';

interface ProjectCardProps {
    title: string;
    description: string;
    url: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, url }) => {
    return (
        <div className={utilStyles.ProjectsBox}>
            <Link style={{ textDecoration: 'none', color: '#333' }} href={url} target="_blank" rel="noopener noreferrer">
                <div className={utilStyles.projectCard}>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
            </Link>
        </div>
    );
};

export default ProjectCard;

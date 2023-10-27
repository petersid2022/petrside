import React from 'react';
import Link from 'next/link';

interface ProjectCardProps {
    title: string;
    description: string;
    url: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, url }) => {
    return (
        <div className="bg-gradient-to-br from-white via-white to-dde6d5 px-4 py-2 rounded-lg border border-gray-300 shadow-md transition-transform transform hover:scale-105 hover:opacity-90 w-64">
            <Link style={{ textDecoration: 'none', color: '#333' }} href={url} target="_blank" rel="noopener noreferrer">
                <div >
                    <h1 className="text-xl font-semibold">{title}</h1>
                    <p className="mt-2 text-gray-600 overflow-hidden w-full">
                        {description}
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default ProjectCard;


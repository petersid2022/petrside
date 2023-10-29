import React from 'react';
import Link from 'next/link';
import { BiLinkExternal } from 'react-icons/bi';

interface ProjectCardProps {
    title: string;
    description: string;
    url: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, url }) => {
    return (
        <Link className="group bg-gradient-to-br from-white via-white to-dde6d5 px-4 py-2 rounded-lg border border-gray-300 shadow-md w-64 hover:no-underline" href={url} target="_blank" rel="noopener noreferrer">
            <div className="flex justify-between items-start">
                <h1 className="text-xl font-semibold flex-1 break-words">{title}</h1>
                <BiLinkExternal className="hidden group-hover:block mt-1.5 -mr-0.5 text-lg" />
            </div>
            <p className="mt-2 text-gray-600 overflow-hidden w-full">
                {description}
            </p>
        </Link>
    );
};

export default ProjectCard;


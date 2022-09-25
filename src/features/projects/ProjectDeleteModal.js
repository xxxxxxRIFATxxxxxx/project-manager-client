import React from 'react';
import { useDeleteProjectMutation } from './projectsApi';
import ProjectsError from './ProjectsError';

const ProjectDeleteModal = ({ setShowModal, project }) => {
    const { id } = project;

    const [ deleteProject, { isLoading, error } ] = useDeleteProjectMutation();

    const handleUpdateTeam = async () => { 
        await deleteProject(id);
        setShowModal(false);
    };

    return (
        <div 
            className="py-12 bg-gray-700 bg-opacity-40 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" 
            id="modal"
        >
            <div 
                role="alert" 
                className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
            >
                <div 
                    className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400"
                    
                >
                    <h1 className="text-red-700 font-lg font-bold tracking-normal leading-tight mb-4">
                        Are you sure you want to delete the project?
                    </h1>
                    
                    <div className="pb-3">
                        { error && <ProjectsError error={error} title="Error" /> }
                    </div>
                    
                    <div className="flex items-center justify-start w-full">
                        <button 
                            className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700 transition duration-150 ease-in-out hover:bg-red-600 bg-red-700 ${isLoading && "bg-red-300 hover:bg-red-300"} rounded text-white px-8 py-2 text-sm`}
                            disabled={isLoading}
                            onClick={handleUpdateTeam}
                        >
                            {isLoading ? "Deleting..." : "Delete"} 
                        </button>

                        <button 
                            className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" 
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </button>
                    </div>

                    <button 
                        className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" 
                        onClick={() => setShowModal(false)}
                        aria-label="close modal" 
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg"  
                            className="icon icon-tabler icon-tabler-x" 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            strokeWidth="2.5" 
                            stroke="currentColor" 
                            fill="none" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <path 
                                stroke="none" 
                                d="M0 0h24v24H0z" 
                            />

                            <line 
                                x1="18" 
                                y1="6" 
                                x2="6" 
                                y2="18" 
                            />

                            <line 
                                x1="6" 
                                y1="6" 
                                x2="18" 
                                y2="18" 
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectDeleteModal;
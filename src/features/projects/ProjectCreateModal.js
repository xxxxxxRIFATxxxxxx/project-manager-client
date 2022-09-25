import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useCreateProjectMutation } from './projectsApi';
import ProjectsError from './ProjectsError';
import ProjectSuccess from './ProjectSuccess';

const ProjectCreateModal = ({ setShowModal }) => {
    const [ name, setName ] = useState("");
    const [ title, setTitle ] = useState("");

    const auth = useSelector((state) => state.auth);

    const [ createProject, { isLoading, isSuccess, error } ] = useCreateProjectMutation();

    const handleCreateProject = async (e) => {
        e.preventDefault();

        await createProject(
            {
                name: name,
                title: title,
                color: "orange",
                status: "backlog",
                creator: {
                    email: auth.user.email,
                    name: auth.user.name,
                    img: auth.user.img
                },
                timestamp: Date.now(),
            },
        );

        setName("");  
        setTitle("");    
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
                <form 
                    className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400"
                    onSubmit={handleCreateProject}
                >
                    <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Create Project</h1>

                    <label 
                        htmlFor="name" 
                        className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                    >
                        Name
                    </label>

                    <input 
                        id="name" 
                        className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" 
                        placeholder="Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label 
                        htmlFor="title" 
                        className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                    >
                        Title
                    </label>

                    <input 
                        id="title" 
                        className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" 
                        placeholder="Title" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    
                    <div className="pb-3">
                        { error && <ProjectsError error={error} title="Error" /> }
                        { isSuccess && <ProjectSuccess message="Project Created Successfully" /> }
                    </div>
                    
                    <div className="flex items-center justify-start w-full">
                        <button 
                            className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 ${isLoading && "bg-indigo-300 hover:bg-indigo-300"} rounded text-white px-8 py-2 text-sm`}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Submit..." : "Submit"} 
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
                </form>
            </div>
        </div>
    );
};

export default ProjectCreateModal;
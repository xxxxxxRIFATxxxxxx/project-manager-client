import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { Link, redirect } from 'react-router-dom';
import { userLoggedOut } from '../auth/authSlice';
import logo from "./assets/logo.png";
import Project from './Project';
import ProjectCreateModal from './ProjectCreateModal';
import { useGetProjectsQuery, useUpdateProjectMutation } from './projectsApi';
import ProjectsError from './ProjectsError';
import ProjectsLoadingScreen from './ProjectsLoadingScreen';

const Projects = () => {
    const { data: projects, isLoading, error } = useGetProjectsQuery();
    const [ updateProject ] = useUpdateProjectMutation();

    const [ backlogProjects, setBacklogProjects ] = useState([]);
    const [ readyProjects, setReadyProjects ] = useState([]);
    const [ doingProjects, setDoingProjects ] = useState([]);
    const [ reviewProjects, setReviewProjects ] = useState([]);
    const [ blockedProjects, setBlockedProjects ] = useState([]);
    const [ doneProjects, setDoneProjects ] = useState([]);

    const [ showModal, setShowModal ] = useState(false);

    // Search
    const debounceHandler = (fn, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                fn(...args);
            }, delay);
        };
    };

    const doSearch = (value) => {
        
    };

    const handleSearch = debounceHandler(doSearch, 500);

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(userLoggedOut()); 
        localStorage.clear();
        redirect("/");
    };

    // Drop
    const [{}, dropBacklog] = useDrop(() => ({
        accept: 'PROJECT',

        drop: (project) => {
            setBacklogProjects((prevState) => {
                return [project, ...prevState];
            });

            updateProject({
                id: project.id,
                data: {
                    status: "backlog"
                }
            });
        },

        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop()
        })
    }));

    const [{}, dropReady] = useDrop(() => ({
        accept: 'PROJECT',

        drop: (project) => {
            setReadyProjects((prevState) => {
                return [project, ...prevState];
            });

            updateProject({
                id: project.id,
                data: {
                    status: "ready"
                }
            });
        },

        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop()
        })
    }));

    const [{}, dropDoing] = useDrop(() => ({
        accept: 'PROJECT',

        drop: (project) => {
            setDoingProjects((prevState) => {
                return [project, ...prevState];
            });

            updateProject({
                id: project.id,
                data: {
                    status: "doing"
                }
            });
        },

        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop()
        })
    }));

    const [{}, dropReview] = useDrop(() => ({
        accept: 'PROJECT',

        drop: (project) => {
            setReviewProjects((prevState) => {
                return [project, ...prevState];
            });

            updateProject({
                id: project.id,
                data: {
                    status: "review"
                }
            });
        },

        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop()
        })
    }));

    const [{}, dropBlocked] = useDrop(() => ({
        accept: 'PROJECT',

        drop: (project) => {
            setBlockedProjects((prevState) => {
                return [project, ...prevState];
            });

            updateProject({
                id: project.id,
                data: {
                    status: "blocked"
                }
            });
        },

        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop()
        })
    }));

    const [{}, dropDone] = useDrop(() => ({
        accept: 'PROJECT',

        drop: (project) => {
            setDoneProjects((prevState) => {
                return [project, ...prevState];
            });

            updateProject({
                id: project.id,
                data: {
                    status: "done"
                }
            });
        },

        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop()
        })
    }));

    useEffect(() => {
        setBacklogProjects(projects?.filter(project => project.status === "backlog"));
        setReadyProjects(projects?.filter(project => project.status === "ready"));
        setDoingProjects(projects?.filter(project => project.status === "doing"));
        setReviewProjects(projects?.filter(project => project.status === "review"));
        setBlockedProjects(projects?.filter(project => project.status === "blocked"));
        setDoneProjects(projects?.filter(project => project.status === "done"));
    }, [projects]);

    return (
        <>
            { showModal && <ProjectCreateModal setShowModal={setShowModal} /> }

            <div
                className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200"
            >
                <div
                    className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75"
                >
                    <img 
                        src={logo} 
                        className="h-10 w-10" 
                        alt="" 
                    />
                    
                    <input
                        className="flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring"
                        type="search"
                        placeholder="Search for projects…"
                        onChange={(e) => handleSearch(e.target.value)}
                    />

                    <div className="ml-10">
                        <Link
                            className="mx-2 text-sm font-semibold text-indigo-700"
                            to="/projects"
                        >
                            Projects
                        </Link>

                        <Link 
                            className="mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700"
                            to="/teams"
                        >
                            Teams
                        </Link>

                        <button
                            className="mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>

                    <button
                        className="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer"
                    >
                        <img
                            src="https://assets.codepen.io/5041378/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1600304177&width=512"
                            alt=""
                        />
                    </button>
                </div>

                <div className="px-10 mt-6">
                    <h1 className="text-2xl font-bold">Project Board</h1>
                </div>
                
                <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
                    {/* Backlog Stage */}
                    <div className="flex flex-col flex-shrink-0 w-72" ref={dropBacklog}>
                        <div className="flex items-center flex-shrink-0 h-10 px-2">
                            <span className="block text-sm font-semibold">Backlog</span>
                            <span
                                className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30"
                            >
                                { backlogProjects?.length }
                            </span>

                            <button
                                className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
                                onClick={() => setShowModal(true)}
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    ></path>
                                </svg>
                            </button>
                        </div>

                        <div className="flex flex-col pb-2 overflow-auto">
                            { isLoading && <ProjectsLoadingScreen /> }

                            { error && <ProjectsError error={error} title="Error" /> }

                            { 
                                backlogProjects?.map((project) => <Project key={project.id} project={project} />)
                            }
                        </div>
                    </div>

                    {/* Ready Stage */}
                    <div className="flex flex-col flex-shrink-0 w-72" ref={dropReady}>
                        <div className="flex items-center flex-shrink-0 h-10 px-2">
                            <span className="block text-sm font-semibold">Ready</span>

                            <span
                                className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30"
                            >
                                { readyProjects?.length }
                            </span>
                        </div>

                        <div className="flex flex-col pb-2 overflow-auto">
                            { isLoading && <ProjectsLoadingScreen /> }

                            { error && <ProjectsError error={error} title="Error" /> }

                            { 
                                readyProjects?.map((project) => <Project key={project.id} project={project} />)
                            }
                        </div>
                    </div>

                    {/* Doing Stage */}
                    <div className="flex flex-col flex-shrink-0 w-72" ref={dropDoing}>
                        <div className="flex items-center flex-shrink-0 h-10 px-2">
                            <span className="block text-sm font-semibold">Doing</span>

                            <span
                                className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30"
                            >
                                { doingProjects?.length }
                            </span>
                        </div>

                        <div className="flex flex-col pb-2 overflow-auto">
                            { isLoading && <ProjectsLoadingScreen /> }

                            { error && <ProjectsError error={error} title="Error" /> }

                            { 
                                doingProjects?.map((project) => <Project key={project.id} project={project} />)
                            }
                        </div>
                    </div>

                    {/* Review Stage */}
                    <div className="flex flex-col flex-shrink-0 w-72" ref={dropReview}>
                        <div className="flex items-center flex-shrink-0 h-10 px-2">
                            <span className="block text-sm font-semibold">Review</span>

                            <span
                                className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30"
                            >
                                { reviewProjects?.length }
                            </span>
                        </div>

                        <div className="flex flex-col pb-2 overflow-auto">
                            { isLoading && <ProjectsLoadingScreen /> }

                            { error && <ProjectsError error={error} title="Error" /> }

                            { 
                                reviewProjects?.map((project) => <Project key={project.id} project={project} />)
                            }
                        </div>
                    </div>

                    {/* Blocked Stage */}
                    <div className="flex flex-col flex-shrink-0 w-72" ref={dropBlocked}>
                        <div className="flex items-center flex-shrink-0 h-10 px-2">
                            <span className="block text-sm font-semibold">Blocked</span>

                            <span
                                className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30"
                            >
                                { blockedProjects?.length }
                            </span>
                        </div>

                        <div className="flex flex-col pb-2 overflow-auto">
                            { isLoading && <ProjectsLoadingScreen /> }

                            { error && <ProjectsError error={error} title="Error" /> }

                            { 
                                blockedProjects?.map((project) => <Project key={project.id} project={project} />)
                            }
                        </div>
                    </div>
                    
                    {/* Done Stage */}
                    <div className="flex flex-col flex-shrink-0 w-72" ref={dropDone}>
                        <div className="flex items-center flex-shrink-0 h-10 px-2">
                            <span className="block text-sm font-semibold">Done</span>
                            <span
                                className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30"
                            >
                                { doneProjects?.length }
                            </span>
                        </div>

                        <div className="flex flex-col pb-2 overflow-auto">
                            { isLoading && <ProjectsLoadingScreen /> }

                            { error && <ProjectsError error={error} title="Error" /> }

                            { 
                                doneProjects?.map((project) => <Project key={project.id} project={project} />)
                            }
                        </div>
                    </div>
                    
                    <div className="flex-shrink-0 w-6"></div>
                </div>
            </div>
        </>
    );
};

export default Projects;
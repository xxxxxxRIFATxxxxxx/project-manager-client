import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, redirect } from 'react-router-dom';
import { userLoggedOut } from '../auth/authSlice';
import logo from "./assets/logo.png";
import CreateTeamModal from './CreateTeamModal';
import Team from './Team';
import { useGetTeamsQuery } from './teamsApi';
import TeamsError from './TeamsError';
import TeamLoadingScreen from './TeamsLoadingScreen';

const Teams = () => {
    const auth = useSelector((state) => state.auth);
    const [ showModal, setShowModal ] = useState(false);
    const { data: teams, isLoading, isError, error } = useGetTeamsQuery(auth.user.email);
    
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(userLoggedOut()); 
        localStorage.clear();
        redirect("/");
    };

    // decide what to render
    let content = null;

    if (isLoading) {
        content = <TeamLoadingScreen />;
    } 
    
    else if (!isLoading && isError) {
        content = (
            <TeamsError error={error} title="Teams Data Fetching Error" />
        );
    } 
    
    else if (!isLoading && !isError && teams?.length === 0) {
        content = "You have no teams. Create your first team";
    } 
    
    else if (!isLoading && !isError && teams?.length > 0) {
        content = teams.map(team => <Team key={team.id} team={team} /> );
    };

    return (
        <>
            { showModal && <CreateTeamModal setShowModal={setShowModal} /> }

            <div
                className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200"
            >
                <div
                    className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75"
                >
                    <img src={logo} alt="lws-logo" className="h-10 w-10" />

                    <div className="ml-10">
                        <Link
                            className="mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700"
                            to="/projects"
                        >
                            Projects
                        </Link>

                        <Link
                            className="mx-2 text-sm font-semibold text-indigo-700"
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
                            src={auth.user.img}
                            alt=""
                        />
                    </button>
                </div>

                <div className="px-10 mt-6 flex justify-between">
                    <h1 className="text-2xl font-bold">Teams</h1>

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
                            >
                            </path>
                        </svg>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto">
                    {content}
                </div>
            </div>

            <a
                className="fixed bottom-0 right-0 flex items-center justify-center h-8 pl-1 pr-2 mb-6 mr-4 text-blue-100 bg-indigo-600 rounded-full shadow-lg hover:bg-blue-600"
                href="https://learnwithsumit.com"
                target="_top"
            >
                <div
                    className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full"
                >
                    <img src={logo} alt="LWS Logo" />
                </div>
                <span className="ml-1 text-sm leading-none">Learn with Sumit</span>
            </a>
        </>
    );
};

export default Teams;
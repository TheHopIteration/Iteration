import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


export const LoginPage = ({ user, sessionCheck }) => {
    let navigate = useNavigate();

    const navHome = () => {
        navigate("/");
    }; 

    useEffect(() => {
        if (JSON.stringify(user) !== JSON.stringify({})) {
          navHome();
        }
      }, [user]);


    const verifyUser = () => {
        let username = document.getElementById("usernameLoginForm").value;
        let password = document.getElementById("passwordLoginForm").value;
        fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({ "username": username, "password": password }),
        })
            .then(response => response.json())
            .then(user => {
                if (user.username === username) {
                    sessionCheck()
                }
                else {
                    alert('Wrong password!');
                }
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <section className="h-screen">

                <div className="flex xl:justify-center lg:justify-between justify-center items-center
                flex-wrap h-full g-6 bg-gradient-to-br from-custom-yellow via-custom-orange via-custom-darkcoral via-custom-darkpink to-custom-purple">
                    <div className="xl:w-3/12 lg:w-4/12 md:w-5/12 bg-white rounded-lg">
                        <form className='bg-white p-4 rounded-lg border-2 border-gray-200 shadow-lg'>
                            <div
                                className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                            >
                                <p className="text-center text-lg font-semibold mx-4 mb-2 text-gray-700">The Hop</p>
                            </div>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="usernameLoginForm"
                                    placeholder="Username"
                                />
                            </div>

                            <div className="mb-6">
                                <input
                                    type="password"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="passwordLoginForm"
                                    placeholder="Password"
                                />
                            </div>

                            <div className="text-center lg:text-left">
                                <button
                                    type="button"
                                    className="inline-block px-7 py-3 bg-custom-darkcoral text-white font-medium text-md leading-snug uppercase rounded shadow-md hover:brightness-75 hover:shadow-lg focus:bg-darkcoral focus:shadow-lg focus:outline-none focus:ring-0 active:bg-darkcoral active:shadow-lg transition duration-150 ease-in-out"
                                    onClick={() => verifyUser()}
                                >
                                    Login
                                </button>
                                <p className="text-md font-semibold mt-3 pt-1 mb-0">
                                    Don't have an account?
                                    <button
                                        onClick={() => navigate('/signup')}
                                        className="ml-2 text-custom-darkcoral hover:text-custom-darkcoral focus:text-custom-darkcoral transition duration-200 ease-in-out"
                                    > Register
                                    </button>
                                </p>
                                <p>
                                <button className="text-md font-semibold mt-2 pt-1 mb-0 text-custom-darkcoral hover:text-custom-darkcoral focus:text-green-800 transition duration-200 ease-in-out"
                                    onClick={() => navigate('/')}>
                                    Return to app
                                </button>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

        </section>
    )
}

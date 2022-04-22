import React from 'react';
import { useNavigate } from 'react-router-dom';


export const SignupPage = () => {

    let navigate = useNavigate();

    const createUser = () => {
        let username = document.getElementById("usernameCreateUserForm").value;
        let firstName = document.getElementById("firstNameCreateUserForm").value;
        let lastName = document.getElementById("lastNameCreateUserForm").value;
        let address = document.getElementById("addressCreateUserForm").value;
        let password = document.getElementById("passwordCreateUserForm").value;
        let email = document.getElementById("emailCreateUserForm").value;

        fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({ "username": username, "password": password, "email": email, "firstName": firstName, "lastName": lastName, "address": address }),
        }).then(async (response) => {
            if (response.status === 200) {
                navigate("/");
                window.location.reload(false);
            } else {
                alert("Error during sign up process")
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
                    <div className="xl:w-3/12 lg:w-4/12 md:w-5/12">
                        <form onSubmit={() => createUser()} className='bg-white  p-4 rounded-lg border-2 border-gray-200 shadow-lg'>
                            <div
                                className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                            >
                                <p className="text-center text-xl font-semibold mx-4 mb-2 text-gray-700">Create New Account</p>
                            </div>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="usernameCreateUserForm"
                                    placeholder="Username"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <input
                                    type="password"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="passwordCreateUserForm"
                                    placeholder="New Password"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <input
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="firstNameCreateUserForm"
                                    placeholder="First Name"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <input
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="lastNameCreateUserForm"
                                    placeholder="Last Name"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <input
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="addressCreateUserForm"
                                    placeholder="Home address"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <input
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="emailCreateUserForm"
                                    placeholder="Email"
                                    required
                                />
                            </div>

                            <div className="text-center lg:text-left">
                                <button
                                    type="submit"
                                    className="inline-block mb-4 px-7 py-3 bg-custom-darkcoral text-white font-medium text-md leading-snug uppercase rounded shadow-md hover:brightness-75 hover:shadow-lg focus:bg-darkcoral focus:shadow-lg focus:outline-none focus:ring-0 active:bg-darkcoral active:shadow-lg transition duration-150 ease-in-out"
                                >
                                    Create Account
                                </button>
                                <br></br>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="ml-2 text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out" >
                                    Back to login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

        </section>
    )
}

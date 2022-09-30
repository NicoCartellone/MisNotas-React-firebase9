import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { Menu, Transition } from "@headlessui/react";

const NavBar = () => {
  const { signOutUser, userData, user } = useContext(UserContext);

  const handleLogOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.log(error.code);
    }
  };

  const classButtonBlue =
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";

  const classButtonRed =
    "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800";

  return (
    <div className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 shadow-sm">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="flex items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/906/906334.png"
            className="mr-3 h-6 sm:h-9"
            alt="icon Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            MisNotas
          </span>
        </Link>

        {/* menu button dropdown */}
        <div className="flex md:order-2">
          {user ? (
            <Menu as="div" className="relative">
              {({ open }) => (
                <>
                  <Menu.Button className="flex mr-3 text-sm  rounded-full hover:ring-4 hover:bg-blue-400 md:mr-0 focus:ring-4 focus:ring-blue-400 dark:focus:ring-gray-600">
                    {userData.photoURL ? (
                      <img
                        className="w-10 h-10 rounded-full"
                        src={userData.photoURL}
                        alt="user photo"
                      />
                    ) : (
                      <img
                        className="w-10 h-10 rounded-full"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5c2QCGWIDwM5VfLmcIWkU3aMzzQ18uf2ISQ&usqp=CAU"
                        alt="user photo"
                      />
                    )}
                  </Menu.Button>

                  {/* menu list dropdown */}
                  <Transition
                    show={open}
                    enter="transform transition duration-100 ease-in"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="tranform transition duration-75 ease-out"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Menu.Items
                      className="origin-top-right z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-300 shadow-md dark:bg-gray-700 dark:divide-gray-600 absolute -right-14"
                      static
                    >
                      <div className="py-3 px-4">
                        <span className="block text-sm text-gray-900 dark:text-white capitalize">
                          {userData.displayName}
                        </span>
                        <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                          {userData.email}
                        </span>
                      </div>

                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to="/"
                            className={`flex flex-row py-2 px-4 text-sm cursor-pointer
                    
                    ${
                      active
                        ? "bg-blue-200 dark:text-gray-200"
                        : "text-gray-700 dark:hover:text-white dark:hover:bg-gray-600"
                    }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="mr-3 w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                            <span className="ml-1">Tus Notas</span>
                          </NavLink>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to="/perfil"
                            className={`flex flex-row py-2 px-4 text-sm cursor-pointer
                    
                    ${
                      active
                        ? "bg-blue-200 dark:text-gray-200"
                        : "text-gray-700 dark:hover:text-white dark:hover:bg-gray-600"
                    }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="mr-3 w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            <span className="ml-1"> Perfil</span>
                          </NavLink>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogOut}
                            className={`flex flex-row py-2 px-4 text-sm cursor-pointer w-full
                    
                    ${
                      active
                        ? "bg-blue-200 dark:text-gray-200"
                        : "text-gray-700 dark:hover:text-white dark:hover:bg-gray-600"
                    }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="mr-3 w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                              />
                            </svg>
                            <span className="ml-1"> Cerrar Sesión</span>
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 focus:text-blue-700"
              >
                Login
              </NavLink>
              <NavLink to="/register" className={classButtonBlue}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default NavBar;

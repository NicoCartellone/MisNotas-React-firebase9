import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

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

  const onExpanse = () => {
    document.getElementById("user-dropdown").classList.toggle("hidden");
  };

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

        <div className="flex md:order-2">
          {user ? (
            <>
              <button
                type="button"
                className="flex mr-3 text-sm  rounded-full hover:ring-4 hover:bg-blue-400 md:mr-0 focus:ring-4 focus:ring-blue-400 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
                onClick={onExpanse}
              >
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
              </button>
              <div
                className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-300 shadow-md dark:bg-gray-700 dark:divide-gray-600 absolute top-12 right-32"
                id="user-dropdown"
              >
                <div className="py-3 px-4">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {userData.displayName}
                  </span>
                  <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                    {userData.email}
                  </span>
                </div>
                <ul className="py-1" aria-labelledby="user-menu-button">
                  <li>
                    <NavLink
                      to="/"
                      className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                    >
                      Tus Notas
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/perfil"
                      className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                    >
                      Perfil
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer w-48 text-left"
                    >
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            </>
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

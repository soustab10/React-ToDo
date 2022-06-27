/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useAuth } from "../context/auth";
import TaskIcon from "@mui/icons-material/Task";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import useDarkMode from "../pages/useDarkMode";
/**
 *
 * @todo Condtionally render login/register and Profile name in NavBar
 */

export default function Nav() {
  const { logout, profileName, avatarImage, token } = useAuth();
  const [darkTheme, setDarkTheme] = useDarkMode();
  const ThemeIcon = () => {
    const handleMode = () => setDarkTheme(!darkTheme);
    return (
      <span onClick={handleMode}>
        {darkTheme ? (
          <LightModeIcon className="top-navigation-icon text-3xl" />
        ) : (
          <DarkModeIcon className="top-navigation-icon text-3xl" />
        )}
      </span>
    );
  };
  return (
    <div className="max-w-full">
      <nav className="bg-blue-800 max-w-10">
        <ul className="flex items-center max-w-full min-w-full justify-between p-5">
          <ul className="flex items-center justify-between space-x-4">
            <li>
              <Link href="/" passHref={true}>
                <a>
                  {darkTheme ? (
                    <h1 className="text-white font-bold text-xl">
                      <TaskIcon />
                      Todo
                    </h1>
                  ) : (
                    <h1 className="text-white font-bold text-xl">
                      <TaskIcon />
                      Todo
                    </h1>
                  )}
                </a>
              </Link>
            </li>
          </ul>

          {token === undefined || token === null ? (
            <ul className="flex">
              <li className="items-center mr-2">
                <h1 className="text-white flex justify-center font-bold text-4xl h-5 w-1/5 items-center transition-all">
                  <ThemeIcon />
                </h1>
              </li>
              <li className="text-white mr-2">
                <LoginIcon />
                <Link href="/login">Login</Link>
              </li>

              <li className="text-white">
                <HowToRegIcon />
                <Link href="/register">Register</Link>
              </li>
            </ul>
          ) : (
            <div className=" relative w-auto h-auto flex flex-row justify-between w-24">
              <h1 className="text-white font-bold text-4xl h-5 w-1/5 items-center smooth-transition">
                <ThemeIcon />
              </h1>

              <div className="group relative flex w-auto flex-row px-2 ">
                <button className="bg-gray-300 text-gray-700 text-base py-2 px-4 rounded w-auto inline-flex items-center">
                  <img src={token != undefined ? avatarImage : null} />
                  <span className="mr-1 w-auto font-light text-sm">
                    {token === undefined || token === null ? null : profileName}
                  </span>
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </button>
                <ul className="absolute hidden text-gray-700 pt-1 group-hover:block">
                  <li className="">
                    <a
                      // className="rounded-b text-left text-sm bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                      className="origin-top-bottom absolute top-12 w-32 mt-2 rounded-b text-left text-sm bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                      href="#"
                      onClick={logout}
                    >
                      <LogoutIcon />
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
}

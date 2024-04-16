import { useNavigate } from "react-router-dom";
import {
  ArrowDownCircleOutline,
  Close,
  LogIn,
  LogOut,
  Menu,
} from "react-ionicons";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../state/modal/modalSlice";
import { logOut } from "../state/user/loginStatusSlice";
import { RootState } from "../state/store";
import toast from "react-hot-toast";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutMenu, setLogoutMenu] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const dispatch = useDispatch();
  const isLogedIn = useSelector<RootState, boolean>(
    (state) => state.loginStatus.isLogedIn
  );
  console.log(isLogedIn);
  let menuRef = useRef<HTMLDivElement>(null);
  let buttonMenuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (
        menuRef.current != null &&
        !menuRef.current.contains(e.target as Node) &&
        buttonMenuRef.current != null &&
        !buttonMenuRef.current.contains(e.target as Node)
      ) {
        setLogoutMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="bg-violet-400 w-full p-4 h-[5.5rem]">
      <h1
        className="absolute p-4 cursor-pointer text-xl font-bold text-violet-900 z-20"
        onClick={() => navigate("/")}
      >
        Movie search
      </h1>
      <ul
        className={`flex justify-center mx-auto relative [&>*]:p-4 [&>*]:mx-2 hover:[&>*]:text-white  max-xl:bg-white max-xl:flex-col max-xl:mt-[4.5rem] max-xl:text-center rounded-b-lg max-xl:z-10 list-outside [&>*]:max-xl:m-4 ${
          menuOpen ? "" : "max-xl:hidden"
        }`}
      >
        <li
          className="hover:bg-violet-600 cursor-pointer rounded-lg"
          onClick={() => {
            setMenuOpen(false);
            navigate("/trending-movies");
          }}
        >
          Trending movies
        </li>
        <li
          className="hover:bg-violet-600 cursor-pointer rounded-lg"
          onClick={() => {
            setMenuOpen(false);
            navigate("/top-rated-movies");
          }}
        >
          Top rated movies
        </li>
        <li
          className="hover:bg-violet-600 cursor-pointer rounded-lg"
          onClick={() => {
            setMenuOpen(false);
            navigate("/trending-shows");
          }}
        >
          Trending shows
        </li>
        <li
          className="hover:bg-violet-600 cursor-pointer rounded-lg"
          onClick={() => {
            setMenuOpen(false);
            navigate("/top-rated-shows");
          }}
        >
          Top rated shows
        </li>

        <li
          className="hover:bg-violet-600 cursor-pointer rounded-lg"
          onClick={() => {
            setMenuOpen(false);
            navigate("/trending-persons");
          }}
        >
          Trending persons
        </li>
        <li
          className="hover:bg-violet-600 cursor-pointer rounded-lg"
          onClick={() => {
            setMenuOpen(false);
            navigate("/playlists");
          }}
        >
          Playlists
        </li>
      </ul>
      <button
        name="login"
        className={`absolute p-4 right-4 top-4  cursor-pointer  flex align-middle justify-center ${
          isLoggedIn === "true" ? "hidden" : ""
        }`}
        onClick={() => {
          dispatch(openModal());
        }}
      >
        <LogIn color="#4C1D95" /> Log in
      </button>
      <button
        ref={buttonMenuRef}
        name="username"
        className={`hover:outline outline-violet-800 rounded-xl absolute p-2 right-4 top-3  cursor-pointer  flex align-middle justify-center ${
          isLoggedIn === "true" ? "" : "hidden"
        }`}
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        type="button"
        onClick={() => {
          setLogoutMenu((prev) => !prev);
        }}
      >
        <div className="mr-1 mt-[-0.15rem] flex flex-col relative">
          <span>Signed in as </span>
          <span className="text-violet-950 font-bold text-lg">
            {localStorage.getItem("username")}
          </span>
        </div>
        <div className="relative top-3 ml-2">
          <ArrowDownCircleOutline color="#4C1D95" />
        </div>
      </button>

      <div
        ref={menuRef}
        className={`z-10  bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-slate-200 absolute right-7 top-20 ${
          logoutMenu === true ? "" : "hidden"
        }`}
      >
        <button
          name="logout"
          className={`p-4 cursor-pointer  flex align-middle justify-center`}
          onClick={() => {
            setLogoutMenu(false);
            localStorage.setItem("isLoggedIn", "false");
            localStorage.removeItem("username");
            dispatch(logOut());
            toast("You have loged out successfully.", {
              style: {
                borderRadius: "20px",
              },
            });
          }}
        >
          <LogOut color="#4C1D95" /> Log out
        </button>
      </div>

      <button
        name="menu"
        className="absolute p-4 right-4 top-4 text-3xl cursor-pointer md:xl xl:hidden max-xl:right-28"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? <Close color="#4C1D95" /> : <Menu color="#4C1D95" />}
      </button>
    </div>
  );
};

export default Navbar;

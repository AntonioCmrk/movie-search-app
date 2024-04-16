import { useDispatch } from "react-redux";
import { closeModal } from "../state/modal/modalSlice";
import { logIn } from "../state/user/loginStatusSlice";
import { useState } from "react";
import toast from "react-hot-toast";

export const LoginModal = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onSubmit = () => {
    if (
      (username === "user1" && password === "123") ||
      (username === "user2" && password === "123") ||
      (username === "user3" && password === "123")
    ) {
      dispatch(closeModal());
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      dispatch(logIn(username));
      toast("Successfully signed in!", {
        icon: "👏",
        style: {
          borderRadius: "20px",
        },
      });
    } else {
      toast.error("Username or password incorrect", {
        style: {
          borderRadius: "20px",
        },
        duration: 1500,
      });
    }
  };
  return (
    <div
      className="bg-black bg-opacity-75 fixed top-0 left-0 w-full h-full z-20 flex items-center justify-center"
      onClick={() => {
        dispatch(closeModal());
      }}
    >
      <div
        className="bg-white p-9 rounded-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className=" titleCloseBtn">
          <button
            className="absolute right-2 top-2"
            onClick={() => {
              dispatch(closeModal());
            }}
          >
            X
          </button>
        </div>
        <div className="flex flex-col align-middle justify-center text-center">
          <h1 className="mb-6">Login</h1>
          <form>
            <div className="mb-6">
              <h1>Username:</h1>
              <input
                placeholder="Username"
                className="border-solid border-black border-2 rounded-2xl p-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => (e.key === "Enter" ? onSubmit() : null)}
                autoFocus
              />
            </div>
            <div className="mb-6">
              <h1>Password:</h1>
              <input
                placeholder="Password"
                className="border-solid border-black border-2 rounded-2xl p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => (e.key === "Enter" ? onSubmit() : null)}
                type="password"
              />
            </div>
          </form>
          <button
            className="rounded-2xl p-2 hover:bg-violet-600 bg-violet-400 "
            onClick={() => {
              onSubmit();
            }}
            id="login-btn"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

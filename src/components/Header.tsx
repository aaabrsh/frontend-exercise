import { useDispatch } from "react-redux";
import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/auth/auth.slice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div className="w-full fixed z-[99999] left-0 bg-cyan-700 px-10 flex justify-between">
        <ul className="flex text-white">
          <li
            className="py-4 px-4 underline-animation"
            onClick={() => navigate("/home")}
          >
            Home
          </li>
          <li
            className="py-4 px-4 underline-animation"
            onClick={() => navigate("/profile")}
          >
            Profile
          </li>
        </ul>
        <ul className="text-white">
          <li
            className="py-4 px-4 self-end underline-animation"
            onClick={() => dispatch(logout())}
          >
            Sign out
          </li>
        </ul>
      </div>
    </>
  );
}

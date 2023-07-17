import { Link } from "react-router-dom";
import { auth } from "../utils/config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const Nav = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <h1 className="text-2xl ">Loading...</h1>
      </div>
    );
  }
  return (
    <nav className="flex justify-between items-center py-10">
      <Link to="/">
        <button className="text-lg font-medium">Creative Minds</button>
      </Link>
      <ul className="flex items-center gap-10">
        {!user && (
          <Link to="/auth/login">
            <a className="py-2 px-4 text-sm bg-cyan-500 rounded-lg text-white ml-8 font-medium">
              Join Now
            </a>
          </Link>
        )}
        {user && (
          <div className="flex items-center gap-6">
            <Link to="/post">
              <button className="font-medium bg-cyan-500 text-white py-2 px-4 rounded-md text-sm">
                Post
              </button>
            </Link>
            <Link to="/dashboard">
              <img
                className="w-12 rounded-full cursor-pointer"
                src={user.photoURL}
                alt="avatar"
              />
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Nav;

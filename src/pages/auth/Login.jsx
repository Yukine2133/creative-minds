import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../utils/config/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [user, loading] = useAuthState(auth);

  //Sign in with google

  const googleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      console.log("asd");
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <h1 className="text-2xl ">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg">
      <h2 className="text-2xl font-medium">Join Today</h2>
      <div className="py-4">
        <h3 className="py-4">Sign in with one of the providers</h3>
        <button
          onClick={googleLogin}
          className="text-white bg-gray-700 w-full font-medium rounded-lg flex align-middle p-4 gap-2 hover:bg-gray-900 transition-colors duration-300"
        >
          <FcGoogle className="text-2xl" /> Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/config/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

const Post = () => {
  //Form state
  const [user, loading] = useAuthState(auth);
  const [post, setPost] = useState({ description: "" });
  const navigate = useNavigate();

  //Submit Post
  const submitPost = async (e) => {
    e.preventDefault();

    //Run checks for description
    if (!post.description) {
      toast.error("Description Field empty!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }
    if (post.description > 300) {
      toast.error("Description too long", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }

    //Make a new post
    const collectionRef = collection(db, "posts");
    await addDoc(collectionRef, {
      ...post,
      timestamp: serverTimestamp(),
      user: user.uid,
      avatar: user.photoURL,
      username: user.displayName,
    });
    setPost({ description: "" });
    toast.success("Post has been made ", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1500,
    });
    return navigate("/");
  };

  //Check our user
  const checkUser = async () => {
    if (loading) return;
    if (!user) navigate("/auth/login");
  };
  useEffect(() => {
    checkUser();
  }, [user, loading]);

  return (
    <div className="my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto">
      <form onSubmit={submitPost}>
        <h1 className="text-2xl font-bold">Create a new post</h1>
        <div className="py-2">
          <h3 className="text-lg font-medium py-2">Description</h3>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className="bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm"
          ></textarea>
          <p
            className={`text-cyan-600 font-medium text-sm ${
              post.description.length > 300 && "text-red-600"
            }`}
          >
            {post.description.length}/300
          </p>
        </div>
        <button
          type="submit"
          className="w-full hover:bg-cyan-800 transition-colors duration-300 bg-cyan-600 text-white font-medium p-2 my-2 rounded-lg text-sm"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Post;

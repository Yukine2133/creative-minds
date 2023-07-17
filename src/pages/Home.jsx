import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Message from "../components/Message";
import { db } from "../utils/config/firebase";
import { useEffect, useState } from "react";

const Home = () => {
  //Create a state with all the posts
  const [allPosts, setAllPosts] = useState([]);

  const getPosts = async () => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
    return unsubscribe;
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="my-2 text-lg font-medium">
      <h2>See what other people are saying</h2>
      {allPosts.map((post) => (
        <Message key={post.id} {...post}></Message>
      ))}
    </div>
  );
};

export default Home;

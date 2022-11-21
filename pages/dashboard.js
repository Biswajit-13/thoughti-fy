import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Message from "../components/message";
import { BsTrash2Fill, BsInbox } from "react-icons/bs";
import { AiOutlineEdit,AiFillDelete } from "react-icons/ai";
import Link from "next/link";

export default function Dashboard() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState([]);

  const getData = async () => {
    if (loading) return;
    if (!user) return route.push("/auth/login");

    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, where("user", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };

  //Delete Post
  const deletePost = async (id) => {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
  };

  //Get users data
  useEffect(() => {
    getData();
  }, [user, loading]);

  return (
    <div className=" flex justify-center">
      <div className="w-80">
        <h1 className="text-slate-800">My posts</h1>
        <div>
          {posts.map((post) => {
            return (
              <Message {...post} key={post.id}>
                <div className="flex gap-4">
                  <button
                    onClick={() => deletePost(post.id)}
                    className="text-pink-600 flex items-center justify-center gap-2 py-2 text-sm"
                  >
                    <AiFillDelete className="text-2xl" /> Delete
                  </button>
                  <Link href={{ pathname: "/post", query: post }}>
                    <button className="text-teal-600 flex items-center justify-center gap-2 py-2 text-sm">
                      <AiOutlineEdit className="text-2xl" />
                      Edit
                    </button>
                  </Link>
                </div>
              </Message>
            );
          })}
        </div>
      </div>
      <div>
        <button
          className="font-medium rounded-[10px] text-white bg-slate-900 py-2 px-4 my-6"
          onClick={() => auth.signOut()}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

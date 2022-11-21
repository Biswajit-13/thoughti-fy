import Message from "../components/message";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { toast } from "react-toastify";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

export default function Details() {
  const router = useRouter();
  const routeData = router.query;
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessages] = useState([]);

  //Submit a message
  const submitMessage = async () => {
    //Check if the user is logged
    if (!auth.currentUser) return router.push("/auth/login");

    if (!message) {
      console.log(message);
      toast.error("Don't leave an empty message 😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }
    const docRef = doc(db, "posts", routeData.id);
    await updateDoc(docRef, {
      comments: arrayUnion({
        message,
        avatar: auth.currentUser.photoURL,
        userName: auth.currentUser.displayName,
        time: Timestamp.now(),
      }),
    });
    setMessage("");
  };

  //Get Comments
  const getComments = async () => {
    const docRef = doc(db, "posts", routeData.id);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setAllMessages(snapshot.data().comments);
    });
    return unsubscribe;
  };

  useEffect(() => {
    if (!router.isReady) return;
    getComments();
  }, [router.isReady]);
  return (
    <div>
      <Message {...routeData}></Message>
      <div className="my-4">
        <div className="flex">
          <input
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            value={message}
            placeholder="comment on this thought"
            className="bg-slate-800 w-full p-4 text-white text-sm rounded-l-[15px]"
          />
          <button
            onClick={submitMessage}
            className="bg-pink-600 rounded-r-[15px] text-white py-2 px-4 text-sm"
          >
            Comment
          </button>
        </div>
        <div className="py-6">
          <h2 className="font-bold text-pink-600">Comments</h2>
          {allMessage?.map((message) => (
            <div className="bg-white p-4 my-4 border-2" key={message.time}>
              <div className="flex items-center gap-2 mb-4">
                <img
                  className="w-10 rounded-full"
                  src={message.avatar}
                  alt=""
                />
                <h2 className="ttext-sm text-slate-700 font-[600]">
                  {message.userName}
                </h2>
              </div>
              <div className="py-4 mt-3 bg-slate-300 rounded-[20px]">
                <p className="px-5 text-base text-slate-900 font-[500]">
                  {message.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

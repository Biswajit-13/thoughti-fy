import { FcGoogle, FcReadingEbook } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import Image from "next/image";
import profilePic from "../../public/applogo.png";

// import  img from "../../public/assets/logo-image.png"
export default function Login() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  //Sign in with google
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      route.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      route.push("/");
    } else {
      console.log("login");
    }
  }, [user]);

  return (
    <div>
    
      <div className="px-10 self-center">
        <Image
          src={profilePic}
          alt="user profile picture"
         width={300}
         height={300}
        
          objectFit="contain"
        />
      </div>

      <div className="py-4">
        <h3 className="py-4"></h3>
        <button
          onClick={GoogleLogin}
          className="text-white bg-slate-800 w-full font-medium rounded-lg flex align-middle p-4 gap-2"
        >
          <FcGoogle className="text-2xl" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

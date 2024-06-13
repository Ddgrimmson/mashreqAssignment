import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore, auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "../store/userSlice";
import { clearLoader, setLoader } from "../store/loaderSlice";
import { setError } from "../store/errorSlice";

const useFirebaseAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signIn = async (
    username: FormDataEntryValue,
    password: FormDataEntryValue,
    country: string
  ) => {
    try {
      dispatch(setLoader());
      const userRef = collection(firestore, "users");
      const userDoc = await getDocs(
        query(
          userRef,
          where("username", "==", username),
          where("country", "==", country)
        )
      );
      const userInfo = userDoc?.docs[0]?.data();
      if(!userInfo) throw(new Error("Invalid Username password or country"));
      await signInWithEmailAndPassword(
        auth,
        userInfo?.email,
        password.toString()
      );
      dispatch(setUser(userInfo));
      dispatch(clearLoader());
      navigate("/home");
    } catch (error) {
      dispatch(clearLoader());
      dispatch(setError(error));
      return error;
    }
  };

  const logout = () => {
    dispatch(setLoader());
    auth.signOut();
    dispatch(clearUser());
    dispatch(clearLoader());
    navigate("/");
  };

  return { signIn, logout };
};

export default useFirebaseAuth;

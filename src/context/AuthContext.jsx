import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";

import auth from "../firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {

          setUser(currentUser);

          setLoading(false);

        }
      );

    return unsubscribe;

  }, []);


  const refreshUser = () => {

    if (auth.currentUser) {
      setUser({
        ...auth.currentUser
      });
    }

  };


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}
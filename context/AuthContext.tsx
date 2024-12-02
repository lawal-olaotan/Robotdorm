import React, {
  FC,
  useState,
  createContext,
  useContext,
  useEffect,
} from "react";
import { getSession } from "next-auth/react";

type AuthProps = {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
};

const AuthContext = createContext<AuthProps>(null);

export const AuthProvider: FC = ({ children }) => {
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    getSession().then((session) => {
        console.log(session);
       const url = session ? '/login' : '/signup';
       setUrl(url);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ url, setUrl }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * a custom hook for the auth Context
 * @returns
 */
export default function useAuthContext() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within AuthContext provider");
  }

  return authContext;
}

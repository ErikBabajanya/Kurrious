"use client";
import React, {
  createContext,
  FC,
  useCallback,
  useState,
  useEffect,
} from "react";
import { baseUrl, postRequest } from "../utils/services";

interface User {
  userEmail: String;
  password: String;
  token: String;
  userId: String;
}

interface AuthContextProps {
  user: User | null;
  registerInfo: User;
  updateRegisterInfo: (info: User) => void;
  registerUser: (e: React.FormEvent) => Promise<void>;
  registerError: any;
  isRegisterLoading: boolean;
  loginUser: (e: React.FormEvent) => Promise<void>;
  loginError: any;
  loginInfo: User;
  updateLoginInfo: (info: User) => void;
  isLoginLoading: boolean;
}

export const AuthContext = createContext<AuthContextProps | null>(null);
export const AuthContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const [registerError, setRegisterError] = useState<any>(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState<boolean>(false);
  const [registerInfo, setRegisterInfo] = useState<User>({
    userEmail: "",
    password: "",
    token: "",
    userId: "",
  });

  const [loginError, setLoginError] = useState<any>(null);
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
  const [loginInfo, setLoginInfo] = useState<User>({
    userEmail: "",
    password: "",
    token: "",
    userId: "",
  });

  useEffect(() => {
    const userString = localStorage.getItem("User");
    const user = userString ? JSON.parse(userString) : null;
    setUser(user);
  }, []);

  const updateRegisterInfo = useCallback((info: User) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info: User) => {
    setLoginInfo(info);
  }, []);

  const registerUser = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsRegisterLoading(true);
      setRegisterError(null);

      try {
        const response = await postRequest(
          `${baseUrl}/users/register`,
          JSON.stringify(registerInfo)
        );

        if (response.error) {
          return setRegisterError(response);
        }

        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
      } catch (error) {
        console.error("Error in registerUser:", error);
        setRegisterError({ error: "An unexpected error occurred" });
      } finally {
        setIsRegisterLoading(false);
      }
    },
    [registerInfo]
  );

  const loginUser = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      console.log(loginInfo);
      const response = await postRequest(
        `${baseUrl}/users/login`,
        JSON.stringify(loginInfo)
      );
      console.log(response);

      setIsLoginLoading(false);

      if (response.error) {
        return setLoginError(response);
      }

      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    },
    [loginInfo]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        loginUser,
        loginError,
        loginInfo,
        updateLoginInfo,
        isLoginLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";

import { restoreSession } from "../services/sessionService";
import { tokenStore } from "../services/tokenStore";
import { logoutAllUser, logoutUser } from "../services/authServices";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuthenticated: (value: boolean) => void;
  logout: () => void;
  logoutAll: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const restored = await restoreSession();

      setIsAuthenticated(restored);
      setIsLoading(false);
    };

    initializeAuth();

    const handleExpired = () => {
      tokenStore.clear();
      setIsAuthenticated(false);
    };

    window.addEventListener("auth:expired", handleExpired);

    return () => {
      window.removeEventListener("auth:expired", handleExpired);
    };
  }, []);

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      setIsAuthenticated(false);
    }
  };

  const logoutAll = async () => {
    try {
      await logoutAllUser();
    } finally {
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        setAuthenticated: setIsAuthenticated,
        logout,
        logoutAll
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
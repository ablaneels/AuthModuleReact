import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
  user: null | { [key: string]: any }; // Adjust this to your user object
  setUser: React.Dispatch<React.SetStateAction<null | { [key: string]: any }>>; // Adjust this to your user object
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<null | { [key: string]: any }>(null); // Adjust this to your user object

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
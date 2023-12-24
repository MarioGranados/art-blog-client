import { createContext, useContext, useState } from "react";

const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  return (
    <UserInfoContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = () => useContext(UserInfoContext);

import { createContext, useState } from "react";

export const UserInfo = createContext({});

export function UserInfoProvider({ children }) {
  const [userData, setUserData] = useState({});

  return <UserInfo.Provider value={{userData, setUserData}}>{children}</UserInfo.Provider>;
}

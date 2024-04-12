import { Route, Routes } from "react-router-dom";

import { UserCard } from "./UserCard";
import { EditCard } from "./RegisterCard";
import { FC, memo } from "react";
import { SearchCard } from "./SearchCard";

// export interface RouterProps {
//   users: User[];
//   setUsers: React.Dispatch<React.SetStateAction<User[]>>;
//   setUserNotFound: (flag: boolean) => void;
// }
export const Router: FC = memo(() => {
  console.log("Router component is rendering");
  return (
    <Routes>
      <Route path="*" element={<SearchCard />} />
      <Route path="/:loginID" element={<UserCard />} />
      <Route path="/cards/register" element={<EditCard />} />
    </Routes>
  );
});

import { Route, Routes } from "react-router-dom";

import { UserCard } from "./UserCard";
import { EditCard } from "./EditCard";
import { FC, memo } from "react";
import { User } from "./domain/user";

export interface RouterProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setUserNotFound: (flag: boolean) => void;
}
export const Router: FC<RouterProps> = memo(
  ({ users, setUsers, setUserNotFound }) => {
    console.log("Router component is rendering");
    return (
      <Routes>
        {/* UserCardにusersとsetUsersをpropsとして渡す*/}
        <Route
          path="/:loginID"
          element={<UserCard users={users} setUserNotFound={setUserNotFound} />}
        />
        {/* EditCardにsetUsersをpropsとして渡す */}
        <Route
          path="/cards/register"
          element={<EditCard setUsers={setUsers} />}
        />
      </Routes>
    );
  }
);

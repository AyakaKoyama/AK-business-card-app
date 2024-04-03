import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { UserCard } from "./UserCard";
import { EditCard } from "./EditCard";
import { useState } from "react";
import { User } from "./domain/user";

function App() {
  const [users, setUsers] = useState<User[]>([]);

  return (
    <ChakraProvider>
      <Routes>
        {/* UserCardにusersとsetUsersをpropsとして渡す */}
        <Route path="/:loginID" element={<UserCard users={users} />} />
        {/* EditCardにsetUsersをpropsとして渡す */}
        <Route
          path="/cards/register"
          element={<EditCard setUsers={setUsers} />}
        />
      </Routes>
    </ChakraProvider>
  );
}

export default App;

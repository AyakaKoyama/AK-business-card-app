import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { UserCard } from "./UserCard";
import { EditCard } from "./EditCard";

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/cards/:id/*" element={<UserCard />} />
        <Route path="/cards/register" element={<EditCard />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;

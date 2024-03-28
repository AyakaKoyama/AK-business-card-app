import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { Card } from "./Card";

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/cards/:id/*" element={<Card />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;

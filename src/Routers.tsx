import { BrowserRouter, Route, Routes } from "react-router-dom";

import { UserCard } from "./UserCard";
import { RegisterCard } from "./RegisterCard";
import { memo } from "react";
import { SearchCard } from "./SearchCard";

export const Routers = memo(() => {
  console.log("Router component is rendering");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<SearchCard />} />
        <Route path="/:loginID" element={<UserCard />} />
        <Route path="/cards/register" element={<RegisterCard />} />
      </Routes>
    </BrowserRouter>
  );
});

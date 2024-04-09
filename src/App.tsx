import { ChakraProvider, Heading, Text } from "@chakra-ui/react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserCard } from "./UserCard";
import { EditCard } from "./EditCard";
import { useState } from "react";
import { User } from "./domain/user";
import { SubmitHandler, useForm } from "react-hook-form";
import { SearchCard } from "./SearchCard";

type Inputs = {
  searchID: string;
};
function App() {
  const { reset } = useForm<Inputs>();
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  //エラーフラグ
  const [userNotFound, setUserNotFound] = useState(false);

  // 検索ボタンがクリックされたときの処理
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { searchID } = data;
    navigate(`/${searchID}`);
    //resetされない
    reset();
  };

  return (
    <ChakraProvider>
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
      {/* どの画面に遷移しても毎回検索欄が表示されちゃう！*/}
      <Heading>ユーザー検索</Heading>
      <SearchCard onSubmit={onSubmit} />
      {/* エラーメッセージ */}
      {userNotFound && (
        <Text color="red">該当するユーザーが見つかりません。</Text>
      )}
    </ChakraProvider>
  );
}

export default App;

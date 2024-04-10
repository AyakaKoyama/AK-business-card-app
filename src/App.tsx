import { Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SearchCard } from "./SearchCard";
import { User } from "./domain/user";
import { Router } from "./Router";

type Inputs = {
  searchID: string;
};
function App() {
  const { reset } = useForm<Inputs>();
  const navigate = useNavigate();
  //エラーフラグ
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userNotFound, setUserNotFound] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  // 検索ボタンがクリックされたときの処理
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { searchID } = data;
    reset();
    navigate(`/${searchID}`);
  };

  return (
    <>
      <Heading>ユーザー検索</Heading>
      <SearchCard onSubmit={onSubmit} />
      {/* エラーメッセージ */}
      {userNotFound && (
        <Text color="red">該当するユーザーが見つかりません。</Text>
      )}
      {/* ルーティング部分 */}
      <Router
        users={users}
        setUsers={setUsers}
        setUserNotFound={setUserNotFound}
      />
    </>
  );
}

export default App;

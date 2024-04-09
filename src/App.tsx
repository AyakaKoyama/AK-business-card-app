import {
  Button,
  ChakraProvider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserCard } from "./UserCard";
import { EditCard } from "./EditCard";
import { useState } from "react";
import { User } from "./domain/user";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  searchID: string;
};
function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  //エラーフラグ
  const [userNotFound, setUserNotFound] = useState(false);

  // 検索ボタンがクリックされたときの処理
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { searchID } = data;
    navigate(`/${searchID}`);
    reset();
  };

  return (
    <ChakraProvider>
      <Routes>
        {/* UserCardにusersとsetUsersをpropsとして渡す */}
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

      <Heading>ユーザー検索</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.searchID} isRequired>
          <FormLabel>ユーザーID</FormLabel>
          <Input
            placeholder=""
            color="green"
            _placeholder={{ color: "inherit" }}
            {...register("searchID", { pattern: /^[A-Za-z]+$/i })}
          />
          <FormErrorMessage>
            {errors.searchID && "英字で入力してください"}
          </FormErrorMessage>
        </FormControl>
        <Button colorScheme="green" type="submit">
          検索
        </Button>
      </form>
      {/* エラーメッセージ */}
      {userNotFound && <div>該当するユーザーが見つかりません。</div>}
    </ChakraProvider>
  );
}

export default App;

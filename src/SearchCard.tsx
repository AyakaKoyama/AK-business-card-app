import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "./utils/supabaseFunctions";

export type Inputs = {
  searchID: string;
};

export const SearchCard: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userNotFound, setUserNotFound] = useState(false);

  // 検索ボタンがクリックされたときの処理
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { searchID } = data;
    const userID = await getAllUsers(searchID);
    if (!userID) {
      setUserNotFound(true);
      return;
    } else {
      setUserNotFound(false);
      navigate(`/${searchID}`);
      console.log(userID);
    }
    console.log(userNotFound);
  };
  const OnClickRegister = () => {
    navigate("/cards/register");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading data-testid="title">ユーザー検索</Heading>
      <FormControl isInvalid={!!errors.searchID}>
        <FormLabel mt={5}>ログインID</FormLabel>
        <Input
          data-testid="login-id"
          placeholder=""
          color="green"
          _placeholder={{ color: "inherit" }}
          {...register("searchID", {
            required: "ログインIDの入力は必須です",
          })}
        />
        <FormErrorMessage>
          {errors.searchID && errors.searchID.message}
        </FormErrorMessage>
      </FormControl>
      <Button
        data-testid="search-button"
        colorScheme="green"
        mt={5}
        type="submit"
      >
        検索
      </Button>

      <Button
        data-testid="register-button"
        colorScheme="green"
        color="green"
        variant="outline"
        mt={5}
        ml={2}
        onClick={OnClickRegister}
      >
        新規登録はこちら！
      </Button>
      {/* エラーメッセージ */}
      {userNotFound && (
        <Text color="red">該当するユーザーが見つかりません。</Text>
      )}
    </form>
  );
};

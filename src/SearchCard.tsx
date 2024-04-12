import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export type Inputs = {
  searchID: string;
};

export const SearchCard: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userNotFound, setUserNotFound] = useState(false);

  // 検索ボタンがクリックされたときの処理
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { searchID } = data;
    reset();
    navigate(`/${searchID}`);
  };

  return (
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
      {/* エラーメッセージ */}
      {userNotFound && (
        <Text color="red">該当するユーザーが見つかりません。</Text>
      )}
    </form>
  );
};

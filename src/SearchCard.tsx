import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.searchID} isRequired>
        <FormLabel>ユーザーID</FormLabel>
        <Input
          placeholder=""
          color="green"
          _placeholder={{ color: "inherit" }}
          {...register("searchID", { required: true })}
        />
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

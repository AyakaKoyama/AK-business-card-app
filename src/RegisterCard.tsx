import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { addUserSkills, addUserRecords } from "./utils/supabaseFunctions";
import { User } from "./domain/user";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export type Inputs = {
  loginID: string;
  userName: string;
  description: string;
  favoriteSkillID: string;
  githubId?: string;
  qiitaId?: string;
  xId?: string;
};

export const RegisterCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);

    try {
      const addUserData = await addUserRecords(
        data.loginID,
        data.userName,
        data.description,
        data.githubId,
        data.qiitaId,
        data.xId
      );
      console.log(data.githubId, data.qiitaId, data.xId);

      //スキルIDを追加
      const addUserSkillData = await addUserSkills(
        data.loginID,
        data.favoriteSkillID
      );
      console.log(addUserSkillData);

      setUsers([
        {
          loginID: addUserData.loginID,
          userName: addUserData.userName,
          description: addUserData.description,
          favoriteSkill: addUserSkillData.favoriteSkillID,
          githubId: addUserData.githubId,
          qiitaId: addUserData.qiitaId,
          xId: addUserData.xId,
        },
      ]);
      console.log(users);
      navigate(`/`);
    } catch (error) {
      console.error("Failed to submit form data:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading data-testid="title" color="gray.700">
          新規登録
        </Heading>
        <Box p={3}>
          <FormControl isInvalid={!!errors.loginID}>
            <FormLabel color="#276749">ログインID(英字のみ可)</FormLabel>
            <Input
              data-testid="login-id"
              placeholder=" "
              {...register("loginID", {
                required: "ログインIDの入力は必須です",
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "英字で入力してください",
                },
              })}
            />
            <FormErrorMessage>
              {errors.loginID && errors.loginID.message}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box p={3}>
          <FormControl isInvalid={!!errors.userName}>
            <FormLabel color="#276749">名前</FormLabel>
            <Input
              data-testid="userName"
              placeholder="名前"
              {...register("userName", { required: "名前の入力は必須です" })}
            />
            <FormErrorMessage>
              {errors.userName && errors.userName.message}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box p={3}>
          <FormControl isInvalid={!!errors.description}>
            <FormLabel color="#276749">自己紹介</FormLabel>
            <Input
              data-testid="description"
              placeholder="htmlタグも使えます"
              {...register("description", {
                required: "自己紹介の入力は必須です",
              })}
            />
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box p={3}>
          <FormControl isInvalid={!!errors.favoriteSkillID}>
            <FormLabel color="#276749">好きな技術</FormLabel>
            <Select
              data-testid="skill"
              placeholder="技術を選択"
              {...register("favoriteSkillID", { required: "選択は必須です" })}
            >
              <option value="1">React</option>
              <option value="2">typeScript</option>
              <option value="3">Github</option>
            </Select>
            {errors.favoriteSkillID && (
              <FormErrorMessage>
                {errors.favoriteSkillID && errors.favoriteSkillID.message}
              </FormErrorMessage>
            )}
          </FormControl>
        </Box>
        <Box p={3}>
          <FormControl variant="floating" id="github-id">
            <FormLabel color="#276749">Github ID</FormLabel>
            <Input
              data-testid="github-id"
              placeholder="Github ID"
              {...register("githubId")}
            />
          </FormControl>
        </Box>
        <Box p={3}>
          <FormControl variant="floating" id="qiita-id">
            <FormLabel color="#276749">Qiita ID</FormLabel>
            <Input
              data-testid="qiita-id"
              placeholder="Qiita ID"
              {...register("qiitaId")}
            />
          </FormControl>
        </Box>
        <Box p={3}>
          <FormControl variant="floating" id="x-id">
            <FormLabel color="#276749">X ID</FormLabel>
            <Input data-testid="x-id" placeholder="X ID" {...register("xId")} />
          </FormControl>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Button
            data-testid="register-button"
            type="submit"
            colorScheme="green"
            variant="outline"
          >
            新規登録
          </Button>
        </Box>
      </form>
    </>
  );
};

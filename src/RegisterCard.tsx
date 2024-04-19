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
        <Heading data-testid="title">新規登録</Heading>
        <Box p={3}>
          <FormControl isInvalid={!!errors.loginID} isRequired>
            <FormLabel>好きな英単語</FormLabel>
            <Input
              data-testid="login-id"
              placeholder=" "
              {...register("loginID", { pattern: /^[A-Za-z]+$/i })}
            />
            <FormErrorMessage>
              {errors.loginID && "英字で入力してください"}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box p={3}>
          <FormControl isInvalid={!!errors.userName} isRequired>
            <FormLabel>名前</FormLabel>
            <Input
              data-testid="userName"
              placeholder="名前"
              {...register("userName", { required: true })}
            />
            <FormErrorMessage>
              {errors.userName && "名前の入力は必須です"}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box p={3}>
          <FormControl isInvalid={!!errors.description} isRequired>
            <FormLabel>自己紹介</FormLabel>
            <Input
              data-testid="description"
              placeholder="htmlタグも使えます"
              {...register("description", { required: true })}
            />
            <FormErrorMessage>
              {errors.description && "自己紹介の入力は必須です"}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box p={3}>
          <FormControl isInvalid={!!errors.favoriteSkillID} isRequired>
            <FormLabel>好きな技術</FormLabel>
            <Select
              data-testid="skill"
              placeholder="好きな技術"
              {...register("favoriteSkillID", { required: true })}
            >
              <option value="1">React</option>
              <option value="2">typeScript</option>
              <option value="3">Github</option>
            </Select>
            {errors.favoriteSkillID && (
              <FormErrorMessage>選択は必須です</FormErrorMessage>
            )}
          </FormControl>
        </Box>
        <Box p={3}>
          <FormControl
            variant="floating"
            id="github-id"
            isInvalid={!!errors.githubId}
          >
            <FormLabel>Github ID</FormLabel>
            <Input placeholder="Github ID" {...register("githubId")} />
          </FormControl>
        </Box>
        <Box p={3}>
          <FormControl
            variant="floating"
            id="qiita-id"
            isInvalid={!!errors.qiitaId}
          >
            <FormLabel>Qiita ID</FormLabel>
            <Input placeholder="Qiita ID" {...register("qiitaId")} />
          </FormControl>
        </Box>
        <Box p={3}>
          <FormControl variant="floating" id="x-id" isInvalid={!!errors.xId}>
            <FormLabel>X ID</FormLabel>
            <Input placeholder="X ID" {...register("xId")} />
          </FormControl>
        </Box>
        <Button data-testid="register-button" type="submit" colorScheme="green">
          新規登録
        </Button>
      </form>
    </>
  );
};

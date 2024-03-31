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
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { addUserSkills, addUsers } from "./utils/supabaseFunctions";
import { User } from "./domain/user";

export type Inputs = {
  loginID: string;
  name: string;
  introduction: string;
  favoriteSkill: string;
  githubId?: string;
  qiitaId?: string;
  xId?: string;
};

export const EditCard = ({
  setUsers,
}: {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const favoriteSkillRef = useRef<HTMLSelectElement>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    try {
      const addUserData = await addUsers();
      const addUserSkillData = await addUserSkills();
      setUsers([
        {
          id: addUserData.loginID,
          name: addUserData.name,
          description: addUserData.introduction,
          skills: addUserSkillData.favoriteSkill,
          github_id: addUserData.githubId,
          qiita_id: addUserData.qiitaId,
          x_id: addUserData.xId,
        },
      ]);
      console.log(addUserData);
      console.log(addUserSkillData);
    } catch (error) {
      console.error("Failed to submit form data:", error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading>新規登録</Heading>
        <Box p={3}>
          <FormControl isInvalid={!!errors.loginID} isRequired>
            <FormLabel>好きな英単語</FormLabel>
            <Input
              placeholder=" "
              {...register("loginID", { pattern: /^[A-Za-z]+$/i })}
            />
            <FormErrorMessage>
              {errors.loginID && "英字で入力してください"}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box p={3}>
          <FormControl isInvalid={!!errors.name} isRequired>
            <FormLabel>名前</FormLabel>
            <Input
              placeholder="名前"
              {...register("name", { required: true })}
            />
            <FormErrorMessage>
              {errors.name && "名前の入力は必須です"}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box p={3}>
          <FormControl isInvalid={!!errors.introduction} isRequired>
            <FormLabel>自己紹介</FormLabel>
            <Input
              placeholder="htmlタグも使えます"
              {...register("introduction", { required: true })}
            />
            <FormErrorMessage>
              {errors.introduction && "自己紹介の入力は必須です"}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Box p={3}>
          <FormControl isInvalid={!!errors.favoriteSkill} isRequired>
            <FormLabel>好きな技術</FormLabel>
            <Select
              placeholder="好きな技術"
              name="favoriteSkill"
              ref={favoriteSkillRef}
            >
              <option value="option1">React</option>
              <option value="option2">typeScript</option>
              <option value="option3">Github</option>
            </Select>
            {errors.favoriteSkill && (
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
            <Input placeholder="Github ID" />
          </FormControl>
        </Box>
        <Box p={3}>
          <FormControl
            variant="floating"
            id="qiita-id"
            isInvalid={!!errors.qiitaId}
          >
            <FormLabel>Qiita ID</FormLabel>
            <Input placeholder="Qiita ID" />
          </FormControl>
        </Box>
        <Box p={3}>
          <FormControl variant="floating" id="x-id" isInvalid={!!errors.xId}>
            <FormLabel>X ID</FormLabel>
            <Input placeholder="X ID" />
          </FormControl>
        </Box>
        <Button type="submit" colorScheme="green">
          新規登録
        </Button>
      </form>
    </>
  );
};

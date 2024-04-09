import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";

export type Inputs = {
  searchID: string;
};

export interface SearchCardProps {
  onSubmit: SubmitHandler<Inputs>;
}

export const SearchCard: React.FC<SearchCardProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

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
    </form>
  );
};

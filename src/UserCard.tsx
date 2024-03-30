import {
  Box,
  CardBody,
  CardHeader,
  Heading,
  Spinner,
  Stack,
  StackDivider,
  Text,
  Card,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUsersWithSkills } from "./utils/supabaseFunctions";

interface User {
  id: string;
  name: string;
  description: string;
  skills: { id: number; name: string }[];
  github_id: string;
  qiita_id: string;
  x_id: string;
}

export const UserCard = () => {
  const { id } = useParams();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      // idが文字列であることを確認
      if (typeof id === "string") {
        const usersWithSkills = await getUsersWithSkills();
        console.log(usersWithSkills);
        // 結果がnullまたは空の配列での場合
        if (!usersWithSkills || usersWithSkills.length === 0) {
          setUsers([]);
          setLoading(false);
          return;
        }
        // 結果が配列の配列である場合は、フラット化する
        const flattenedUsers = usersWithSkills.flat();
        // 次に、null値をフィルタリングする
        const validUsers = flattenedUsers.filter((user) => user !== null);
        // 最後に、フィルタリングされた配列をusersに割り当てる
        console.log(validUsers);
        setUsers(validUsers as User[]);
        setLoading(false);
      } else {
        // idが定義されていないか、文字列でない場合の処理
        setUsers([]);
        setLoading(false);
      }
    };
    getUsers();
  }, [id]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        users.map((user) => (
          <div key={user.id}>
            <Card>
              <CardHeader>
                <Heading size="md">{user.name}</Heading>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      自己紹介
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: user.description,
                        }}
                      />
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      スキル
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {user.skills.flat().map((skill) => (
                        <span key={id}>{skill.name}</span>
                      ))}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      <Link to="https://github.com/AyakaKoyama">Github ID</Link>
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {user.github_id}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      <Link to="https://qiita.com/AK_React">Qiita Id</Link>
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {user.qiita_id}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      <Link to="https://twitter.com/AK_React">X ID</Link>
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {user.x_id}
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </div>
        ))
      )}
    </>
  );
};

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
import { User } from "./domain/user";

interface UserCardProps {
  users: User[];
}

export const UserCard: React.FC<UserCardProps> = ({ users }) => {
  const { loginID } = useParams<{ loginID: string }>();
  const [loading, setLoading] = useState(false);
  const [filteredUser, setFilteredUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // loginIDが一致するユーザーをフィルタリング
        const filteredUser = users.find((user) => user.loginID === loginID);
        if (!filteredUser) {
          setFilteredUser(null);
          return;
        }
        console.log(filteredUser);
        setFilteredUser(filteredUser);

        // idが文字列であることを確認
        if (typeof loginID === "string") {
          const usersWithSkills = await getUsersWithSkills();
          console.log(usersWithSkills);
          // 結果がnullまたは空の配列での場合
          if (!usersWithSkills || usersWithSkills.length === 0) {
            setLoading(false);
            return;
          }
          // 結果が配列の配列である場合は、フラット化する
          const flattenedUsers = usersWithSkills.flat();
          // 次に、null値をフィルタリングする
          const validUsers = flattenedUsers.filter((user) => user !== null);
          // 最後に、フィルタリングされた配列をusersに割り当てる
          console.log(validUsers);
          setLoading(false);
        } else {
          // idが定義されていないか、文字列でない場合の処理
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };

    fetchData(); // データ取得関数を呼び出し
  }, [loginID, users]);

  return (
    <>
      <div key={filteredUser?.loginID}>
        {loading ? (
          <Spinner />
        ) : filteredUser ? (
          <div key={filteredUser.loginID}>
            <Card>
              <CardHeader>
                <Heading size="md">{filteredUser.userName}</Heading>
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
                          __html: filteredUser.description,
                        }}
                      />
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      スキル
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {filteredUser.favoriteSkill &&
                        Array.isArray(filteredUser.favoriteSkill) &&
                        filteredUser.favoriteSkill
                          .flat()
                          .map((skill) => (
                            <span key={skill.id}>{skill.name}</span>
                          ))}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      <Link to={`https://github.com/${filteredUser.githubId}`}>
                        Github ID
                      </Link>
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {filteredUser.githubId}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      <Link to={`https://qiita.com/${filteredUser.qiitaId}`}>
                        Qiita Id
                      </Link>
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {filteredUser.qiitaId}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      <Link to={`https://twitter.com/${filteredUser.xId}`}>
                        X ID
                      </Link>
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {filteredUser.xId}
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </div>
        ) : (
          <div>該当するユーザーが見つかりません。</div>
        )}
      </div>
    </>
  );
};

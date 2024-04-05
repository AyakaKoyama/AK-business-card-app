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
import { getAllUsers } from "./utils/supabaseFunctions";
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
      if (!loginID) {
        return;
      }
      setLoading(true);

      try {
        const userData = await getAllUsers(loginID);
        const user = new User(
          userData.id,
          userData.name,
          userData.description,
          [],
          userData.github_id,
          userData.qiita_id,
          userData.x_id
        );
        console.log(user);
        setFilteredUser(user);
        setLoading(false);
      } catch (error) {
        console.error("Failed to get user data:", error);
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

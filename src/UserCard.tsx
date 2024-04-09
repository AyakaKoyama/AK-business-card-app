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
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllUsers, getUserSkills } from "./utils/supabaseFunctions";
import { FavoriteSkill, User } from "./domain/user";

interface UserCardProps {
  users: User[];
  setUserNotFound: (flag: boolean) => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  users,
  setUserNotFound,
}) => {
  const { loginID } = useParams<{ loginID: string }>();
  const [loading, setLoading] = useState(false);
  const [filteredUser, setFilteredUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!loginID) {
        return;
      }
      setLoading(true);

      try {
        const userData = await getAllUsers(loginID);
        //スキル取得
        const skillData = await getUserSkills(loginID);

        if (!userData || !skillData) {
          console.error("Failed to fetch user or skill data");
          return;
        }

        //クラス定義からインスタンスを作成
        const skill = new FavoriteSkill(skillData.id, skillData.name);

        const user = new User(
          userData.id,
          userData.name,
          userData.description,
          skill,
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
        setUserNotFound(true);
      }
    };

    fetchData(); // データ取得関数を呼び出し
  }, [loginID, users, setUserNotFound]);
  console.log(filteredUser);

  const handleBack = () => {
    navigate("/"); // ホーム画面に戻る
  };

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
                      {filteredUser.favoriteSkill
                        ? filteredUser.favoriteSkill.name
                        : "スキルなし"}
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
              <Button onClick={handleBack}>戻る</Button>
            </Card>
          </div>
        ) : (
          <div>該当するユーザーが見つかりません。</div>
        )}
      </div>
    </>
  );
};

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
import { AiFillGithub } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { SiQiita } from "react-icons/si";

export const UserCard: React.FC = () => {
  const { loginID } = useParams<{ loginID: string }>();
  const [loading, setLoading] = useState(false);
  const [filteredUser, setFilteredUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!loginID) {
        return;
      }
      console.log(loginID);
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
      }
    };

    fetchData(); // データ取得関数を呼び出し
  }, [loginID]);
  //テスト時null
  console.log(filteredUser);

  const handleBack = () => {
    navigate("/");
  };

  //filteredUserでユーザー情報の有無を判定
  return (
    <>
      <div key={filteredUser?.loginID}>
        {loading ? (
          <Spinner />
        ) : filteredUser ? (
          <div key={filteredUser.loginID}>
            <Card>
              <CardHeader>
                <Heading data-testid="userName" size="md">
                  {filteredUser.userName}
                </Heading>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      自己紹介
                    </Heading>
                    <Text data-testid="description" pt="2" fontSize="sm">
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
                    <Text data-testid="skill" pt="2" fontSize="sm">
                      {filteredUser.favoriteSkill
                        ? filteredUser.favoriteSkill.name
                        : "スキルなし"}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      <Link to={`https://github.com/${filteredUser.githubId}`}>
                        <AiFillGithub data-testid="github-icon" />
                      </Link>
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {filteredUser.githubId}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      <Link to={`https://qiita.com/${filteredUser.qiitaId}`}>
                        <SiQiita data-testid="qiita-icon" />
                      </Link>
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {filteredUser.qiitaId}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      <Link to={`https://twitter.com/${filteredUser.xId}`}>
                        <FaSquareXTwitter data-testid="x-icon" />
                      </Link>
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {filteredUser.xId}
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
              <Button data-testid="back-button" onClick={handleBack}>
                戻る
              </Button>
            </Card>
          </div>
        ) : (
          <Text color="red">該当するユーザーが見つかりません。</Text>
        )}
      </div>
    </>
  );
};

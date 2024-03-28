import { ChakraProvider, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
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

//ルーティングのパラメータ表示
export function Card() {
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
    <ChakraProvider>
      {loading ? (
        <Spinner />
      ) : (
        users.map((user) => (
          <div key={user.id}>
            <h2>名前:{user.name}</h2>
            <p>自己紹介:{user.description}</p>
            <p>スキル:</p>
            <ul>
              {user.skills.flat().map((skill) => (
                <li key={id}>{skill.name}</li>
              ))}
            </ul>
            <p>Github ID:{user.github_id}</p>
            <p>Qiita Id:{user.qiita_id}</p>
            <p>X ID:{user.x_id}</p>
          </div>
        ))
      )}
      <Routes>
        <Route path="/cards/:id" element={<Card />} />
      </Routes>
    </ChakraProvider>
  );
}

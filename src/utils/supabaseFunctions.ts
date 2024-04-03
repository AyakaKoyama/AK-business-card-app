import { supabase } from "./supabase";

export const getAllUsers = async () => {
  const users = await supabase.from("users").select("*");
  return users.data;
};

export const getAllSkills = async () => {
  const skills = await supabase.from("skills").select("*");
  return skills.data;
};
export const getAllUserSkills = async () => {
  const userSkills = await supabase.from("user_skill").select("*");
  return userSkills.data;
};

// ユーザーIDに基づいてユーザーのスキルを取得する関数
export const getUserSkills = async (userId: string) => {
  try {
    console.log(userId);
    // まず、ユーザーIDに基づいてuser_skillテーブルからレコードを検索
    const userSkills = await supabase
      .from("user_skill")
      .select("skill_id")
      .eq("user_id", userId);
    console.log(userSkills);

    // スキル情報を格納する配列を用意
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const skills: any[] = [];

    // 取得したスキル情報をループして配列に追加
    for (const userSkill of userSkills.data || []) {
      const skill = await supabase
        .from("skills")
        .select("name")
        .eq("id", userSkill.skill_id);
      // 取得したスキル情報を配列に追加
      skills.push(skill.data);
    }
    // ネストされた配列をフラット化して返す
    return skills.flat();
  } catch (error) {
    console.error("Failed to get user skills:", error);
    return [];
  }
};

// ユーザー情報とユーザーが持つスキル情報を組み合わせて取得する関数
export const getUsersWithSkills = async () => {
  try {
    // まず、ユーザー情報を取得
    const allUsers = await getAllUsers();
    if (!allUsers) return [];

    // 全てのユーザーのスキル情報を取得し終えるまで待ち、最後にユーザー情報とスキル情報を組み合わせたデータを返す
    const usersWithSkills = await Promise.all(
      allUsers.map(async (user) => {
        const skills = await getUserSkills(user.id);
        return { ...user, skills };
      })
    );
    console.log(usersWithSkills);
    // ユーザー情報とスキル情報を組み合わせたデータを返す
    return usersWithSkills;
  } catch (error) {
    console.error("Failed to get users with skills:", error);
    return [];
  }
};
//ここから下を追加
export async function addUsers(
  id: string,
  name: string,
  description: string,
  github_id?: string,
  qiita_id?: string,
  x_id?: string
) {
  // 未入力の場合、デフォルトの値（空の文字列）に変換する
  const normalizedGithubId = github_id ?? "";
  const normalizedQiitaId = qiita_id ?? "";
  const normalizedXId = x_id ?? "";

  const response = await supabase
    .from("users")
    .insert([
      {
        id,
        name,
        description,
        github_id: normalizedGithubId,
        qiita_id: normalizedQiitaId,
        x_id: normalizedXId,
      },
    ])
    .select();
  if (response.data !== null) {
    return response.data[0];
  }
}

export async function addUserSkills(skill_id: string) {
  const response = await supabase
    .from("user_skill")
    .insert([{ skill_id }])
    .select();
  console.log(response);
  if (response.data !== null) {
    return response.data[0];
  }
}

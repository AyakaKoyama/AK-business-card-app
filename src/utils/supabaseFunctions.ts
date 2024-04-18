import { supabase } from "./supabase";

export const getAllUsers = async (id: string) => {
  const users = await supabase.from("users").select("*").eq("id", id).single();
  console.log(users.data);
  return users.data;
};

// ユーザーIDに基づいてユーザーのスキルを取得する関数
export const getUserSkills = async (userId: string) => {
  try {
    console.log(userId);
    // まず、ユーザーIDに基づいてuser_skillテーブルからレコードを検索
    const userSkills = await supabase
      .from("user_skill")
      .select("skill_id")
      .eq("user_id", userId)
      .single();

    console.log(userSkills);

    if (userSkills.error || !userSkills.data) {
      console.error("Failed to get user skills:", userSkills.error);
      return;
    }

    const skill = await supabase
      .from("skills")
      .select("*")
      .eq("id", userSkills.data.skill_id)
      .single();
    console.log(skill);
    return skill.data;
  } catch (error) {
    console.error("Failed to get user skills:", error);
  }
};

export const addUserRecords = async (
  id: string,
  name: string,
  description: string,
  github_id?: string,
  qiita_id?: string,
  x_id?: string
) => {
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
};

export const addUserSkills = async (user_id: string, skill_id: string) => {
  try {
    //取得したfavoriteSkillIDをuser_skillテーブルに追加
    const userSkills = await supabase
      .from("user_skill")
      .insert([{ user_id, skill_id }])
      .select();
    console.log(userSkills);

    if (userSkills.error || !userSkills.data) {
      console.error("Failed to get user skills:", userSkills.error);
      return;
    }

    //user_skillテーブルに追加したskill_idを元にskillsテーブルからスキル情報を取得
    const skill = await supabase
      .from("skills")
      .select("*")
      .eq("id", skill_id)
      .single();
    console.log(skill);

    return skill.data;
  } catch (error) {
    console.error("Failed to insert user skills:", error);
  }
};

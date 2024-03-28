//import { supabase } from "../utils/supabase"
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
  // まず、ユーザーIDに基づいてuser_skillテーブルからレコードを検索
  const userSkills = await supabase
    .from("user_skill")
    .select("skill_id")
    .eq("user_id", userId);
  console.log(userSkills);

  // 次に、取得したスキルIDを使用してskillsテーブルからスキル情報を検索
  const skills = await Promise.all(
    userSkills.data
      ? userSkills.data.map(async (userSkill) => {
          const skill = await supabase
            .from("skills")
            .select("*")
            .eq("id", userSkill.skill_id);
          console.log(skill);
          return skill.data;
        })
      : []
  );

  return skills;
};

// ユーザー情報とスキル情報を組み合わせる関数
export const getUsersWithSkills = async () => {
  const allUsers = await getAllUsers();
  const usersWithSkills = await Promise.all(
    allUsers
      ? allUsers.map(async (user) => {
          const skills = await getUserSkills(user.id);
          return { ...user, skills };
        })
      : []
  );
  return usersWithSkills;
};

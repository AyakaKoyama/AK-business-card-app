import { supabase } from "../src/utils/supabase";

async function deleteUserData() {
  // 現在の日付を取得
  const currentDate = new Date();
  // 前日の日付を計算
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);

  // 日付をUTC形式に変換
  // const yesterdayUTC = yesterday.toISOString();
  // console.log("yesterdayUTC:", yesterdayUTC);

  // 削除するユーザー情報の条件を指定
  const userDeleteResult = await supabase
    .from("users")
    .delete()
    // ここに削除条件を追加する
    .gte("created_at", yesterday)
    .lte("created_at", currentDate);
  console.log("yesterday:", yesterday);
  console.log("currentDate:", currentDate);

  // 削除した行数をログに出力
  console.log("Deleted user data:", userDeleteResult);

  // 削除するスキル情報の条件を指定
  const skillDeleteResult = await supabase
    .from("user_skill")
    .delete()
    // ここに削除条件を追加する
    .gte("created_at", yesterday)
    .lte("created_at", currentDate);

  // 削除した行数をログに出力
  console.log("Deleted skill data:", skillDeleteResult);
}

// メインの処理を実行
deleteUserData()
  .then(() => console.log("Deletion complete!"))
  .catch((error) => console.error("Deletion failed:", error));

import { supabase } from "../src/utils/supabase";

async function deleteUserData() {
  // 昨日の0:00のUTC
  const startedYesterday = new Date();
  startedYesterday.setDate(startedYesterday.getDate() - 1);
  startedYesterday.setUTCHours(0, 0, 0, 0);

  // 昨日の23:59:59のUTC
  const endedYesterday = new Date();
  endedYesterday.setDate(endedYesterday.getDate() - 1);
  endedYesterday.setUTCHours(23, 59, 59, 999);

  // 削除するユーザー情報の条件を指定
  const userDeleteResult = await supabase
    .from("users")
    .delete()
    // ここに削除条件を追加する
    .gte("created_at", startedYesterday.toISOString())
    .lte("created_at", endedYesterday.toISOString());
  console.log("startedYesterday:", startedYesterday);
  console.log("endedYesterday:", endedYesterday);

  // 削除した行数をログに出力
  console.log("Deleted user data:", userDeleteResult);

  // 削除するスキル情報の条件を指定
  const skillDeleteResult = await supabase
    .from("user_skill")
    .delete()
    // ここに削除条件を追加する
    .gte("created_at", startedYesterday.toISOString())
    .lte("created_at", endedYesterday.toISOString());

  // 削除した行数をログに出力
  console.log("Deleted skill data:", skillDeleteResult);
}

// メインの処理を実行
deleteUserData()
  .then(() => console.log("Deletion complete!"))
  .catch((error) => console.error("Deletion failed:", error));

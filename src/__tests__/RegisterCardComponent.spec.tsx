import { BrowserRouter } from "react-router-dom";
import { RegisterCard } from "../RegisterCard";
import { render, screen, waitFor } from "@testing-library/react";

jest.mock("../utils/supabaseFunctions", () => {
  // ユーザー登録モック
  const mockAddUsers = jest.fn().mockResolvedValue({
    loginID: "test",
    userName: "Ayaka",
    description: "description",
    favoriteSkillID: "1",
    githubId: "githubId",
    qiitaId: "qiitaId",
    xId: "xId",
  });

  // スキル取得モック
  const mockAddUserSkills = jest
    .fn()
    .mockResolvedValue({ loginID: "test", favoriteSkillID: "1" });

  return {
    addUserRecords: mockAddUsers,
    addUserSkills: (user_id: string, skill_id: string) =>
      mockAddUserSkills(user_id, skill_id),
  };
});

// useNavigateモック
const mockedNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigator,
}));

test("RegisterCardコンポーネントの表示が正しいこと", async () => {
  render(
    <BrowserRouter>
      <RegisterCard />
    </BrowserRouter>
  );

  await waitFor(() => {
    const title = screen.getByTestId("title");
    //タイトル
    expect(title).toBeInTheDocument();
  });
});

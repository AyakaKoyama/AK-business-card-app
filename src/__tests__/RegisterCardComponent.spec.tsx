import { BrowserRouter } from "react-router-dom";
import { RegisterCard } from "../RegisterCard";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

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

  // エラーメッセージ表示
  await waitFor(() => {
    const loginId = screen.getByTestId("login-id");
    const errorMessage = screen.getByText("英字で入力してください");
    expect(loginId).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();

    const userName = screen.getByTestId("userName");
    expect(userName).toBeInTheDocument();
    expect(userName).toHaveTextContent("名前の入力は必須です");

    const description = screen.getByTestId("description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent("自己紹介の入力は必須です");

    const skill = screen.getByTestId("skill");
    expect(skill).toBeInTheDocument();
    expect(skill).toHaveTextContent("選択は必須です");
  });

  // ユーザー登録
  const regeisterButton = screen.getByTestId("register-button");
  fireEvent.click(regeisterButton);

  expect(mockedNavigator).toHaveBeenCalledWith("/");
});

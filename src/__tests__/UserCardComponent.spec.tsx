import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { User } from "../domain/user";
import { BrowserRouter } from "react-router-dom";
import { UserCard } from "../UserCard";

//ユーザー取得モック
const mockgetUsers = jest
  .fn()
  .mockResolvedValue(
    new User(
      "ww",
      "Ayaka",
      "description",
      { id: 1, name: "React" },
      "github",
      "qiita",
      "x"
    )
  );

//スキル取得モック
const mockgetUserSkills = jest.fn().mockResolvedValue({ id: 1, name: "React" });
jest.mock("../utils/supabaseFunctions", () => {
  return {
    getAllUsers: (loginID: string) => mockgetUsers(loginID), // ログインIDを引数に取るように修正
    getUserSkills: (userId: string) => mockgetUserSkills(userId),
  };
});

// useParamsモック
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ loginID: "ww" }),
}));

// Navigatorモック
const mockedNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigator,
}));

test("UserCardコンポーネントの表示が正しいこと", async () => {
  render(
    <BrowserRouter>
      <UserCard />
    </BrowserRouter>
  );

  await waitFor(() => {
    const userName = screen.getByTestId("userName");
    const description = screen.getByTestId("description");
    const skill = screen.getByTestId("skill");
    const githubIcon = screen.getByTestId("github-icon");
    const qiitaIcon = screen.getByTestId("qiita-icon");
    const xIcon = screen.getByTestId("x-icon");
    //ユーザー名
    expect(userName).toBeInTheDocument();
    //自己紹介
    expect(description).toBeInTheDocument();
    //スキル
    expect(skill).toBeInTheDocument();
    //GitHubアイコン
    expect(githubIcon).toBeInTheDocument();
    //Qiitaアイコン
    expect(qiitaIcon).toBeInTheDocument();
    //Twitterアイコン
    expect(xIcon).toBeInTheDocument();
  });
  console.log(mockgetUsers.mock.calls);
});

test("戻るボタンをクリックすると、/に遷移すること", async () => {
  render(
    <BrowserRouter>
      <UserCard />
    </BrowserRouter>
  );

  await waitFor(() => {
    const backButton = screen.getByTestId("back-button");
    // 戻るボタンが存在する場合のみクリックする
    if (backButton) {
      fireEvent.click(backButton);
    }
  });
  console.log(mockedNavigator.mock.calls);
  // 戻るボタンが存在する場合、戻るボタンがクリックされたかを確認
  if (mockgetUsers.mock.calls.length > 0) {
    expect(mockedNavigator).toHaveBeenCalledWith("/");
  }
});

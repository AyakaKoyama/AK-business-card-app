import { BrowserRouter } from "react-router-dom";
import { RegisterCard } from "../RegisterCard";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

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

// スキル登録モック
const mockAddUserSkills = jest
  .fn()
  .mockResolvedValue({ loginID: "test", favoriteSkillID: "1" });

jest.mock("../utils/supabaseFunctions", () => {
  return {
    addUserRecords: () => mockAddUsers(),
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

test("タイトルが表示されること", async () => {
  render(
    <BrowserRouter>
      <RegisterCard />
    </BrowserRouter>
  );

  await waitFor(() => {
    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
  });
});

test("ログインIDが未入力の場合にエラーメッセージが表示されること", async () => {
  render(<RegisterCard />);

  // 新規登録ボタンをクリック
  const registerButton = screen.getByTestId("register-button");
  fireEvent.click(registerButton);

  // エラーメッセージが表示されるのを待機
  await waitFor(() => {
    // エラーメッセージが表示されていることを確認
    const errorMessage = screen.queryByText("ログインIDの入力は必須です");
    expect(errorMessage).toBeInTheDocument();
  });
});

test("名前が未入力の場合にエラーメッセージが表示されること", async () => {
  render(<RegisterCard />);

  // 新規登録ボタンをクリック
  const registerButton = screen.getByTestId("register-button");
  fireEvent.click(registerButton);

  // エラーメッセージが表示されるのを待機
  await waitFor(() => {
    // エラーメッセージが表示されていることを確認
    const errorMessage = screen.queryByText("名前の入力は必須です");
    expect(errorMessage).toBeInTheDocument();
  });
});

test("自己紹介が未入力の場合にエラーメッセージが表示されること", async () => {
  render(<RegisterCard />);

  // 新規登録ボタンをクリック
  const registerButton = screen.getByTestId("register-button");
  fireEvent.click(registerButton);

  // エラーメッセージが表示されるのを待機
  await waitFor(() => {
    // エラーメッセージが表示されていることを確認
    const errorMessage = screen.queryByText("自己紹介の入力は必須です");
    expect(errorMessage).toBeInTheDocument();
  });
});

test("好きな技術が未選択の場合にエラーメッセージが表示されること", async () => {
  render(<RegisterCard />);

  // 新規登録ボタンをクリック
  const registerButton = screen.getByTestId("register-button");
  fireEvent.click(registerButton);

  // エラーメッセージが表示されるのを待機
  await waitFor(() => {
    // エラーメッセージが表示されていることを確認
    const errorMessage = screen.queryByText("選択は必須です");
    expect(errorMessage).toBeInTheDocument();
  });
});

test("登録ボタン押下後/に遷移すること", async () => {
  render(
    <BrowserRouter>
      <RegisterCard />
    </BrowserRouter>
  );

  await waitFor(() => {
    // ログインIDを入力
    const loginID = screen.getByTestId("login-id");
    fireEvent.change(loginID, { target: { value: "test" } });
    // 名前を入力
    const userName = screen.getByTestId("userName");
    fireEvent.change(userName, { target: { value: "Ayaka" } });
    // 自己紹介を入力
    const description = screen.getByTestId("description");
    fireEvent.change(description, { target: { value: "description" } });
    // 好きな技術を選択
    const favoriteSkillID = screen.getByTestId("skill");
    fireEvent.change(favoriteSkillID, { target: { value: "1" } });

    // 新規登録ボタンをクリック
    const registerButton = screen.getByTestId("register-button");
    fireEvent.click(registerButton);
  });
  console.log(mockAddUsers);
  //  ここでモック関数が呼び出されない
  await waitFor(() => {
    expect(mockAddUsers).toHaveBeenCalled();
    console.log(mockAddUsers.mock.calls);
  });

  expect(mockedNavigator).toHaveBeenCalledWith("/");

  // ログを出力する
  console.log("Navigation complete!");
});

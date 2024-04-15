import { render, screen, waitFor } from "@testing-library/react";
import { User } from "../domain/user";
import { BrowserRouter } from "react-router-dom";
import { UserCard } from "../UserCard";

//モック化
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
jest.mock("../utils/supabaseFunctions", () => {
  return {
    getAllUsers: (loginID: string) => mockgetUsers(loginID), // ログインIDを引数に取るように修正
  };
});
// テスト用のログインIDを返すようにモック化
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ loginID: "ww" }),
}));
test("ユーザー名が表示されていること", async () => {
  //<BrowserRouter>で囲む
  render(
    <BrowserRouter>
      <UserCard />
    </BrowserRouter>
  );
  await waitFor(() => {
    const userName = screen.getByTestId("userName");
    expect(userName).toBeInTheDocument();
  });
});

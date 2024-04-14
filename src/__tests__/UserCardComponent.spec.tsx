import { render, screen, waitFor } from "@testing-library/react";
import { User } from "../domain/user";
import { BrowserRouter } from "react-router-dom";
import { UserCard } from "../UserCard";

//モック化
const mockgetUsers = jest
  .fn()
  .mockResolvedValue(
    new User(
      "1",
      "userName",
      "description",
      { id: 1, name: "React" },
      "github",
      "qiita",
      "x"
    )
  );
jest.mock("../utils/supabaseFunctions", () => {
  return {
    getAllUsers: () => mockgetUsers(),
  };
});
//現在mock情報がnullになってしまう
console.log(mockgetUsers);
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

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SearchCard } from "../SearchCard";

// useNavigate＆useParamsモック
const mockedNavigator = jest.fn();
const mockeduseParams = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigator,
  useParams: () => mockeduseParams,
}));

test("タイトルが表示されること", async () => {
  render(
    <BrowserRouter>
      <SearchCard />
    </BrowserRouter>
  );

  await waitFor(() => {
    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
  });
});

test("検索ボタン押下後/cards/:idに遷移すること", async () => {
  // useParamsのモックを設定
  mockeduseParams.mockReturnValue({ loginID: "test" });

  render(
    <BrowserRouter>
      <SearchCard />
    </BrowserRouter>
  );

  await waitFor(() => {
    // ログインIDを入力
    const loginID = screen.getByTestId("login-id");
    fireEvent.change(loginID, { target: { value: "test" } });

    // ログインIDの入力後の状態を出力
    console.log("Login ID entered:", (loginID as HTMLInputElement).value);

    // 検索ボタンをクリック
    const searchButton = screen.getByTestId("search-button");
    fireEvent.click(searchButton);
  });
  await waitFor(() => {
    expect(mockedNavigator).toHaveBeenCalledWith("/test");
  });

  // ログを出力する
  console.log("Navigation complete!");
});

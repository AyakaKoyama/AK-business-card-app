import { render, screen } from "@testing-library/react";
import { SearchCard } from "../SearchCard";

describe("title", () => {
  it("should render title", () => {
    render(<SearchCard />);
    expect(screen.getByText("ユーザー情報")).toBeInTheDocument();
  });
});

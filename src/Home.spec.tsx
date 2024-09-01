import { render, screen, waitFor } from "@testing-library/react";
// import { user } from "@testing-library/user-event";
import Home from "./Home";
import axios from "axios";

jest.mock("axios");

// test.skip("test table view", () => {
//   render(<Home />);
//   let tableRow = screen.getAllByRole("row");
//   expect(tableRow).toHaveLength(6);
//   let table = screen.getByRole("table");
//   let tableHeadRow = table.querySelector("thead tr");
//   expect(tableHeadRow).toBeInTheDocument();
//   let tableHeadCells = tableHeadRow?.querySelectorAll("th");
//   expect(tableHeadCells).toHaveLength(8);
// });

describe("CourseComponent", () => {
  it("fetches and displays courses", async () => {
    const mockData = [
      { id: 1, name: "Course 1" },
      { id: 2, name: "Course 2" },
      { id: 3, name: "Course 3" },
      { id: 4, name: "Course 4" },
      { id: 5, name: "Course 5" },
      { id: 6, name: "Course 6" },
    ];

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: mockData,
    });

    render(<Home />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    // Check if the courses are rendered
    mockData.forEach((course) => {
      expect(screen.getByText(course.name)).toBeInTheDocument();
    });
  });
});

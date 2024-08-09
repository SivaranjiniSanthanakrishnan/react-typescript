import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { Course, CourseProcess } from "./types/Course";
import Paginate from "./Pagination";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const [course, setCourse] = useState<Course[]>([]);
  const [paginationData, setPaginationData] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemPerPage, setItemPerPage] = useState(10);

  let endIndex = currentPage * itemPerPage;
  let startIndex = endIndex - itemPerPage;
  let endPage =
    course.length % itemPerPage === 0
      ? course.length / itemPerPage
      : Math.floor(course.length / itemPerPage + 1);

  const paginate = (currentPage: number): void => {
    if (currentPage >= 1 && currentPage <= endPage) {
      endIndex =
        currentPage * itemPerPage > course.length
          ? course.length
          : currentPage * itemPerPage;
      startIndex = (currentPage - 1) * itemPerPage;
      setCurrentPage(currentPage);
      setPaginationData(course.slice(startIndex, endIndex));
    }
  };
  const setItem = (itemsPerPage: number): void => {
    setItemPerPage(itemsPerPage);
  };

  useEffect(() => {
    (async function () {
      let { data } = await axios.get<Course[]>(
        "https://61fcdb8ff62e220017ce41c1.mockapi.io/courses"
      );
      setCourse(new CourseProcess(data).getCourse);
      let paginatedData = data.slice(startIndex, endIndex);
      setPaginationData(new CourseProcess(paginatedData).getCourse);
    })();
  }, []);

  useEffect(() => {
    console.log(itemPerPage, endIndex, startIndex);
    paginate(currentPage);
  }, [itemPerPage]);

  return (
    <Box sx={{ flexGrow: 1 }} padding={7}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2>User Data</h2>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Id</b>
                    </TableCell>
                    <TableCell>
                      <b>Name</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Gender</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Company</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Email</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Phone</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Age</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Date</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginationData.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}>
                      <TableCell align="right">{row.id}</TableCell>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.gender}</TableCell>
                      <TableCell align="right">{row.company}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.phone}</TableCell>
                      <TableCell align="right">{row.age}</TableCell>
                      <TableCell align="right">{row.mixedDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Item>
        </Grid>{" "}
        <br />
      </Grid>
      <Paginate
        paginate={paginate}
        currentPage={currentPage}
        endPage={endPage}
        setItem={setItem}
      />
    </Box>
  );
}

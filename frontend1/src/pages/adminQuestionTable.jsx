import React, { useState, useEffect } from "react";
import ResponsiveAppBar from "../components/AppBar";
import QuestionModal from "../components/questionModal";
import CategoryModal from "../components/categoryModal";
import { Box, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

function AdminQuestions() {
  const [question, setQuestion] = useState([]);

  const questionShow = () => {
    try {
      axios.get("/api/admin/getQuestion").then((res) => {
        // console.log(res.data.data);
        setQuestion(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    questionShow();
  }, []);

  return (
    <div>
      <ResponsiveAppBar />
      <QuestionModal />
      <CategoryModal/>
      <Typography
        variant="h4"
        component="h6"
        textAlign="center"
        fontFamily="egoe UI"
        fontWeight={"bold"}
        mt={5}
        mb={5}
      >
        Questions
      </Typography>

      <Box sx={{ paddingLeft: 10, paddingRight: 10, marginBottom: 20 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow sx={{ border: "2px solid black" }}>
                <TableCell style={{fontWeight:"bold"}}>No</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Question</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Choices</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Answer</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Category</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {question.map((data, i) => {
                return (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      height: 70,
                      border: "1px solid black",
                    }}
                  >
                    <TableCell component="th" scope="row">
                      1
                    </TableCell>
                    <TableCell>{data.question}</TableCell>
                    <TableCell>
                      <ol type="A">
                        <li>{data.option1}</li>
                        <li>{data.option2}</li>
                        <li>{data.option3}</li>
                        <li>None of the above</li>
                      </ol>
                    </TableCell>
                    <TableCell>{data.answer}</TableCell>
                    <TableCell>{data.category}</TableCell>
                    <TableCell>{data.type}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default AdminQuestions;

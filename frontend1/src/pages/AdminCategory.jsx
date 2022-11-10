import React, { useState, useEffect } from 'react'
import ResponsiveAppBar from "../components/AppBar";
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

function AdminCategory() {

    const [category, setCategory] = useState([])

    const categoryShow = () => {
        try {
          axios.get("/api/admin/getCategory").then((res) => {
            // console.log(res.data.data);
            setCategory(res.data.data);
          });
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        categoryShow();
      }, [categoryShow]);

  return (
    <div>
      <ResponsiveAppBar />
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
        Category
      </Typography>

      <Box sx={{ paddingLeft: 10, paddingRight: 10, marginBottom: 20 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow sx={{ border: "2px solid black" }}>
                <TableCell style={{fontWeight:"bold"}}>No</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Category</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {category.map((data, i) => {
                return (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      height: 70,
                      border: "1px solid black",
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {i+1}
                    </TableCell>
                    <TableCell>{data.category}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  )
}

export default AdminCategory
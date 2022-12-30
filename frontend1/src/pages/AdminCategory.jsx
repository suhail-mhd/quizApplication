import React, { useState, useEffect } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const styleOne = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const styleTwo = {
  position: "relative",
  backgroundColor: "#001253",
  color: "#f4f4f4",
  borderTopRightRadius: "10px",
  borderTopLeftRadius: "10px",
  padding: "50px",
  textAlign: "center",
  marginTop: "-2rem",
  width: 364,
  marginLeft: "-2rem",
};

function AdminCategory() {
  const [category, setCategory] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [render, setRender] = useState(false);
  const [getCategory, setGetCategory] = useState("");
  const [updateId, setUpdateId] = useState();
  const [id, setId] = useState();

  // delete category handle
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // edit modal handle
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenEdit = () => setOpenModal(true);
  const handleCloseEdit = () => setOpenModal(false);

  const categoryShow = () => {
    try {
      axios.get("/api/admin/getCategory").then((res) => {
        setCategory(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const dltCat = (id) => {
    console.log(id);
    setDeleteId(id);
    handleOpen();
  };

  //deleting data
  const DeleteCategory = async () => {
    try {
      await axios.post("/api/admin/deleteCategory", {
        deleteId,
      });

      handleClose();
      setRender(true);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  // edit data

  const getCategoryDetails = async (id) => {
    setUpdateId(id);
    handleOpenEdit();
    try {
      await axios.get(`/api/admin/getAllCategoryDetails/${id}`).then((res) => {
        setId(res.data._id);
        setGetCategory(res.data.category);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const formSubmit = async () => {
    try {
      await axios
        .patch("/api/admin/updateCategory", {
          id,
          getCategory,
        })
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    categoryShow();
  }, [categoryShow, render, getCategory]);

  return (
    <div>
      <ResponsiveAppBar />
      <CategoryModal />
      {/* delete Modal start */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            textAlign="center"
            variant="h6"
            component="h2"
          >
            Are You Sure Want to Delete
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: 20,
            }}
          >
            <div>
              <Button
                variant="contained"
                onClick={DeleteCategory}
                style={{ backgroundColor: "red" }}
              >
                Yes
              </Button>
            </div>
            <div>
              <Button variant="contained" onClick={handleClose}>
                NO
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {/* delete modal end */}
      {/* edit modal start */}
      <Modal
        open={openModal}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleOne}>
          <form onSubmit={formSubmit} encType="multipart/form-data">
            <Box>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                style={styleTwo}
              >
                Update Field
              </Typography>

              <Grid container>
                <Grid item md={6} xs={12} lg={6} marginTop={2}>
                  <br />
                  <TextField
                    variant="standard"
                    label="Category"
                    placeholder="Edit Category"
                    type="text"
                    name="category"
                    value={getCategory}
                    onChange={(e) => setGetCategory(e.target.value)}
                    style={{ marginLeft: "3rem" }}
                  />
                </Grid>
              </Grid>

              <div style={{ justifyContent: "end", display: "flex" }}>
                <Button variant="contained" type="Submit">
                  Submit
                </Button>
              </div>
            </Box>
          </form>
        </Box>
      </Modal>
      {/* edit modal end */}
      <Typography
        variant="h4"
        component="h6"
        textAlign="center"
        fontFamily="egoe UI"
        fontWeight={"bold"}
        mt={5}
        mb={5}
      >
        - Category -
      </Typography>

      <Box sx={{ paddingLeft: 10, paddingRight: 10, marginBottom: 20 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow sx={{ border: "2px solid black" }}>
                <TableCell style={{ fontWeight: "bold" }}>No</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Category</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
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
                      {i + 1}
                    </TableCell>
                    <TableCell>{data.category}</TableCell>
                    <TableCell>
                      <EditOutlinedIcon
                        onClick={() => getCategoryDetails(`${data?._id}`)}
                        style={{ color: "blue", cursor: "pointer" }}
                      />
                    </TableCell>
                    <TableCell>
                      <DeleteIcon
                        onClick={() => dltCat(`${data?._id}`)}
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </TableCell>
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

export default AdminCategory;

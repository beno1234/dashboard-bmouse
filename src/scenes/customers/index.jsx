import React, { useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { Blog } from "data/mockdata";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const Customers = () => {
  const theme = useTheme();
  const [rows, setRows] = useState(Blog);
  const navigate = useNavigate();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "title",
      headerName: "Titulo da noticia",
      flex: 0.5,
    },
    {
      field: "conteudo",
      headerName: "Conteudo do blog",
      flex: 1,
    },
    {
      field: "data",
      headerName: "Data da postagem",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "image",
      headerName: "Imagem",
      flex: 0.4,
    },
    {
      field: "Edit",
      headerName: "Editar",
      renderCell: (params) => (
        <Button sx={{ color: theme.palette.grey[100] }} onClick={Edit}>
          <EditIcon />
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Deletar",
      renderCell: (params) => (
        <Button
          sx={{ color: theme.palette.grey[100] }}
          onClick={() => {
            const updatedRows = rows.filter((row) => row.id !== params.row.id);
            setRows(updatedRows);
          }}
        >
          <DeleteIcon />
        </Button>
      ),
    },
  ];

  const Edit = () => {
    navigate("/editar");
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Todas as noticias" subtitle="Deseja editar ou excluir ?" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default Customers;

'use client'

import React, { useEffect, useState } from "react";
import { Path } from "@/assessts/components/path";
import style from "@styles/may-in.module.scss"
import { fetch_printer } from "@/assessts/function/fetch";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { DataGrid } from '@mui/x-data-grid';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Hidden, TextField, Typography } from '@mui/material';
import PrintTwoToneIcon from '@mui/icons-material/PrintTwoTone';
import Link from "next/link";

//@ts-ignore
function Content({ printer }) {
  console.log(printer);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: 7,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'background.paper',
          maxWidth: 400,
          margin: 'auto',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'grey', width: 75, height: 75, textAlign: 'center' }}>
          <PrintTwoToneIcon fontSize="large" />
        </Avatar>

        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 2, fontSize: '1.5rem' }}>
          Thông Tin Máy In
        </Typography>

        {/* Hiển thị các thông tin của máy in */}
        <Typography variant="body1" sx={{ mb: 1, fontSize: '1.5rem' }}>
          <strong>Thương hiệu:</strong> {printer.brand}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1, fontSize: '1.5rem' }}>
          <strong>Model:</strong> {printer.model}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1, fontSize: '1.5rem' }}>
          <strong>Mô tả:</strong> {printer.description}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1, fontSize: '1.5rem' }}>
          <strong>Vị trí:</strong> {printer.location}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1, fontSize: '1.5rem' }}>
          <strong>Giá:</strong> {printer.price} VNĐ
        </Typography>
        <Typography variant="body1" sx={{ mb: 1, fontSize: '1.5rem' }}>
          <strong>Trạng thái:</strong> {printer.status}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1, fontSize: '1.5rem' }}>
          <strong>Giảm giá:</strong> {printer.discountpercent}%
        </Typography>
        <Typography variant="body1" sx={{ mb: 1, fontSize: '1.5rem' }}>
          <strong>Cơ sở:</strong> {printer.cs}
        </Typography>
      </Box>
    </>
  );
}


export default function () {
  const router = useRouter();
  const [printerData, setPrinterData] = useState([])

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState('');

  const handleOpenDialog = (row: string) => {
    setSelectedRow(row);
    setOpenDialog(true);
  };

  // Đóng Dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    // setSelectedRow('');
  };

  const columns = [
    
    { field: "cs", headerName: "Cơ sở", width: 60, sortable: false },
    { field: "brand", headerName: "Thương hiệu", width: 100, sortable: false },
    { field: "model", headerName: "Model", width: 130, sortable: false },
    // { field: "description", headerName: "Mô tả", width: 300 },
    { field: "location", headerName: "Vị trí", width: 150, sortable: false },
    { field: "price", headerName: "Giá (VNĐ)", width: 100 },
    { field: "discountpercent", headerName: "Giảm giá (%)", width: 100 },
    {
      field: "edit",
      headerName: "Chỉnh sửa",
      width: 300,
      //@ts-ignore
      renderCell: (params) => {
        const handleButton = (type: string, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          event.preventDefault()
          switch (type) {
            case "edit":
              router.push(`/manager/may-in/edit/${params.id}`);
              break;
            case "detail":
              router.push(`/manager/may-in/detail/${params.id}`);
              break;
            case "delete":
              
              break;
            default:
              break;
          }
        }
        return(<div className="">
          <Button onClick={(e) => handleButton("edit", e)} type="button" className="bg-yellow-200 text-black">Chỉnh sửa</Button>
          <Button onClick={(e) => handleButton("detail", e)} type="button" name="detail" className="bg-sky-300 text-black mx-[5px]">Chi tiết</Button>
          <Button onClick={(e) => handleButton("delete", e)} type="button" name="delete" className="bg-red-400 text-black">Xóa</Button>
        </div>)
      },
      sortable: false
    },
    { field: "_id", headerName: "ID", hideable: true },

  ];

  useEffect(() => {
    async function get_printer() {
      const token = Cookies.get('token')
      let printer
      try {
        //@ts-ignore
        const result = await fetch_printer(token);
        printer = result['listPrinter']
      } catch (e) {
        //@ts-ignore
        console.log("Lỗi: ", e);

        window.location.href = "/login"
      }

      console.log(printer)
      setPrinterData(printer)
    }

    get_printer();
    // const intervalId = setInterval(() => {
    //     get_printer();
    // }, 5000);

    // return () => clearInterval(intervalId);
  }, [])

  return (
    <>
      <div className={style.layout}>
        <div className="flex justify-end mb-[10px]">
          <Link href={"/manager/may-in/add"} className="text-[20px] px-[20px] py-[10px] bg-green-400 rounded-[12px]">Thêm mới</Link>
        </div>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <Content printer={
            //@ts-ignore
            printerData.find(printer => printer._id == selectedRow)}
          />
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Đóng
            </Button>
          </DialogActions>
        </Dialog>
        <DataGrid
          rows={printerData.map((item) => ({
            //@ts-ignore
            ...item,
            //@ts-ignore
            id: item._id,
          }))}
          columnVisibilityModel={{
            _id: false
          }}
          columns={columns}
          //@ts-ignore
          pageSize={3}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          loading={printerData.length === 0}
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "#F1F0E8",
            overflow: "hidden",
            "& .MuiDataGrid-columnHeaders": {
              // backgroundColor: "#00796b", 
              // color: "#0a638f", 
              fontSize: "1.4rem",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-cell": {
              // backgroundColor: "#8ddde9",
              fontSize: "1.4rem",
            },
            "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
              display: "none",
            },
            "& .MuiDataGrid-root": {
              overflowX: "hidden",
            },
          }}
        />
      </div>
    </>
  )
}
'use client'

import React, { useEffect, useState } from "react";
import { Path } from "@/assessts/components/path";
import style from "@styles/may-in.module.scss"
import { fetch_file_list, fetch_printer, print_file } from "@/assessts/function/fetch";
import Cookies from 'js-cookie';
import {redirect, useRouter } from "next/navigation";
import { DataGrid } from '@mui/x-data-grid';
import { Alert, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Hidden, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextField, Typography } from '@mui/material';
import PrintTwoToneIcon from '@mui/icons-material/PrintTwoTone';
import PrintIcon from '@mui/icons-material/Print';

//@ts-ignore
function Content({printer, setOpen, handleCloseDialog}) {
  const [file, setFile] = useState([])
  const [selectFile, setSelectFile] = useState('')

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function foo() {
      const token = Cookies.get('token')
      let file

      if(token)
        file = await fetch_file_list(token)

      setFile(file['files'])
    }

    foo()
  }, [])

  const onFetching = async () => {
    const token = Cookies.get('token')
    const printer_id = printer['_id'];
    const file_id = selectFile;
    let msg

    console.log("printer_id: ", printer_id);
    

    setLoading(true)

    if(token)
      msg = await print_file(token, printer_id, file_id);
    else
      redirect("/")

    setLoading(false)

    //@ts-ignore
    setOpen(msg['msg'])
    // handleCloseDialog()
  }

  if(file)
    return (
      <>
          <FormControl fullWidth disabled={loading}
            sx={{
              mt:2
            }}
          >
            <InputLabel id="demo-simple-select-label">File</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //@ts-ignore
              value={selectFile ?? ''}
              label="File"
              onChange={(event: SelectChangeEvent) => {
                console.log(selectFile);
              
                setSelectFile(event.target.value);
              }}
            >
              {
                file.map((item, index) => (
                  //@ts-ignore
                  <MenuItem value={item._id} key={item._id}>{item.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>

          <Button
            variant="contained"
            disabled={loading}
            onClick={onFetching}
            sx={{
              mt: 2
            }}
          >Xác Nhận In File Này</Button>
      </>
    );

  else
    return (
        <>
          Danh sách file trống
        </>
    )
}


export default function() {
    const router = useRouter();
    const [printerData, setPrinterData ] = useState([])

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState('');

    const handleOpenDialog = (row:string) => {
        setSelectedRow(row);
        setOpenDialog(true);
      };
    
      // Đóng Dialog
      const handleCloseDialog = () => {
        setOpenDialog(false);
        // setSelectedRow('');
      };

    const columns = [
          { field: "status",
            headerName: "",
            width: 90,
            //@ts-ignore
            renderCell: (params) => {
              if (params.value === "active") {
                return <button 
                    style=
                    {{ 
                        backgroundColor: 'green', 
                        color: 'white', 
                        border: 'none', 
                        padding: '5px 20px', 
                        borderRadius: '5px', 
                        cursor: 'pointer'}
                    }
                    onClick={() => handleOpenDialog(params.row._id)}
                    >
                      <PrintIcon />
                </button>;
              }
              return <button style={{ backgroundColor: 'gray', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Inactive</button>;
            },
            sortable: false
        },
        { field: "cs", headerName: "Cơ sở", width: 60, sortable: false },
        { field: "brand", headerName: "Thương hiệu", width: 100, sortable: false },
        { field: "description", headerName: "Mô Tả", width: 320,  sortable: false},
        { field: "location", headerName: "Vị Trí", width: 190, sortable: false },
        { field: "type", headerName: "Loại giấy", width: 100 },
        { field: "_id", headerName: "ID", hideable: true},
    ];

    useEffect(() => {
        async function get_printer() {
            const token = Cookies.get('token')
            let printer
            try {
                //@ts-ignore
                const result = await fetch_printer(token);
                printer = result['listPrinter']
            } catch(e) {
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

    const [open, setOpen] = useState('');

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen('');
    };

    return (
        <>
            <div className={style.layout}>
              <Snackbar
                  open={open.length !== 0}
                  autoHideDuration={1000}
                  onClose={() => setOpen('')}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  sx={{
                      marginTop: "10px", 
                  }}
              >
                  <Alert
                      onClose={handleClose}
                      severity="info"
                      sx={{
                          backgroundColor: "#f1f1f1", 
                          color: "#000", 
                          fontSize: "1.4rem", 
                          border: "3px solid #ccc", 
                          borderRadius: "8px", 
                          padding: "10px 20px", 
                          fontWeight: "bold"
                      }}
                  >
                      {open}
                  </Alert>
              </Snackbar>
              <Dialog open={openDialog} onClose={handleCloseDialog}>
                  <DialogTitle>Chọn File để In</DialogTitle>
                  <DialogContent>
                    <Content printer={
                      //@ts-ignore
                      printerData.find(printer  => printer._id == selectedRow)}
                      setOpen={setOpen}
                      handleCloseDialog={handleCloseDialog}
                    />
                  </DialogContent>
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
                          _id : false
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
                          background: 'linear-gradient(135deg, #fff, #F1F0E8)', 
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
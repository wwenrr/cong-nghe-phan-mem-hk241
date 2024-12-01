'use client'

import React, { useEffect, useState } from "react";
import { Path } from "@/assessts/components/path";
import style from "@styles/may-in.module.scss"
import { change_printer_props, create_function, delete_printer, fetch_printer, get_printer } from "@/assessts/function/fetch";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { DataGrid } from '@mui/x-data-grid';
import { Alert, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Hidden, InputLabel, MenuItem, Snackbar, TextField, Typography } from '@mui/material';
import PrintTwoToneIcon from '@mui/icons-material/PrintTwoTone';
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Select, { SelectChangeEvent } from '@mui/material/Select';

function AddPrinter({setOpen}:any) {
    const [openDialog, setOpenDialog] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false)

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        description: "",
        location: "",
        status: "active", 
        type: "A4", 
        deleted: false, 
        cs: 1, 
    });

    const handleSubmit = async () => {
        setLoading(true);
        
        const token = Cookies.get('token')

        try {
            //@ts-ignore
            const result = await create_function(token, formData)

            console.log(result);

            setOpen("Thêm Máy In Thành Công")
        } catch(e) {
            setOpen("Thêm Máy In Thất Bại")
        }

        setLoading(false);
        setOpenDialog(false);
      };

    //@ts-ignore
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    return (
    <>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Thêm Máy In</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Thương hiệu"
            name="brand"
            fullWidth
            value={formData.brand}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Model"
            name="model"
            fullWidth
            value={formData.model}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Mô tả"
            name="description"
            fullWidth
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Vị trí"
            name="location"
            fullWidth
            value={formData.location}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Trạng thái"
            name="status"
            fullWidth
            value={formData.status}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Loại giấy"
            name="type"
            fullWidth
            value={formData.type}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={loading}
          >
            {loading ? "Đang tải lên..." : "Tải lên"}
          </Button>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        variant="contained"
        color="success"
        onClick={() => setOpenDialog(true)}
        sx={{ fontSize: "1.1rem" }}
      >
        Thêm Máy In
      </Button>
    </>
  );
}

function EditPrinter({printer_id, setOpen}: any) {
    const [loading, setLoading] = useState(false)
    const [openDialog, setOpenDialog] = useState(false);
    const [select, setSelect] = useState('')
    const [textFieldValue, setTextFieldValue] = useState('');

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Chọn 1 Thuộc Tính Cần Chỉnh Sửa</DialogTitle>

                <DialogContent>
                <FormControl fullWidth
                    sx={{
                        mt:2
                    }}
                    disabled={loading}
                >
                    <InputLabel id="demo-simple-select-label">Thuộc Tính</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={select}
                    label="Thuộc tính"
                    onChange={(event: SelectChangeEvent) => {
                        setSelect(event.target.value as string)
                    }}
                    >
                        <MenuItem value={'brand'}>Thương Hiệu</MenuItem>
                        <MenuItem value={"description"}>Mô Tả</MenuItem>
                        <MenuItem value={"location"}>Vị Trí</MenuItem>
                        <MenuItem value={"status"}>Trạng Thái</MenuItem>
                        <MenuItem value={"type"}>Loại giấy</MenuItem>
                        <MenuItem value={"cs"}>Cơ Sở</MenuItem>
                    </Select>
                </FormControl>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {
                            select && 
                            <TextField sx = {{
                                mt: 2
                            }} 
                                disabled={loading}
                                value={textFieldValue}
                                onChange={(event) => setTextFieldValue(event.target.value)}
                            />
                        }
                        {
                            textFieldValue &&
                            <Button variant="contained"
                                sx = {{
                                    mt: 2
                                }}
                                disabled={loading}
                                onClick={async () => {
                                    setLoading(true)
                                    try {
                                        const token = Cookies.get('token')
                                        let res

                                        if(token)
                                            res = await change_printer_props(token, 
                                                {
                                                    'label': select,
                                                    'data': textFieldValue
                                                },
                                                printer_id
                                            )
                                        else throw new Error("Không tìm thấy token")

                                        console.log(res);
                                        setOpen("Cập Nhật Máy In Thành Công")
                                    } catch(e) {
                                        setOpen("Cập Nhật Máy In Thất Bại")
                                    }
                                    setLoading(false)
                                }}
                            >Xác nhận chỉnh sửa</Button>
                        }
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="secondary">
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
            <button 
                style= {{ 
                    backgroundColor: 'blue', 
                    color: 'white', 
                    border: 'none', 
                    padding: '5px 20px', 
                    borderRadius: '5px', 
                    cursor: 'pointer',
                    marginLeft: '5px'
                }}
                onClick={() => {
                    handleOpenDialog()
                }}
                >
                    <EditIcon />
            </button>
        </>
    )
}

export default function () {
    const [printer, setPrinter] = useState(null)

    async function foo() {
        const token = Cookies.get('token')

        //@ts-ignore
        const account = await get_printer(token)

        setPrinter(account['printer'])
    }

    useEffect(() => {
        foo()
    }, [])

    const columns = [
        { field: "status",
          headerName: "",
          width: 140,
          //@ts-ignore
          renderCell: (params) => {
            return (
                <>
                    <button 
                        style=
                        {{ 
                            backgroundColor: 'green', 
                            color: 'white', 
                            border: 'none', 
                            padding: '5px 20px', 
                            borderRadius: '5px', 
                            cursor: 'pointer',
                        }
                        }
                        onClick={async () => {
                            try {
                                const token = Cookies.get('token')

                                const isConfirmed = window.confirm("Xác nhận xóa máy in?");
                                if (!isConfirmed) {
                                    setOpen("Hủy thao tác xóa");
                                    return; // Dừng nếu người dùng không xác nhận
                                }

                                //@ts-ignore
                                const res = await delete_printer(token, params.row._id)

                                console.log(res);

                                setOpen("Xóa máy in thành công")
                            } catch(e) {
                                setOpen("Xóa máy in thất bại")
                            }
                        }}
                        >
                        <DeleteIcon />
                    </button>

                    <EditPrinter printer_id={params.row._id} setOpen={setOpen}/>
                </>
            )
          },
          sortable: false
      },
      { field: "cs", headerName: "Cơ sở", width: 60, sortable: false },
      { field: "brand", headerName: "Thương hiệu", width: 100, sortable: false },
      { field: "description", headerName: "Mô Tả", width: 270,  sortable: false},
      { field: "location", headerName: "Vị Trí", width: 190, sortable: false },
      { field: "type", headerName: "Loại giấy", width: 100 },
      { field: "_id", headerName: "ID", hideable: true},
  ];

    const [open, setOpen] = useState('');

    useEffect(() => {
        foo()
    }, [open])

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen('');
    };

    if(printer)
        return (
            <>  
                <Snackbar
                    open={open.length !== 0}
                    autoHideDuration={1000}
                    onClose={() => setOpen('')}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    sx={{
                        marginTop: "100px", 
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
                <AddPrinter setOpen={setOpen}/>
                <div className={style.layout}> 
                    
                    <DataGrid
                        rows={
                            //@ts-ignore
                            printer.map((item) => ({
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
                        loading={
                            //@ts-ignore
                            printer.length === 0
                        }
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
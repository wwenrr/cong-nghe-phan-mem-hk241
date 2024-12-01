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
            <FormControl fullWidth
                sx={{
                    mt:2
                }}
                disabled={loading}
            >
                <InputLabel id="paper-type">thương hiệu</InputLabel>
                <Select
                labelId="paper-type"
                id="demo-simple-select"
                value={formData.brand}
                label="Thuộc tính"
                onChange={handleChange}
                name="brand"
                >
                    <MenuItem value={'Canon'}>Canon</MenuItem>
                    <MenuItem value={'HP'}>HP </MenuItem>
                    <MenuItem value={'Epson'}>Epson</MenuItem>
                    <MenuItem value={'Brother'}>Brother</MenuItem>
                    <MenuItem value={'Lexmark'}>Lexmark</MenuItem>
                    <MenuItem value={'Ricoh'}>Ricoh</MenuItem>
                    <MenuItem value={'Xerox'}>Xerox</MenuItem>
                    <MenuItem value={'Samsung'}>Samsung</MenuItem>
                </Select>
            </FormControl>
                
          <TextField
            margin="dense"
            label="Mô tả"
            name="description"
            fullWidth
            value={formData.description}
            onChange={handleChange}
          />

                <FormControl fullWidth
                        sx={{
                            mt:2
                        }}
                        disabled={loading}
                    >
                        <InputLabel id="paper-type">chọn sơ sở</InputLabel>
                        <Select
                        labelId="paper-type"
                        id="demo-simple-select"
                        value={formData.cs}
                        label="Thuộc tính"
                        name="cs"
                        onChange={handleChange}
                        >
                            <MenuItem value={'1'}>1</MenuItem>
                            <MenuItem value={'2'}>2</MenuItem>
                        </Select>
                    </FormControl>

            <FormControl fullWidth
                sx={{
                    mt:2
                }}
                disabled={loading}
            >
                <InputLabel id="paper-type">chọn vị trí</InputLabel>
                <Select
                labelId="paper-type"
                id="demo-simple-select"
                value={formData.location}
                label="Thuộc tính"
                onChange={handleChange}
                name="location"
                >
                    <MenuItem value={'Thư viện'}>Thư viện</MenuItem>
                    <MenuItem value={'Khu vực hành lang khoa'}>Khu vực hành lang khoa</MenuItem>
                    <MenuItem value={'Phòng hội trường'}>Phòng hội trường </MenuItem>
                    <MenuItem value={'Khu vực ký túc xá sinh viên'}>Khu vực ký túc xá sinh viên</MenuItem>
                    <MenuItem value={'Phòng sinh hoạt chung'}>Phòng sinh hoạt chung</MenuItem>
                    <MenuItem value={'Quầy dịch vụ sinh viên'}>Quầy dịch vụ sinh viên</MenuItem>
                    <MenuItem value={'Phòng máy tính công cộng'}>Phòng máy tính công cộng</MenuItem>
                    <MenuItem value={'Sảnh chính của trường'}>Sảnh chính của trường</MenuItem>
                    <MenuItem value={'Phòng học nhóm'}>Phòng học nhóm</MenuItem>
                </Select>
            </FormControl>
          <FormControl fullWidth
                sx={{
                    mt:2
                }}
                disabled={loading}
            >
                <InputLabel id="paper-type">trạng thái</InputLabel>
                <Select
                labelId="paper-type"
                id="demo-simple-select"
                value={formData.status}
                label="Thuộc tính"
                onChange={handleChange}
                name="status"
                >
                    <MenuItem value={'active'}>active</MenuItem>
                    <MenuItem value={'inactive'}>inactive</MenuItem>
                </Select>
            </FormControl>
          <FormControl fullWidth
                sx={{
                    mt:2
                }}
                disabled={loading}
            >
                <InputLabel id="paper-type">loại giấy</InputLabel>
                <Select
                labelId="paper-type"
                id="demo-simple-select"
                value={formData.type}
                label="Thuộc tính"
                onChange={handleChange}
                name="type"
                >
                    <MenuItem value={'A0'}>A0</MenuItem>
                    <MenuItem value={'A1'}>A1</MenuItem>
                    <MenuItem value={'A2'}>A2</MenuItem>
                    <MenuItem value={'A3'}>A3</MenuItem>
                    <MenuItem value={'A4'}>A4</MenuItem>
                </Select>
            </FormControl>
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

    function EditPrinter() {
        useEffect(() => {
            console.log(select);
        }, [])

        if(select === 'type')
            return(
                <>
                    <FormControl fullWidth
                        disabled={loading}
                        sx={{
                            mt:2
                        }}
                    >
                        <InputLabel id="paper-type">loại giấy</InputLabel>
                        <Select
                        labelId="paper-type"
                        id="demo-simple-select"
                        value={textFieldValue}
                        label="Thuộc tính"
                        onChange={(event: SelectChangeEvent) => {
                            setTextFieldValue(event.target.value as string)
                        }}
                        >
                            <MenuItem value={'A0'}>A0</MenuItem>
                            <MenuItem value={'A1'}>A1</MenuItem>
                            <MenuItem value={'A2'}>A2</MenuItem>
                            <MenuItem value={'A3'}>A3</MenuItem>
                            <MenuItem value={'A4'}>A4</MenuItem>
                        </Select>
                    </FormControl>
                </>
            )

        if(select === 'brand')
            return(
                <>
                    <FormControl fullWidth
                        disabled={loading}
                        sx={{
                            mt:2
                        }}
                    >
                        <InputLabel id="paper-type">thương hiệu</InputLabel>
                        <Select
                        labelId="paper-type"
                        id="demo-simple-select"
                        value={textFieldValue}
                        label="Thuộc tính"
                        onChange={(event: SelectChangeEvent) => {
                            setTextFieldValue(event.target.value as string)
                        }}
                        >
                            <MenuItem value={'Canon'}>Canon</MenuItem>
                            <MenuItem value={'HP'}>HP </MenuItem>
                            <MenuItem value={'Epson'}>Epson</MenuItem>
                            <MenuItem value={'Brother'}>Brother</MenuItem>
                            <MenuItem value={'Lexmark'}>Lexmark</MenuItem>
                            <MenuItem value={'Ricoh'}>Ricoh</MenuItem>
                            <MenuItem value={'Xerox'}>Xerox</MenuItem>
                            <MenuItem value={'Samsung'}>Samsung</MenuItem>
                        </Select>
                    </FormControl>
                </>
            )

        if(select === 'status')
            return(
                <>
                    <FormControl fullWidth
                        disabled={loading}
                        sx={{
                            mt:2
                        }}
                    >
                        <InputLabel id="paper-type">trạng thái</InputLabel>
                        <Select
                        labelId="paper-type"
                        id="demo-simple-select"
                        value={textFieldValue}
                        label="Thuộc tính"
                        onChange={(event: SelectChangeEvent) => {
                            setTextFieldValue(event.target.value as string)
                        }}
                        >
                            <MenuItem value={'active'}>active</MenuItem>
                            <MenuItem value={'inactive'}>inactive</MenuItem>
                        </Select>
                    </FormControl>
                </>
            )

        if(select === 'cs')
            return(
                <>
                    <FormControl fullWidth
                        disabled={loading}
                        sx={{
                            mt:2
                        }}
                    >
                        <InputLabel id="paper-type">chọn sơ sở</InputLabel>
                        <Select
                        labelId="paper-type"
                        id="demo-simple-select"
                        value={textFieldValue}
                        label="Thuộc tính"
                        onChange={(event: SelectChangeEvent) => {
                            setTextFieldValue(event.target.value as string)
                        }}
                        >
                            <MenuItem value={'1'}>1</MenuItem>
                            <MenuItem value={'2'}>2</MenuItem>
                        </Select>
                    </FormControl>
                </>
            )

        if(select === 'location')
            return(
                <>
                    <FormControl fullWidth
                        disabled={loading}
                        sx={{
                            mt:2
                        }}
                    >
                        <InputLabel id="paper-type">chọn vị trí</InputLabel>
                        <Select
                        labelId="paper-type"
                        id="demo-simple-select"
                        value={textFieldValue}
                        label="Thuộc tính"
                        onChange={(event: SelectChangeEvent) => {
                            setTextFieldValue(event.target.value as string)
                        }}
                        >
                            <MenuItem value={'Thư viện'}>Thư viện</MenuItem>
                            <MenuItem value={'Khu vực hành lang khoa'}>Khu vực hành lang khoa</MenuItem>
                            <MenuItem value={'Phòng hội trường'}>Phòng hội trường </MenuItem>
                            <MenuItem value={'Khu vực ký túc xá sinh viên'}>Khu vực ký túc xá sinh viên</MenuItem>
                            <MenuItem value={'Phòng sinh hoạt chung'}>Phòng sinh hoạt chung</MenuItem>
                            <MenuItem value={'Quầy dịch vụ sinh viên'}>Quầy dịch vụ sinh viên</MenuItem>
                            <MenuItem value={'Phòng máy tính công cộng'}>Phòng máy tính công cộng</MenuItem>
                            <MenuItem value={'Sảnh chính của trường'}>Sảnh chính của trường</MenuItem>
                            <MenuItem value={'Phòng học nhóm'}>Phòng học nhóm</MenuItem>
                        </Select>
                    </FormControl>
                </>
            )

        return (
            <TextField
                disabled={loading}
                margin="dense"
                label="Mô tả"
                name="description"
                fullWidth
                value={textFieldValue}
                onChange={(event) => setTextFieldValue(event.target.value)}
            />
        )
    }

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
                            <EditPrinter />
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

                                        handleCloseDialog()
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
'use client'

import React, { useEffect, useState } from "react";
import { Path } from "@/assessts/components/path";
import style from "@styles/may-in.module.scss"
import Cookies from 'js-cookie';
import { delete_file, fetch_file_list, upload_file } from "@/assessts/function/fetch";
import { redirect } from "next/navigation";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Snackbar, Alert } from "@mui/material";

//@ts-ignore
function Addfile({setOpen, addFile}) {
    const [openDialog, setOpenDialog] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    }

    const handleUpload = async () => {
        if (!file) {
            setOpen("Vui lòng chọn file")
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const token = Cookies.get('token')

        if(token)
            try {
                setLoading(true)
                const file = await upload_file(token, formData);
                addFile()
                console.log(file);
                setOpen(file['msg'])
            } catch(e) {
                //@ts-ignore
                setOpen(e.message)
            }
        else
            redirect("/")

        setFile(null)
        setLoading(false)
        handleCloseDialog()
    }

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Chọn File để Tải Lên</DialogTitle>
                <DialogContent>
                    <input
                        disabled={loading}
                        type="file"
                        onChange={handleFileChange}
                        accept="application/pdf" 
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpload} color="primary" disabled={loading}>
                        {loading ? 'Đang tải lên...' : 'Tải lên'}
                    </Button>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
            <Button
                variant="contained"
                color="success"
                onClick={() => setOpenDialog(true)}
                sx={{ fontSize: '1.1rem' }}
            >
                Thêm File
            </Button>
        </>
    )
}

export default function() {
    const [fileList, setFile] = useState([])
    const [open, setOpen] = useState('');

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen('');
    };

    async function getFile() {
        const token = Cookies.get('token')
        let file_list

        if(token)
            file_list = await fetch_file_list(token);
        else
            redirect("/")

        console.log(file_list);
        setFile(file_list['files'])
    }

    
    const columns = [
        { field: "_id",
            headerName: "Hành động",
            width: 190,
            //@ts-ignore
            renderCell: (params) => {
                return (
                    <>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={async () => {
                                try {
                                    const token = Cookies.get('token')
                                    
                                    //@ts-ignore
                                    const del = await delete_file(token, params.row._id)
                                    getFile()

                                    console.log(del);
                                    
                                    setOpen('Xóa file thành công')
                                } catch(e) {
                                    //@ts-ignore
                                    setOpen(e.message)
                                }
                            }}
                            sx={{ fontSize: '1.1rem' }}
                        >
                            Xóa
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            component="a"
                            href={params.row.link}  
                            target="_blank"  
                            sx={{ fontSize: '1.1rem', ml: 2}}
                        >
                            Xem File
                        </Button>
                    </>
                )
              },
            sortable: false
        },
        { field: "link",
            headerName: "Xem file",
            width: 90,
            //@ts-ignore
        },
        { field: "pages", headerName: "Số Trang", width: 90, sortable: true },
        { field: "name", headerName: "Tên File", width: 350, sortable: false },
        { field: "createdAt", headerName: "Ngày Upload", width: 220, sortable: false },
    ];

    useEffect(() => {
        

        getFile();

        const intervalId = setInterval(() => {
            getFile();
        }, 10000);

        return () => clearInterval(intervalId);
    }, [])
    
    return (
        <>
            <Snackbar
                open={open.length !== 0}
                autoHideDuration={1000}
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
            {fileList.length !== 0 && <Addfile setOpen={setOpen} addFile={getFile}/>}
            <DataGrid
                columnVisibilityModel={{
                    link : false
                }}
                rows={fileList.map((item) => ({
                    //@ts-ignore
                    ...item,
                    //@ts-ignore
                    id: item._id, 
                }))}
                columns={columns}
                //@ts-ignore
                pageSize={3}
                rowsPerPageOptions={[5, 10, 20]}
                disableSelectionOnClick
                loading={fileList.length === 0}
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
        </>
    )
}
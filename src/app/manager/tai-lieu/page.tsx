'use client'
import style from "@styles/may-in.module.scss"
import React, { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { get_all_printer } from "@/assessts/function/fetch"
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"

function DialogComp({openDialog, setOpenDialog, link}:any) {
    const [loading, setLoading] = useState(false)

    const handleOpenDialog = () => {
        setOpenDialog(true);
      };
    
      // Đóng Dialog
      const handleCloseDialog = () => {
        setOpenDialog(false);
      };
    return (
        <>
            <Dialog open={openDialog} onClose={handleCloseDialog}
                sx={{
                    padding: 5,
                    overflow: 'hidden',
                    height: '100vh'
                }}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Xem Tài Liệu</DialogTitle>
                <DialogContent sx={{
                    height: 1000,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    alignItems: 'center'
                }}>
                    <iframe 
                        src={`${link}/preview#zoom=50`} 
                        style={{
                            width: '100%', 
                            height: '100%', 
                            border: 'none',
                        }} 
                        allow="autoplay">
                    </iframe>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseDialog} color="secondary">
                    Đóng
                </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default function Page() {
    const [link, setLink] = useState('')
    const [data, setData] = useState(null)
    const [openDialog, setOpenDialog] = useState(false);
    const [open, setOpen] = useState('');
    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen('');
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const columns = [
        { field: "_id",
            headerName: "Xem File",
            width: 120,
            //@ts-ignore
            renderCell: (params) => {
                return (
                    <>
                        <Button
                            variant="outlined"
                            color="primary"
                            component="a"
                            onClick={() => {
                                    setOpenDialog(true)
                                    setLink(params.row.link)
                                }
                            }
                            target="_blank"  
                            sx={{ 
                                fontSize: '1.1rem',
                                width: '2px'
                            }}
                        >
                            <VisibilityIcon />
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
        { field: "createdAt", headerName: "Ngày Upload", width: 200, sortable: false },
        {
            field: "__v",
            headerName: "",
            width: 110,
            sortable: false,
            //@ts-ignore
            renderCell: (params) => {
                return (
                    <>
                        <Button
                            variant="text"
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
                            sx={{ fontSize: '1.1rem', width: 5}}
                        >
                            <CloseIcon />
                        </Button>
                    </>
                )
            }
        }
    ];

    async function getFile() {
        const token = Cookies.get('token')

        let data

        if(token)
            data = await get_all_printer(token);

        setData(data['files'])
    }

    useEffect(() => {
        getFile();

        const intervalId = setInterval(() => {
            getFile();
        }, 10000);

        return () => clearInterval(intervalId);
    }, [])

    if(data)
        return(
            <>  
                <DialogComp  openDialog={openDialog} setOpenDialog={setOpenDialog} link={link}/>
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

                <div className={style.layout}>
                <DataGrid
                    columnVisibilityModel={{
                        link : false
                    }}
                    rows={
                        //@ts-ignore
                        data.map((item) => ({
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
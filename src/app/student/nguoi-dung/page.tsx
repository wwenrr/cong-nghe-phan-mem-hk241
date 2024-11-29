'use client'

import React, { useEffect, useState } from "react";
import { Path } from "@/assessts/components/path";
import Cookies from 'js-cookie';
import { redirect } from "next/navigation";
import { buy_paper, get_history, get_wallet } from "@/assessts/function/fetch";
import style from "@styles/nguoi-dung.module.scss"
import { Button, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Alert, Avatar, Box, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Hidden, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextField, Typography } from '@mui/material';

function Price() {
    const [selectedPrice, setSelectedPrice] = useState(10000);
    const [anchorEl, setAnchorEl] = useState(null);
    const [img, setImg] = useState('10000')

    const prices = [10000, 20000, 30000, 50000, 70000, 100000];

    useEffect(() => {
        console.log(selectedPrice);
        setImg(`/img/${selectedPrice}.png`)
    }, [selectedPrice])

    //@ts-ignore
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    //@ts-ignore
    const handleSelectPrice = (price) => {
        setSelectedPrice(price);
        handleClose(); 
    };

    const open = Boolean(anchorEl);
    const id = open ? 'price-dropdown-popover' : undefined;

    return (
        <>
            <div>
            {/* Nút để mở dropdown */}
            <Button aria-describedby={id} variant="outlined" onClick={handleClick}>
                {
                //@ts-ignore
                `${selectedPrice.toLocaleString()} VND` 
                }
            </Button>
            
            {/* Popover dropdown */}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
            >
                {/* Table bên trong Popover */}
                <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>Giá trị</TableCell>
                        <TableCell>VND</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {prices.map((price) => (
                        <TableRow key={price} onClick={() => handleSelectPrice(price)}>
                        <TableCell>{price.toLocaleString()}</TableCell>
                        <TableCell>VND</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </Popover>
            </div>

            <img src={img} alt="" />
        </>
      );
}

export default function() {
    const [wallet, setWallet] = useState(null)
    const [history, setHistory] = useState(null)
    const [selectedId, setSelectedId] = useState("");
    let price = [10000, 20000, 30000, 50000, 70000, 100000]

    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
      };
    
      // Đóng Dialog
      const handleCloseDialog = () => {
        setOpenDialog(false);
      };

    //@ts-ignore
    const handleChange = (event) => {
        setSelectedId(event.target.value);
    };
    
    useEffect(() => {
        async function foo() {
            const token = Cookies.get('token')

            try {
                //@ts-ignore
                const wallet = await get_wallet(token)
                //@ts-ignore
                const history = await get_history(token)

                console.log("history: ",history['historys']);
                
                setWallet(wallet['ewallet'])
                setHistory(history['historys'])
            } catch(err) {
                redirect("/")
            }
        }

        foo();

        const interval = setInterval(() => {
            foo()
        }, 5000);

        return () => clearInterval(interval);
    }, [])

    const [pageNumber, setPageNumber] = useState('');
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState('');

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen('');
    };

    const handlePageNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageNumber(event.target.value);
      };

    const handleBuying = async () => {
        const token = Cookies.get('token')
        let result

        setLoading(true)

        console.log(parseInt(pageNumber, 10));

        if(token)
            result = await buy_paper(token, parseInt(pageNumber, 10))
        else 
            redirect('/')

        console.log(result);
        setLoading(false)
        setOpen(result['msg'] ?? "Fail to fetch")
        handleCloseDialog()
    }

    return(
        <>
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
                <DialogTitle>Chọn Số Trang In Để Mua</DialogTitle>
                <DialogContent>
                    <TextField
                        disabled={loading}
                        sx={{
                            mt:2
                        }}
                        label="Số Trang"
                        type="number" // Đảm bảo nhập số
                        value={pageNumber}
                        onChange={handlePageNumberChange}
                        fullWidth
                    />

                    <Button 
                        disabled={loading}
                        variant="outlined"
                        onClick={() => handleBuying()}
                        sx={{
                            mt:2,
                        }}
                    >Mua</Button>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseDialog} color="secondary">
                    Đóng
                </Button>
                </DialogActions>
            </Dialog>
            {price && wallet && <div className={style.layout}>
                <div className={style.outside_box}>
                    <h1>Số Dư Hiện Tại:</h1>

                    <span>{
                        //@ts-ignore
                        wallet['balance'].toLocaleString('vi-VN')}
                        <span>vnđ</span>
                    </span>

                    <h1>Số Trang In Còn Lại: {wallet['balancePaper']}</h1>

                    <Button variant="contained"
                        onClick={() => handleOpenDialog()}
                        sx={{
                            mt: 2
                        }}
                    >Mua Thêm Giấy In</Button>
                </div>

                <div className={style.sec_box}>
                    <div className={style.history}>
                        <h1>Lịch Sử Thanh Toán</h1>
                        <div className={style.content}>
                            {history && <Box p={3}>
                                <Select
                                    value={selectedId}
                                    onChange={handleChange}
                                    displayEmpty
                                    fullWidth
                                    variant="outlined"
                                    sx={{
                                        backgroundColor: "#E1D7C6", 
                                        "& .MuiOutlinedInput-root": {
                                            backgroundColor: "#f4f6ff", 
                                        },
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>Chọn một mục</em>
                                    </MenuItem>
                                    {   
                                        //@ts-ignore
                                        history.map((item) => (
                                            <MenuItem key={item._id} value={item._id}>
                                                {item.location} - {item.price} VND
                                            </MenuItem>
                                        ))
                                    }
                                </Select>

                                {selectedId && (
                                    <Box mt={3}>
                                            <h1>Chi tiết giao dịch:</h1>
                                            {
                                            history                                       
                                                //@ts-ignore
                                                .filter((item) => item._id === selectedId)
                                                //@ts-ignore
                                                .map((item) => (
                                                    <Box key={item._id}>
                                                        <Typography>Vị trí: {item.location}</Typography>
                                                        <Typography>Giá: {item.price} VND</Typography>
                                                        <Typography>Trạng thái: {item.status}</Typography>
                                                        <Typography>
                                                            Đường dẫn: {item.linkPath}
                                                        </Typography>
                                                        <Typography>Số trang: {item.pages}</Typography>
                                                        <Typography>Tổng cộng: {item.totle} VND</Typography>
                                                    </Box>
                                                ))}
                                        </Box>
                                    )}
                                </Box>}
                        </div>
                    </div>

                    <div className={style.donate}>
                        <h1>Nạp Tiền</h1>

                        <div className={style.content}>
                            <Price />
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}
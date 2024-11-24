'use client'

import React, { useEffect, useState } from "react";
import { Path } from "@/assessts/components/path";
import Cookies from 'js-cookie';
import { redirect } from "next/navigation";
import { get_history, get_wallet } from "@/assessts/function/fetch";
import style from "@styles/nguoi-dung.module.scss"
import { Select, MenuItem, Typography, Box } from "@mui/material";
import { Button, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

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

    return(
        <>
            {price && wallet && <div className={style.layout}>
                <div className={style.outside_box}>
                    <h1>Số Dư Hiện Tại:</h1>

                    <span>{
                        //@ts-ignore
                        wallet['balance'].toLocaleString('vi-VN')}
                        <span>vnđ</span>
                    </span>
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
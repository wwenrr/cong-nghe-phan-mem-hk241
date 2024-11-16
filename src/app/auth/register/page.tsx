'use client'

import React, {useEffect, useRef, useState} from "react";
import Link from "next/link";
import {Box, Button, Container, TextField, Typography, Avatar, Alert, CircularProgress} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import {fetch_otp_api, fetch_register_api} from "@/assessts/function/fetch";
import ArrowBackIosNewIcon  from '@mui/icons-material/ArrowBack'
import { useRouter } from "next/navigation";
import Router from "next/router";
import Cookies from 'js-cookie';

// @ts-ignore
function OtpSend({err, setErr, OtpSent, setOtpSent, email, setEmail}) {
    
    const [loading, setLoading] = useState(false);

    const handleEmailChange = (e:any) => {
        e.preventDefault();
        setEmail(e.target.value);
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        // const emailPattern = /^[a-zA-Z0-9._%+-]+@hcmut\.edu\.vn$/;
        if (1) {
            setErr('')

            try {
                setLoading(true);
                const msg = await fetch_otp_api(email);
                setOtpSent(true);
            } catch (error) {
                // @ts-ignore
                setErr(error.message);
            }

            setLoading(false);
        } else {
            setErr("Định dạng email không hợp lệ");
            setOtpSent(false);
        }
    }

    return (
        <Box component="form"
                sx={{
                    mt: 4,
                    display: 'flex',
                    alignItems: 'center',
                }}>


            <TextField id="outlined-basicwerv"
                        label="Email"
                        variant="standard"
                        required
                        sx={{
                            '& .MuiInputBase-root': {
                                fontSize: '1.5rem',
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '1.5rem',
                            },
                            '& .MuiInputBase-root.Mui-disabled': {
                                backgroundColor: '#f0f0f0',
                            },
                            width: 200,
                        }}
                        error={err.length > 0}
                        value={email}
                        onChange={handleEmailChange}
                        disabled={OtpSent || loading}

            />
            {loading ?
                <Button variant="contained"
                        sx = {{
                            ml: 2,
                            fontSize: '1.3rem',
                            height: 40,
                            marginTop: 1.5
                        }} disabled = {OtpSent || loading}
                        onClick={handleSubmit} type="submit"
                ><CircularProgress size={24} color="inherit" /></Button>
                :
                <Button variant="contained"
                        sx = {{
                            ml: 2,
                            fontSize: '1.3rem',
                            height: 40,
                            marginTop: 1.5
                        }} disabled = {OtpSent}
                        onClick={handleSubmit} type="submit"
                >{OtpSent ? "Đã gửi OTP" : "Gửi OTP"}</Button>
            }
        </Box>
    )
}

// @ts-ignore
function Register({err, setErr, OtpSent, setOtpSent, email}) {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const otpRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [formSent, setFormSent] = useState(false)

    // @ts-ignore
    const handleSubmit = async (e) => {
        // @ts-ignore
        e.preventDefault();
        setErr('')

        const formData = {
            email: usernameRef.current?.value || '',
            password: passwordRef.current?.value || '',
            phone: phoneRef.current?.value || '',
            otp: otpRef.current?.value || '',
        };

        try {
            setLoading(true)
            setFormSent(true)
            const response = await fetch_register_api(formData);

            Cookies.set('token', response['token'], { expires: 1 });
            window.location.href = '/student';
        } catch(error) {
            // @ts-ignore
            setErr(error.message);
        }

        setFormSent(false)
        setLoading(false)
    }

    const handleBackClick = () => {
        setOtpSent(false)
    }

    return(
        <>  
            <Box component="form"
                sx={{
                    mt: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    width: 370,
                    alignItems: 'center'
                }}>
                    <ArrowBackIosNewIcon 
                        sx={{
                            position: 'absolute',
                            top: 25,        
                            left: 25,       
                            cursor: 'pointer',
                            fontSize: '2rem'
                        }}
                        onClick={handleBackClick} 
                    />
                <TextField id="outlined-basic123"
                            label="Tài Khoản"
                            variant="standard"
                            inputRef={usernameRef}
                            value={email}
                            required
                            // disabled
                            slotProps={{
                                input: {
                                  readOnly: true,
                                },
                              }}
                            sx={{
                                '& .MuiInputBase-root': {
                                    fontSize: '1.5rem',
                                },
                                '& .MuiInputLabel-root': {
                                    fontSize: '1.5rem',
                                },
                                '& .MuiInputBase-root.Mui-disabled': {
                                    backgroundColor: '#f0f0f0',
                                },
                                width: 250
                            }}
                />

                <TextField id="outlined-basicq34"
                            label="Mật Khẩu"
                            variant="standard"
                            type="password"
                            autoComplete="current-password"
                            inputRef={passwordRef}
                            required
                            disabled={loading}
                            sx={{
                                '& .MuiInputBase-root': {
                                    fontSize: '1.5rem',
                                },
                                '& .MuiInputLabel-root': {
                                    fontSize: '1.5rem',
                                },
                                '& .MuiInputBase-root.Mui-disabled': {
                                    backgroundColor: '#f0f0f0',
                                },
                                width: 250,
                                mt: 2
                            }}
                />

                <TextField id="outlined-basicd34"
                            label="Số Điện Thoại"
                            variant="standard"
                            type="number"
                            autoComplete="current-phone"
                            inputRef={phoneRef}
                            required
                            disabled={loading}
                            sx={{
                                '& .MuiInputBase-root': {
                                    fontSize: '1.5rem',
                                },
                                '& .MuiInputLabel-root': {
                                    fontSize: '1.5rem',
                                },
                                '& .MuiInputBase-root.Mui-disabled': {
                                    backgroundColor: '#f0f0f0',
                                },
                                width: 250,
                                mt: 2
                            }}
                />

                <TextField id="outlined-basicd34v"
                            label="Mã OTP"
                            variant="filled"
                            type="text"
                            autoComplete="current-phone"
                            inputRef={otpRef}
                            required
                            disabled={loading}
                            sx={{
                                '& .MuiInputBase-root': {
                                    fontSize: '1.5rem',
                                },
                                '& .MuiInputLabel-root': {
                                    fontSize: '1.5rem',
                                },
                                '& .MuiInputBase-root.Mui-disabled': {
                                    backgroundColor: '#f0f0f0',
                                },
                                width: 250,
                                mt: 2,
                                mb: 3
                            }}
                />

                {loading ?
                    <Button variant="contained"
                            sx = {{
                                ml: 2,
                                fontSize: '1.3rem',
                                height: 40,
                                marginTop: 1.5
                            }} disabled = {formSent || loading}
                            onClick={handleSubmit} type="submit"
                    ><CircularProgress size={24} color="inherit" /></Button>
                    :
                    <Button variant="contained"
                            sx = {{
                                ml: 2,
                                fontSize: '1.3rem',
                                height: 40,
                                marginTop: 1.5
                            }} disabled = {formSent}
                            onClick={handleSubmit} type="submit"
                    >{"Xác nhận"}</Button>
                }
            </Box>
        </>
    )
}

export default function Page() {
    const [err, setErr] = useState('');
    const [OtpSent, setOtpSent] = useState(false);
    const [OtpConfirmed, setOtpConfirmed] = useState(false);
    const [email, setEmail] = useState('khang.tran@hcmut.edu.vn');

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    })

    if(mounted)
        return(
            <>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: OtpSent? 0 : 7,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: 4,
                            borderRadius: 2,
                            boxShadow: 3,
                            backgroundColor: 'background.paper',
                            height: OtpSent ? 580 : 400,
                            justifyContent: 'flex-start',
                            position: 'relative'
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 75, height: 75 }}>
                            <EmailIcon fontSize="large" />
                        </Avatar>

                        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 2, fontSize: '1.5rem' }}>
                            Đăng ký
                        </Typography>

                        {!OtpSent && <OtpSend err={err} setErr={setErr} OtpSent={OtpSent} setOtpSent={setOtpSent} email={email} setEmail={setEmail}/>}

                        {
                            OtpSent && <>
                                <Register err={err} setErr={setErr} OtpSent={OtpSent} setOtpSent={setOtpSent} email={email}/>
                            </>
                        }

                        {!OtpSent && <Typography variant="body2" sx={{
                            marginTop: 3,
                            fontSize: '1.3rem'
                        }}>
                            <Link href="/auth/login">
                                Đã có tài khoản ? Đăng nhập
                            </Link>

                            {/* <Typography sx={{
                                marginTop: 0.5,
                                fontSize: '1.3rem',
                                cursor: 'pointer'
                            }}>
                                Đã gửi Otp ? Tạo tài khoản
                            </Typography> */}
                        </Typography>}

                        {err.length > 0 && <Alert severity="error" color="error"
                                variant="outlined"
                                sx={{
                                    // border: 'none',
                                    marginTop: 3,
                                    // bgcolor: 'background.paper',
                                    fontSize: '1.3rem',
                                }}
                        >
                            {err}
                        </Alert>}
                    </Box>
                </Container>
            </>
        )
}
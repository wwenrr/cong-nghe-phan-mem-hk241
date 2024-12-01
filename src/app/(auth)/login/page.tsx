'use client'

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { TextField, Button, Box, Typography, Container, Avatar, CircularProgress, Skeleton, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { fetch_login } from "@/assessts/function/fetch";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

export default function Page() {
    const [mounted, setMounted] = useState(false)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    useEffect(() => {
        setMounted(true)
    })

    // @ts-ignore
    const handleSubmit = async (e) => {
        setErr('')
        e.preventDefault();

        const formData = {
            email: emailRef.current?.value || '',
            password: passwordRef.current?.value || '',
        };

        try {
            if(formData['email'] == '' || formData['password'] == '')
                throw Error('Input không hợp lệ')
            setLoading(true)
            const res = await fetch_login(formData)

            Cookies.set('token', res['token'], { expires: 1 });
            if (res.role == 'manager'){
                window.location.href = '/manager'
            }
            else window.location.href = '/student';
        } catch(error) {
            // @ts-ignore
            setErr(error.message)
            setLoading(false)
        }
    }

    if(mounted)
        return(
            <>  
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: 4,
                            borderRadius: 2,
                            boxShadow: 3,
                            backgroundColor: 'background.paper',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 75, height: 75 }}>
                            <LockOutlinedIcon fontSize="large" />
                        </Avatar>

                        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 2, fontSize: '1.5rem' }}>
                            Đăng nhập
                        </Typography>

                        <Box component="form" sx={{ mt: 1 }}>
                            <TextField
                                disabled={loading}
                                inputRef={emailRef}
                                margin="normal"
                                required
                                fullWidth
                                label="Địa chỉ Email"
                                autoComplete="email"
                                autoFocus
                                variant="standard"
                                InputProps={{
                                    style: { fontSize: '1.5rem' },
                                }}
                                InputLabelProps={{
                                    style: { fontSize: '1.5rem' },
                                }}
                                sx={{
                                    '& .MuiInputBase-root': {
                                        borderRadius: '8px',
                                    },
                                }}
                            />
                            <TextField
                                disabled={loading}
                                inputRef={passwordRef}
                                variant="standard"
                                margin="normal"
                                required
                                fullWidth
                                label="Mật khẩu"
                                type="password"
                                autoComplete="current-password"
                                InputProps={{
                                    style: { fontSize: '1.5rem' },
                                }}
                                InputLabelProps={{
                                    style: { fontSize: '1.5rem' },
                                }}
                                sx={{
                                    '& .MuiInputBase-root': {
                                        borderRadius: '8px',
                                    },
                                }}
                            />
                            
                             <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    py: 1.5,
                                    fontWeight: 'bold',
                                    fontSize: '1.5rem',
                                    borderRadius: '8px',
                                    backgroundColor: 'primary.main',
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                    },
                                }}
                                disabled={loading}
                                onClick={handleSubmit}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Đăng nhập'}
                            </Button>
                            
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <Typography variant="body2" sx={{ fontSize: '1.2rem' }}>
                                    <Link href="/register">
                                        Chưa có tài khoản? Đăng ký
                                    </Link>
                                </Typography>
                            </Box>
                        </Box>

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
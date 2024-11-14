'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { TextField, Button, Box, Typography, Container, Avatar, CircularProgress, Skeleton } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function Page() {
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
                            marginTop: 8,
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
                            >
                                Đăng nhập
                            </Button>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <Typography variant="body2" sx={{ fontSize: '1.2rem' }}>
                                    <Link href="/auth/register">
                                        Chưa có tài khoản? Đăng ký
                                    </Link>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </>
        )
}
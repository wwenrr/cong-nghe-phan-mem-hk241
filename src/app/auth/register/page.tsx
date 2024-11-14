'use client'

import React, {useState} from "react";
import Link from "next/link";
import {Box, Button, Container, TextField, Typography, Avatar} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

export default function Page() {
    const [OtpSent, setOtpSent] = useState(false);
    const [email, setEmail] = useState('');
    const [err, setErr] = useState('');

    const handleEmailChange = (e:any) => {
        e.preventDefault();
        setEmail(e.target.value);
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();
        setOtpSent(true);

        const emailPattern = /^[a-zA-Z0-9._%+-]+@hcmut\.edu\.vn$/;
        if (emailPattern.test(email)) {
            setOtpSent(true);
            setErr('')
        } else {
            setErr("Định dạng email không hợp lệ");
            setOtpSent(false);
        }
    }

    return(
        <>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop:7,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: 3,
                        backgroundColor: 'background.paper',
                        height: 300,
                        justifyContent: 'flex-start',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 75, height: 75 }}>
                        <EmailIcon fontSize="large" />
                    </Avatar>

                    <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 2, fontSize: '1.5rem' }}>
                        Đăng ký
                    </Typography>

                    <Typography component="h2" variant="h5" sx={{
                        fontSize: '1.5rem',
                        color: 'red'
                    }}>
                        {err}
                    </Typography>
                    <Box component="form"
                         sx={{
                             mt: 1,
                             display: 'flex',
                             alignItems: 'center'
                        }}>

                        <TextField id="outlined-basic" label="Email" variant="outlined"
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
                                   disabled={OtpSent}
                        />

                        <Button variant="contained"
                            sx = {{
                                ml: 2,
                                fontSize: '1.3rem',
                                height: 50
                            }} disabled = {OtpSent}
                                onClick={handleSubmit} type="submit"
                        >{OtpSent ? "Đã gửi OTP" : "Gửi OTP"}</Button>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Typography variant="body2" sx={{ fontSize: '1.2rem' }}>
                            <Link href="/auth/login">
                                Đã có tài khoản ? Đăng nhập
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </>
    )
}
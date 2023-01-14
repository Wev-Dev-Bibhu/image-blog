import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, CircularProgress, Divider, FormControl, FormControlLabel, FormLabel, IconButton, Input, InputAdornment, InputLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { memo, useState } from 'react'
import { NavLink } from 'react-router-dom'
// import ImageUpload from './ImageUpload'
import axios from 'axios'
import { useSnackbar } from 'notistack';



const SignIn = () => {
    const { enqueueSnackbar } = useSnackbar();
    const profileStyle = {
        background: '#112132',
        width: '30%',
        // height: 800,
        padding: '20px 30px',
        borderRadius: 3,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        color: '#adb2b7',
        // eslint-disable-next-line
        ['@media (max-width: 740px)']: {
            flexDirection: 'column',
            width: "70%",
            marginTop: 15
        }
    }
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [httpRequest, setHttpRequest] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        cpassword: "",
        phone: "",
        gender: "",
        imagepath: ""
    })

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowCPassword = () => setShowCPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseDownCPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        setHttpRequest(true)
        console.log(formData);
        const { username, email, password, cpassword, phone, gender, imagepath } = formData
        const json = JSON.stringify({ username, email, password, cpassword, phone, gender, imagepath });
        await axios.post('http://localhost:5000/signup', json, {
            headers: {
                // 'Authorization': `bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (res.status === 201) {
                    console.log(res);
                    const obj = res.data
                    let variant = obj.status
                    setFormData({
                        username: "",
                        email: "",
                        password: "",
                        cpassword: "",
                        phone: "",
                        gender: "",
                        // imagepath: ""
                    })
                    enqueueSnackbar(obj.message, { variant })
                    setTimeout(() => {
                        setHttpRequest(false)
                    }, 2000)
                }
            })
            .catch(err => {
                const obj = err.response.data
                let variant = obj.status
                enqueueSnackbar(obj.message, { variant })
                setTimeout(() => {
                    setHttpRequest(false)
                }, 2000)
            })
    }
    let name, value //, imagepath = "imagepath"
    const handleInputChange = (e) => {
        name = e.target.name
        value = e.target.value
        setFormData({ ...formData, [name]: value })
    }
    // const handleImageUpload = (data) => {
    //     setFormData({ ...formData, [imagepath]: data })
    // }
    return (
        <>
            <Box sx={{
                display: 'grid', placeItems: 'center', mt: 4,// eslint-disable-next-line
                ['@media (max-width: 740px)']: {
                    marginTop: -2
                }
            }}>
                <Box sx={profileStyle}>
                    <Typography fontSize={22} sx={{ display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 500, letterSpacing: 2 }}>Sign Up</Typography>
                    <Divider color='#fff' sx={{ width: '60%', m: 'auto' }} />
                    <form method="POST" style={{ marginTop: 50 }}>
                        {/* <FormControl variant='standard' sx={{ display: 'grid', placeItems: 'center', mt: 2 }} margin="dense">
                            <ImageUpload
                                inputRef={inputRef}
                                handleImageUpload={handleImageUpload}
                            />
                        </FormControl> */}

                        <TextField id="username" name="username" fullWidth required color="warning" label="Username" variant="standard" autoComplete='off' value={formData.username} onChange={handleInputChange} />
                        <TextField id="email" name="email" fullWidth margin="dense" required color="warning" label="Email" variant="standard" autoComplete='off' value={formData.email} onChange={handleInputChange} />
                        <TextField id="phone" name='phone' fullWidth margin="dense" required color="warning" label="Phone" variant="standard" autoComplete='off' value={formData.phone} onChange={handleInputChange} />
                        <FormControl required variant="standard" margin="dense" fullWidth >
                            <InputLabel htmlFor="standard-adornment-password" color='warning'>Password</InputLabel>
                            <Input
                                color='warning'
                                id="standard-adornment-password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            color='warning'
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl variant="standard" margin="dense" required fullWidth>
                            <InputLabel htmlFor="standard-adornment-cpassword" color='warning'>Confirm Password</InputLabel>
                            <Input
                                color='warning'
                                id="standard-adornment-cpassword"
                                name="cpassword"
                                value={formData.cpassword}
                                onChange={handleInputChange}
                                type={showCPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            color='warning'
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowCPassword}
                                            onMouseDown={handleMouseDownCPassword}
                                        >
                                            {showCPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormLabel required id="demo-row-radio-buttons-group-label" sx={{ display: 'flex', alignItems: 'center', mb: 2 }} style={{ marginTop: 15 }} margin="dense">
                            <InputLabel color='warning' required sx={{ pr: 1 }}>Gender</InputLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                color='warning'
                                value={formData.gender}
                                margin="dense"
                                onChange={handleInputChange}
                            >
                                <FormControlLabel name="gender" value="female" control={<Radio color='warning' />} label="Female" />
                                <FormControlLabel name="gender" value="male" control={<Radio color='warning' />} label="Male" />
                            </RadioGroup>
                        </FormLabel>
                        <Button variant="outlined" type='submit' color='warning' disabled={httpRequest} sx={{ float: 'right' }} onClick={handleSubmitForm} >Sign Up {httpRequest ? <CircularProgress sx={{ ml: 1, width: '20px !important', height: '20px !important' }} /> : ""} </Button>
                    </form>
                    <Typography variant='body1' fontSize={12}>Already an user ? <NavLink to="/signin" style={{ color: 'inherit' }}>SignIn here</NavLink> </Typography>
                </Box>
            </Box>
        </>
    )
}

export default memo(SignIn)
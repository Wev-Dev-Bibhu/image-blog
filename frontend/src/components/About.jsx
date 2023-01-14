import { Create } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'


const About = () => {
    const profileStyle = {
        background: '#112132',
        width: '80%',
        height: 400,
        p: 3,
        borderRadius: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // eslint-disable-next-line
        ['@media (max-width: 740px)']: {
            flexDirection: 'column',
            height: "100%"
        }
    }
    const innerBoxStyling = {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 0,
        paddingTop: 3,
        // eslint-disable-next-line
        ['@media (min-width: 740px)']: {
            paddingTop: 0,
            width: '50%'
        },
        m: 1,
        color: '#f2f2f2'
    }
    const aboutMeData = [{
        email: "bibhuti@gmail.com",
        role: "Full Stack Developer",
        phone: 81180106006,
    }]
    return (
        <>
            <Box sx={{ display: 'grid', placeItems: 'center', width: '100%', mt: 4 }}>
                <Box sx={profileStyle}>
                    <Box sx={innerBoxStyling}>
                        <img style={{ borderRadius: '50%', height: 300, width: 300 }} src="https://images.unsplash.com/profile-fb-1673026464-24ffd9a383fb.jpg?dpr=1&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff" alt="profile-pic.jpg" />
                    </Box>
                    <Box sx={innerBoxStyling} >
                        <Box sx={{
                            // eslint-disable-next-line
                            display: 'flex', flexDirection: 'column', width: '90%', alignItems: 'center', ['@media (min-width: 740px)']: {
                                alignItems: 'flex-start'
                            }
                        }}>
                            <Typography variant='body2' fontSize={30} sx={{ position: 'relative', mb: 1 }} >
                                <b>BIBHUTI DAS&nbsp;</b> <IconButton sx={{ position: 'absolute', background: '#f2f2f2 !important' }} size='small' variant='outlined' > <Create sx={{ fontSize: '14px' }} /></IconButton>
                            </Typography>
                            {aboutMeData.map((data) => {
                                return <>
                                    <Typography key={data.email} variant='body2' fontSize="large">
                                        <b>EMAIL </b> <br />
                                        {data.email}

                                    </Typography>
                                    <Typography key={data.role} variant='body2' fontSize="large">
                                        <b>ROLE </b> <br />
                                        {data.role}

                                    </Typography>
                                    <Typography key={data.phone} variant='body2' fontSize="large">
                                        <b>PHONE </b> <br />
                                        (+91) {data.phone}

                                    </Typography>
                                </>
                            })}
                        </Box>
                    </Box>
                </Box>

            </Box>
        </>
    )
}

export default About



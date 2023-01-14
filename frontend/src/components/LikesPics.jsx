import { Avatar, Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useState } from 'react'

const LikesPics = () => {
    const [apiData] = useState([
        {
            id: "1",
            img_src: "https://images.unsplash.com/photo-1671725779392-3be592fd3ea3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzOTY0NzR8MXwxfGFsbHwxfHx8fHx8Mnx8MTY3MzA3NTY4Ng&ixlib=rb-4.0.3&q=80&w=1080",
            first_name: "Bibhu",
            profile_image: "https://images.unsplash.com/profile-1605128133544-8145c372bcb1image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
            user_name: "bibhuti",
            date: "2023-01-06T15:33:09Z"

        }
    ])
    return (
        <Box sx={{
            // eslint-disable-next-line
            display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: 'center', ['@media (min-width: 1144px)']: {
                justifyContent: 'flex-start',
            }
        }}>
            {apiData.map((data) => {
                return <Box sx={{ m: 2 }} key={data.id}>
                    <Card sx={{ width: 345 }}>
                        <CardMedia
                            sx={{ height: 240 }}
                            image={data.img_src}
                            title="green iguana"
                        />
                        <CardContent sx={{ height: 35 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ width: 310 }}>
                                {data.description}
                            </Typography>
                            <Typography wrapper="div" variant="body2" fontSize={14} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar alt={data.first_name} src={data.profile_image} sx={{ mr: 1 }} />
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography variant='body2' color="text.secondary" sx={{ fontSize: '11px' }} >{data.user_name} </Typography>
                                    <Typography variant='body2' color="text.secondary" sx={{ fontSize: '11px' }} >{new Date(data.date).toDateString()} </Typography>
                                </div>
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            })}
        </Box >)
}

export default LikesPics

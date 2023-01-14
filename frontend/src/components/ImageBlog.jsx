import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useState } from 'react'
import LikeIcon from './LikeIcon'

const ImageBlog = (props) => {
  const { data } = props
  const [displayLike, setDisplayLike] = useState(false)

  const handleDescription = (description) => {
    if (description) {
      if (description.length > 42) {
        return description.charAt(0).toUpperCase() + description.slice(1).substring(0, 41).concat("...")
      } else {
        return description.charAt(0).toUpperCase() + description.slice(1).substring(0, 41)
      }
    } else {
      return "No Description"
    }
  }
  return (
    <Box sx={{ m: 2 }} key={data.id}>
      <Card sx={{ width: 345 }}>
        <CardMedia
          sx={{ height: 240 }}
          image={data.urls.regular}
        // title="green iguana"
        />
        <CardContent sx={{ height: 35, background: '#f1f1f1' }}>
          <Typography variant="body2" color="text.secondary" sx={{ width: 310 }}>
            {data.description ? handleDescription(data.description) : handleDescription(data.alt_description)}
          </Typography>
          <Typography component="div" variant="body2" fontSize={14} sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar alt={data.user.first_name} src={data.user.profile_image.medium} sx={{ mr: 1 }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant='body2' color="text.secondary" sx={{ fontSize: '11px' }} >{data.user.name} </Typography>
              <Typography variant='body2' color="text.secondary" sx={{ fontSize: '11px' }} >{new Date(data.updated_at).toDateString()} </Typography>
            </div>
          </Typography>
        </CardContent>
        <CardActions sx={{ p: 2, background: '#f1f1f1' }}>
          <LikeIcon value={displayLike} setDisplayLike={setDisplayLike} photoId={data.id} />
          <Button size="small" variant="outlined">Share</Button>
          <Button size="small" variant="outlined" >Explore</Button>
          <Typography variant='body2' color="text.secondary" textAlign="right" width={130}>{displayLike ? data.likes + 1 : data.likes} Likes</Typography>
        </CardActions>
      </Card>
    </Box>
  )
}

export default React.memo(ImageBlog)

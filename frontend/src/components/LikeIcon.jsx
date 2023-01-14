import { Favorite, FavoriteBorder } from '@mui/icons-material'
// import axios from 'axios'
import React from 'react'

const LikeIcon = (props) => {

    // const url = "https://api.unsplash.com/photos/" + props.photoId + "/like/?client_id=jZzyQgWRoFrNGAU0f6rMlcb7MnV5R-3e7sJvl4BVxgU"
    const handleDislike = () => {
        props.setDisplayLike(true)
    }
    const handleLike = async () => {
        // const response = await axios.post(url)
        // response.status === 200 ? console.log("Success"+ response) : console.warn("Fail");
        props.setDisplayLike(false)
        // console.log(url);
    }
    // const handleUserPhotos = async (userId) => {
    //     console.log(url);
    // }
    return (
        <>
            {props.value ? < Favorite sx={{ color: '#e64e63', cursor: 'pointer', mr: 1, fontSize: "29px" }} onClick={(e) => handleLike()} size="small" />
                :
                <FavoriteBorder sx={{ color: '#e64e63', cursor: 'pointer', mr: 1, fontSize: "29px" }} onClick={(e) => handleDislike()} size="small" />}
        </>
    )
}

export default LikeIcon

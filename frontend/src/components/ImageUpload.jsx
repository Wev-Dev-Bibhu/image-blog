import { CancelRounded, CloudUpload } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { memo, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const ImageUpload = (props) => {
    const [img, setImg] = useState(null)

    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.map((file) => {
            if (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png') {
                setImg(URL.createObjectURL(file))
                props.handleImageUpload(URL.createObjectURL(file))
            } else {
                alert("File format no supported")
            }
        })
    }, [setImg]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
            'image/jpeg': ['.jpeg']
        }
    });
    return (
        <>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {!img ? <Box sx={{ height: 100, width: 200, border: '1px dashed #fff', borderRadius: 1, display: 'flex', alignItems: 'center', cursor: 'pointer', background: isDragActive ? "#e8e9e9" : "none" }}>
                    <CloudUpload sx={{ fontSize: 60, pl: 2, pr: 1 }} />
                    <Typography fontSize={13} >Drop Image Here</Typography>
                </Box> : ""}
            </div >
            {img ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                    <img src={img} height={100} width={100} alt="thumbnail" style={{ borderRadius: 3 }} /><CancelRounded sx={{ position: 'absolute', right: -10, top: -10, cursor: 'pointer', bgcolor: '#000', borderRadius: '50%' }} onClick={() => setImg(null)} />
                </Box>
            ) : ""}
            {console.log("render")}
        </>
    )
}

export default memo(ImageUpload)

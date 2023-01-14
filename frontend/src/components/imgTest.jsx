import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function Dropzone() {
    const [paths, setPaths] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        setPaths(
            acceptedFiles.map(file => URL.createObjectURL(file))
        )
    }, [setPaths]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drop the files here ...</p>
            </div>
            {paths.map(path =>
                <img key={path} src={path} />)
            }
        </div>
    );
}
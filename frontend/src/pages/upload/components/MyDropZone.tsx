import {useCallback} from "react";
import {useDropzone} from "react-dropzone";
import "../../../../node_modules/dropzone/dist/dropzone.css";

export interface MyDropZoneProps {
    imageCallback: (imgFile: File) => void;
}

function MyDropZone(props: MyDropZoneProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        props.imageCallback(acceptedFiles[0]);
    }, []);

    const {getRootProps, getInputProps} = useDropzone({onDrop})


    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone d-flex justify-content-center align-items-center'})}>
                <input {...getInputProps()} />
                <p>Choose or drop files here.</p></div>
        </section>
    );
}

export default MyDropZone;
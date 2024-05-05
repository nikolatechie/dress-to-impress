import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.ts";
import {useEffect, useState} from "react";
import MyDropZone from "./components/MyDropZone.tsx";
import axios from "axios";

function UploadPage() {

    const navigate = useNavigate();
    const [isAuthenticated] = useAuth();
    const location = useLocation();

    const [id, setId] = useState<string>();
    const [imageFile, setImageFile] = useState<File>();

    const uploadImage = async (image: File) => {
        console.log("upload")
        if(!image) return;
        const body = new FormData();
        body.append("file", image);

        await axios.post("/api/upload", body, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            }
        })
    }

    const imageCallback = async (imageLink: File) => {
        setImageFile(imageLink);
        await uploadImage(imageLink);
    }

    if(!isAuthenticated)
        navigate("/login");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if(!params.get("img")) {
            navigate("/");
            return;
        }
        setId(params.get("img")!);
    }, [location])

    return (
        <>
            <MyDropZone imageCallback={imageCallback} />
        </>
    );
}

export default UploadPage;
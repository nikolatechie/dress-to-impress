import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.ts";
import {useEffect, useState} from "react";
import MyDropZone from "./components/MyDropZone.tsx";
import axios from "axios";
import { ImgComparisonSlider } from '@img-comparison-slider/react';


function UploadPage() {

    const navigate = useNavigate();
    const [isAuthenticated] = useAuth();
    const location = useLocation();

    const [id, setId] = useState<string>();
    const [imageLink, setImageLink] = useState<string>();

    const uploadImage = async (image: File) => {
        console.log("upload")
        if(!image) return;
        const body = new FormData();
        body.append("file", image);

        const resp = await axios.post("/api/upload", body, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        const url: string = resp.data;
        setImageLink(url);
    }

    const imageCallback = async (imageLink: File) => {
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
            {/*{*/}
            {/*    !imageLink &&*/}
            {/*    <MyDropZone imageCallback={imageCallback} />*/}
            {/*}*/}
            {/*{*/}
            {/*    imageLink &&*/}
            {/*    <div>*/}
            {/*        <img src={imageLink} style={{maxHeight: "500px", objectFit: "cover"}} />*/}
            {/*    </div>*/}
            {/*}*/}
            <ImgComparisonSlider>
                <img slot="first" width="100%" src="https://img-comparison-slider.sneas.io/demo/images/before.webp" />
                <img slot="second" width="100%" src="https://img-comparison-slider.sneas.io/demo/images/after.webp" />
            </ImgComparisonSlider>
        </>
    );
}

export default UploadPage;
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.ts";
import {useEffect, useState} from "react";
import MyDropZone from "./components/MyDropZone.tsx";
import axios from "axios";
import { ImgComparisonSlider } from '@img-comparison-slider/react';
import {Button, Container} from "react-bootstrap";
import {Swiper} from "swiper/react";
import {SwiperSlide} from "swiper/react";
import 'swiper/css';

function UploadPage() {

    const navigate = useNavigate();
    const [isAuthenticated] = useAuth();
    const location = useLocation();

    const [id, setId] = useState<string>();
    const [imageLink, setImageLink] = useState<string>();
    const [resultImageLink, setResultImageLink] = useState<string>();
    const [generationId, setGenerationId] = useState<string>();
    const [chosenImage, setChosenImage] = useState<string>();

    const uploadImage = async (image: File) => {
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

    const resetUserImage = () => {
        setImageLink(undefined);
    }

    const imageCallback = async (imageLink: File) => {
        await uploadImage(imageLink);
    }

    const getImageById = async (id: string) => {
        const resp = await axios.get(`/api/clothes-images/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            }
        });
        setChosenImage(resp.data.url);
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
        getImageById(params.get("img")!)
    }, [location])

    return (
        <>
            <Container>
                {
                    !imageLink &&
                    <>
                        <h3>Upload files</h3>
                        <MyDropZone imageCallback={imageCallback} />
                    </>
                }
                {
                    imageLink &&
                    <>
                        <div className="d-flex justify-content-center">
                            <ImgComparisonSlider style={{maxHeight: "500px", width: "50%"}}>
                                <img slot="first" width="100%" src={imageLink}/>
                                {
                                    resultImageLink ?
                                        <img slot="second" width="100%" src={resultImageLink}/> :
                                        <img slot="second" width="100%" src={imageLink}/>
                                }
                            </ImgComparisonSlider>
                        </div>
                        <Button variant={"primary"} onClick={resetUserImage}>Upload new image</Button>
                    </>
                }
                <section className="mt-4">
                    {/*<div className="d-flex justify-content-center mt-2">*/}
                        <Swiper
                            spaceBetween={20}
                            slidesPerView={3}
                            loop={true}
                            pagination = {{
                                "el": ".swiper-pagination",
                                "clickable": true
                            }}
                            navigation = {{
                                "prevEl": ".btn-prev",
                                "nextEl": ".btn-next"
                            }}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                        >
                            <SwiperSlide>
                                <div className="ratio ratio-16x9 bg-secondary">
                                    <img style={{objectFit: "cover"}} src={chosenImage} />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="ratio ratio-16x9 bg-secondary">
                                    <div
                                        className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center display-4">1
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="ratio ratio-16x9 bg-secondary">
                                    <div
                                        className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center display-4">1
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="ratio ratio-16x9 bg-secondary">
                                    <div
                                        className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center display-4">1
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    {/*</div>*/}
                </section>
            </Container>
        </>
    );
}

export default UploadPage;
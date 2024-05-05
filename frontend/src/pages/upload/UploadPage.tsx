import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.ts";
import {useEffect, useState} from "react";
import MyDropZone from "./components/MyDropZone.tsx";
import axios from "axios";
import { ImgComparisonSlider } from '@img-comparison-slider/react';
import {Button, Container, Spinner} from "react-bootstrap";
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
    const [recommendations, setRecommendations] = useState<string[]>([]);
    const [generating, setGenerating] = useState<boolean>(false);
    const [clothingType, setClothingType] = useState<string>("topwear");

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

    const checkGenerationProgress = async () => {
        const res = await axios.get(`/api/filter-replicate/${generationId}`);
        if(res.status > 199 && res.status < 300) {
            setGenerating(false);
            setGenerationId(undefined);
            setResultImageLink(res.data.resultImageUrl);
            return;
        }
        setTimeout(checkGenerationProgress, 1000);
    }

    const generate = async () => {
        const res = await axios.post("/api/change-clothes", {
            imageUrl: imageLink,
            clothingImageUrl: chosenImage,
            clothingType: clothingType
        });
        if(res.status > 199 && res.status < 300) {
            setGenerating(true);
            setGenerationId(res.data.replicateId);
        }
        setTimeout(checkGenerationProgress, 3000);
    }

    const getRecommendations = async () => {
        const resp = await axios.post(
            `/api/v1/findSimilarImages?baseImageUrl=${chosenImage}`,);

        const urlList: {top8Images: string} = resp.data;
        const components = urlList.top8Images.split(",");
        setRecommendations([...components]);
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
        if(!id) setId(params.get("img")!);
        if(!chosenImage) getImageById(params.get("img")!);
        if(recommendations.length == 0 && chosenImage) getRecommendations();
    }, [location, chosenImage])

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
                        <div>
                            <div className="mb-4">
                                <label htmlFor="select-input" className="form-label">Clothing type</label>
                                <select value={clothingType} onChange={(e) => setClothingType(e.target.value)} className="form-select" id="select-input">
                                    <option value={"topwear"}>Topwear</option>
                                    <option value={"bottomwear"}>Bottomwear</option>
                                </select>
                                <div className="d-flex gap-2 mt-2">
                                    <Button variant={"primary"} disabled={generating} onClick={generate}>{!generating ? "Generate" : <Spinner></Spinner>}</Button>
                                    <Button variant={"outline-secondary"} onClick={resetUserImage} disabled={generating}>Upload new image</Button>
                                </div>
                            </div>
                        </div>
                    </>
                }
                <section className="mt-4">
                    {/*<div className="d-flex justify-content-center mt-2">*/}
                    <h4>Recommendations:</h4>
                    <Swiper
                        centeredSlides={true}
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
                            onSlideChange={(swiper) => {
                                setChosenImage(recommendations[swiper.activeIndex]);
                                console.log(recommendations[swiper.activeIndex])
                            }}
                        >
                            <SwiperSlide>
                                <div className="ratio ratio-16x9 bg-secondary">
                                    <img style={{objectFit: "cover"}} src={chosenImage} />
                                </div>
                            </SwiperSlide>
                            {
                                recommendations.map((url, i) => {
                                    return (
                                        <SwiperSlide>
                                            <div key={`div-r-${i}`} className="ratio ratio-16x9 bg-secondary">
                                                <img key={`img-r-${i}`} style={{objectFit: "cover"}} src={url}/>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                            }
                            {
                                recommendations.length == 0 &&
                                [1,2,3,4,5,6,7,8].map(i => {
                                    return (
                                        <SwiperSlide>
                                            <div key={`div-r-${i}`} className="ratio ratio-16x9 bg-secondary">
                                                <Spinner variant="border"></Spinner>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                            }

                        </Swiper>
                    {/*</div>*/}
                </section>
            </Container>
        </>
    );
}

export default UploadPage;
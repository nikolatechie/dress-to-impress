import { useState } from 'react';

interface GalleryComponentProps {
    id: number,
    season?: string,
    year?: number,
    productType?: number,
    section?: number,
    imageSrc: string
}

function GalleryComponent(props: GalleryComponentProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <div className="card card-hover border-0 bg-transparent position-relative" data-aos="flip-left">
                <img src={props.imageSrc} style={{height: "300px", width: "300px", objectFit: "cover"}}
                     className="rounded-3" alt="Albert Flores"/>
                <div
                    className="card-img-overlay d-flex flex-column align-items-center justify-content-center rounded-3">
                    <span
                        className="position-absolute top-0 start-0 bg-primary opacity-35 rounded-3" style={{height: "300px", width: "300px"}}></span>
                    <div className="position-absolute top-0 end-0 m-2">
                        <span
                            className={`bx bxs-star fs-3 cursor-pointer ${isHovered ? 'text-warning' : ''}`}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        ></span>
                    </div>
                    <div className="position-relative d-flex zindex-2">
                        <a href={`/upload?img=${props.id}`} className="btn btn-secondary btn-sm bg-white me-2"> Try it on</a>
                    </div>
                </div>
                <div className="card-body text-center p-3">
                    <h3 className="fs-lg fw-semibold pt-1 mb-2">{props.season} {props.year} {props.productType} {props.section}</h3>
                </div>
            </div>
        </>
    );
}

export default GalleryComponent;

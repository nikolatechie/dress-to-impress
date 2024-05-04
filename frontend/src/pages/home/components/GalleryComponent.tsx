interface GalleryComponentProps {
    season: string,
    year: number,
    productType: number,
    section: number,
    imageSrc: string
}
function GalleryComponent(props: GalleryComponentProps) {
    return (
        <>
            <div className="card card-hover border-0 bg-transparent">
                <div className="position-relative">
                    <img src={props.imageSrc} style={{ height: "300px", width: "300px", objectFit: "cover" }} className="rounded-3" alt="Albert Flores" />
                    <div
                        className="card-img-overlay d-flex flex-column align-items-center justify-content-center rounded-3">
                        <span
                            className="position-absolute top-0 start-0 w-100 h-100 bg-primary opacity-35 rounded-3"></span>
                        <div className="position-relative d-flex zindex-2">
                            <a href="#" className="btn btn-icon btn-secondary btn-facebook btn-sm bg-white me-2"
                                aria-label="Facebook">
                                <i className="bx bxl-facebook"></i>
                            </a>
                            <a href="#" className="btn btn-icon btn-secondary btn-linkedin btn-sm bg-white me-2"
                                aria-label="LinkedIn">
                                <i className="bx bxl-linkedin"></i>
                            </a>
                            <a href="#" className="btn btn-icon btn-secondary btn-twitter btn-sm bg-white"
                                aria-label="Twitter">
                                <i className="bx bxl-twitter"></i>
                            </a>
                        </div>
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
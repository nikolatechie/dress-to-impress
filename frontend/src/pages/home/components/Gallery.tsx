import {Container} from "react-bootstrap";
import galleryJson from "../../../assets/data/gallery.json";
import GalleryComponent from "./GalleryComponent.tsx";

function Gallery() {
    return (
        <>
            <section className="mt-4">
                <Container>
                    <h2>Our products:</h2>
                    <div className="d-flex flex-wrap gap-4 mt-1">
                        {galleryJson.map((item, i) => {
                            return (
                                <div key={`div-${i}`}>
                                    <GalleryComponent key={`div-${i}`} season={item.season} year={item.year} productType={item.productType}
                                                      section={item.section} imageSrc={item.imageSrc}/>
                                </div>
                            )
                        })}
                    </div>
                </Container>
            </section>
        </>
    );
}

export default Gallery;
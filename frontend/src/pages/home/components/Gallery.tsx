import {Container, Spinner} from "react-bootstrap";
import GalleryComponent from "./GalleryComponent.tsx";
import {useInfiniteQuery} from "@tanstack/react-query";
import {useEffect, useRef} from "react";
import axios from "axios";

export interface GalleryImage {
    id: number;
    url: string;
    year: number;
    season: string;
    productType: number;
    section: number;
    imageName: string;
}
export interface GalleryImagePage {
    content: GalleryImage[];
    pageable: {
        sort: {
            sorted: boolean,
            unsorted: boolean,
            empty: boolean
        }
        pageNumber: number;
        pageSize: number;
        offset: number;
        paged: boolean;
        unpaged: boolean;
    };
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
        sorted: boolean,
        unsorted: boolean,
        empty: boolean,
    };
    first: boolean,
    numberOfElements: number;
    empty: boolean;
}

function Gallery() {

    const pageEndRef = useRef<HTMLDivElement>(null)

    const fetchImages = async ({ pageParam = 0 }): Promise<GalleryImagePage> => {
        const res = await axios.get('/api/clothes-images?&page=' + pageParam);
        return res.data
    }

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ['images'],
        queryFn: fetchImages,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.last ? undefined : lastPage.number + 1,
    })

    useEffect(() => {
        const options = {
            rootMargin: "0px",
            threshold: 0.01,
        };
        const observer = new IntersectionObserver(([entry]) => {
            if (
                entry.isIntersecting &&
                hasNextPage &&
                !isFetching
            ) {
                fetchNextPage();
            }
        }, options);
        if (pageEndRef.current)
            observer.observe(pageEndRef.current);

        return () => {
            observer.disconnect();
        }
    }, [isFetching])


    return (
        <>
            <section className="mt-5">
                <Container>
                    <h2>Our products:</h2>
                    <div className="d-flex flex-wrap gap-4 mt-1 justify-content-center">
                        {
                            data && data.pages.map((page) => {
                                return (
                                    <>
                                        {
                                            page.content.map((item, j) => {
                                                return (
                                                    <div key={'div-${j}'}>
                                                    <GalleryComponent
                                                        year={item.year}
                                                        season={item.season}
                                                        productType={item.productType}
                                                        section={item.section}
                                                        imageSrc={item.url}
                                                        id={item.id}
                                                    />
                                                    </div>
                                                )
                                            })
                                        }
                                    </>
                                )
                            })
                        }
                    </div>
                        <div ref={pageEndRef} style={{width: "100%", height: "750px"}}>
                    </div>
                    <div>{isFetching && !isFetchingNextPage ? <Spinner></Spinner> : null}</div>
                </Container>
            </section>
        </>
    );
}

export default Gallery;
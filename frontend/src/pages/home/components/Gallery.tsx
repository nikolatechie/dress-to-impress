import { Container, Spinner } from "react-bootstrap";
import GalleryComponent from "./GalleryComponent.tsx";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export interface GalleryImage {
    id: number;
    url: string;
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

    const fetchImages = async ({ pageParam = 0 }: {pageParam: number}): Promise<GalleryImagePage> => {
        const res = await fetch('/api/clothes-images?page=' + pageParam);
        return res.json()
    }

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ['images'],
        queryFn: fetchImages,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.last ? undefined : lastPage.number + 1,
    })

    useEffect(() => {
        const options = {
            rootMargin: "0px",
            threshold: 1.0,
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
    }, [hasNextPage, isFetching])


    return isFetching ? (
        <p>Loading...</p>
    ) : status === 'error' ? (
        <p>Error: {error.message}</p>
    ) : (
        <>
            <section className="mt-5">
                <Container>
                    <h2>Our products:</h2>
                    <div className="d-flex flex-wrap gap-4 mt-1 justify-content-center">
                        {
                            data && data.pages.map((page, i) => {
                                return (
                                    <>
                                        {
                                            page.content.map((item, j) => {
                                                return (
                                                    <div key={`div-${i}-${j}`}>
                                                        <GalleryComponent key={`div-${i}`} season={"test"}
                                                            year={2024}
                                                            productType={0}
                                                            section={0}
                                                            imageSrc={item.url} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </>
                                )
                            })
                        }
                    </div>
                    <div ref={pageEndRef}>
                        <button
                            onClick={() => { fetchNextPage() }}
                            disabled={!hasNextPage || isFetchingNextPage}
                            hidden={hasNextPage}
                        >
                            {isFetchingNextPage
                                ? 'Loading more...'
                                : hasNextPage
                                    ? ''
                                    : 'Nothing more to load'}
                        </button>
                    </div>
                    <div>{isFetching && !isFetchingNextPage ? <Spinner></Spinner> : null}</div>
                </Container>
            </section>
        </>
    );
}

export default Gallery;
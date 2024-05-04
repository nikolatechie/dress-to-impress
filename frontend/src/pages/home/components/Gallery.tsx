import {Container} from "react-bootstrap";
import GalleryComponent from "./GalleryComponent.tsx";
import {useInfiniteQuery} from "@tanstack/react-query";

export interface GalleryImage {
    id: number;
    url: string;
}

function Gallery() {
    const fetchImages = async ({ pageParam }) => {
        const res = await fetch('/api/clothes-images?size=12&page=' + pageParam);
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
        getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    })
    return status === 'pending' ? (
        <p>Loading...</p>
    ) : status === 'error' ? (
        <p>Error: {error.message}</p>
    ) : (
        <>
            <section className="mt-4">
                <Container>
                    <h2>Our products:</h2>
                    <div className="d-flex flex-wrap gap-4 mt-1">
                        {data.pages.map((image, i) => (
                            <div key={`div-${i}`}>
                                <GalleryComponent key={i} season={"test"} year={2024} productType={1} section={1}
                                                  imageSrc={image.url}/>
                            </div>
                        ))}
                    </div>
                    <div>
                        <button
                            onClick={() => fetchNextPage()}
                            disabled={!hasNextPage || isFetchingNextPage}
                        >
                            {isFetchingNextPage
                                ? 'Loading more...'
                                : hasNextPage
                                    ? 'Load More'
                                    : 'Nothing more to load'}
                        </button>
                    </div>
                    <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
                </Container>
            </section>
        </>
    );
}

export default Gallery;
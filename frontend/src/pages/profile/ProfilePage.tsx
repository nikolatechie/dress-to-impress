import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import GalleryComponent from "../home/components/GalleryComponent";

type ClothesImage = {
  id: number,
  url: string,
  year: number,
  season: string,
  productType: number,
  section: number,
  imageName: string
};

export default function ProfilePage() {
  const [favourites, setFavourites] = useState<ClothesImage[]>([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      const response = await fetch(`/api/favorites`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('jwt')}`
        }
      });
      console.log(response);
      const data = await response.json();
      console.log('data', data);
      if (response.ok) {
        setFavourites(data);
      }
    };

    fetchFavourites();
  }, []);

  return (
    <Container className="mt-5">
      <h2>Favourites</h2>
      <div className="d-flex flex-wrap gap-4 mt-1 justify-content-center">
        {favourites.map((item, i) => {
          return (
            <div key={i}>
              <GalleryComponent key={`div-${i}`}
                imageSrc={item.url} />
            </div>
          )
        })}
      </div>
    </Container>
  )
}
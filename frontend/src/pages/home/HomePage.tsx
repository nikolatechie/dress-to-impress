import Hero from "./components/Hero.tsx";
import Gallery from "./components/Gallery.tsx";
import 'aos/dist/aos.css';
import AOS from 'aos';
import {useEffect} from "react";

function HomePage() {
    useEffect(() => {
        AOS.init();
    })
    return (
        <>
            <Hero />
            <Gallery />
        </>
    );
}

export default HomePage;
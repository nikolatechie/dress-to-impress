import heroImage from "../../../assets/img/home/hero5.jpg"

function Hero() {
    return (
        <>
            <section className="pt-lg-4 mt-lg-3">
                <div className="position-relative overflow-hidden">
                    <div className="container-fluid position-relative position-lg-absolute top-0 start-0 h-100">
                        <div className="row h-100 me-n4 me-n2">
                            <div className="col-lg-7 position-relative">
                                <div className="d-none d-sm-block d-lg-none" style={{height: "400px"}}></div>
                                <div className="d-sm-none" style={{height: "300px"}}></div>
                                <div
                                    className="jarallax position-absolute top-0 start-0 w-100 h-100 rounded-3 rounded-start-0 overflow-hidden"
                                    data-jarallax data-speed="0.5">
                                    <div className="jarallax-img"
                                         style={{backgroundImage: `url(${heroImage})`, backgroundPosition: "center"}}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container position-relative zindex-5 pt-lg-5 px-0 px-lg-3">
                        <div className="row pt-lg-5 mx-n4 mx-lg-n3">
                            <div className="col-xl-6 col-lg-7 offset-lg-5 offset-xl-6 pb-5">

                                <div className="card bg-dark border-light overflow-hidden py-4 px-2 p-sm-4">
                                    <span className="position-absolute top-0 start-0 w-100 h-100"
                                          style={{backgroundColor: "rgba(255,255,255,.05)"}}></span>
                                    <div className="card-body position-relative zindex-5">
                                        <p className="fs-xl fw-bold text-primary text-uppercase mb-3">Fashion done right</p>
                                        <h1 className="display-5 text-light pb-3 mb-3">Dress to impress</h1>
                                        <p className="fs-lg text-light opacity-70 mb-5">Helping our clients meet their
                                            fashion needs for more than 10 years. We offer you the full spectrum of
                                            global fashion options.</p>
                                        <div className="d-flex flex-column flex-sm-row">
                                            <a href="#"
                                               className="btn btn-primary shadow-primary btn-lg mb-3 mb-sm-0 me-sm-4">Get
                                                started</a>
                                            <a href="#" className="btn btn-outline-light btn-lg">
                                                Who we are
                                                <i className="bx bx-right-arrow-alt fs-4 lh-1 ms-2 me-n1"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-3 col-lg-4 offset-lg-8 offset-xxl-9 pt-lg-5 mt-xxl-5">

                                <ul className="list-unstyled mb-0 px-4 px-lg-0">
                                    <li className="d-flex align-items-center pb-1 mb-2">
                                        <i className="bx bx-map fs-xl text-primary me-2"></i>
                                        6391 Elgin St. Celina, Delaware 10299
                                    </li>
                                    <li className="d-flex align-items-center pb-1 mb-2">
                                        <i className="bx bx-envelope fs-xl text-primary me-2"></i>
                                        <a href="mailto:email@example.com"
                                           className="nav-link fw-normal p-0">email@example.com</a>
                                    </li>
                                    <li className="d-flex align-items-center pb-1 mb-2">
                                        <i className="bx bx-phone-call fs-xl text-primary me-2"></i>
                                        <a href="tel:4065550120" className="nav-link fw-normal p-0">(406) 555-0120</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Hero;
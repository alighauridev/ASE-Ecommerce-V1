import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
// import products from "./../../data/Products";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../Redux/actions/productActions";

const MainProducts = () => {
    const dispatch = useDispatch();
    const products = [
        {
            brand: {
                logo: {
                    public_id: "1",
                    url: "http://localhost:3000/static/media/home.eb7132924aab6919441b.png"
                },
                name: "Flipa"
            },
            _id: "6460333a7a3603ab9b8e94da",
            name: "Office Study Tables",
            description: "Find the perfect study table for your home office or workspace. Made with high-quality materials and stylish designs, these study tables offer a comfortable and efficient work environment.",
            highlights: [
                "Made with high-quality materials",
                "Stylish designs",
                "Comfortable and efficient work environment",
                "Ideal for home office or workspace"
            ],
            specifications: [
                {
                    title: "title 1",
                    description: "this is the description",
                    _id: "6460333a7a3603ab9b8e94db"
                }
            ],
            price: 290,
            cuttedPrice: 400,
            images: [
                {
                    public_id: "1",
                    url: "https://rukminim1.flixcart.com/image/150/150/jqgy3rk0/computer-table/j/2/v/particle-board-dkl-comp-tb-09-delite-kom-brown-original-imafcheqbgers37z.jpeg",
                    _id: "6460333a7a3603ab9b8e94dc"
                }
            ],
            category: "Electronics",
            stock: 1,
            warranty: 1,
            ratings: 4.75,
            numOfReviews: 2,
            user: "646032a018539556759371a3",
            reviews: [
                {
                    user: "646032a018539556759371a3",
                    name: "Nigtmare Burger",
                    rating: 5,
                    comment: "nice",
                    _id: "646033567a3603ab9b8e9503"
                },
                {
                    user: "646045e8bb526f4df89aaff1",
                    name: "Muhammad Ali",
                    rating: 4.5,
                    comment: "nice",
                    _id: "64604611bb526f4df89ab025"
                }
            ],
            createdAt: "2023-05-14T01:02:50.549Z",
            __v: 2
        },
        {
            brand: {
                logo: {
                    public_id: "1",
                    url: "http://localhost:3000/static/media/home.eb7132924aab6919441b.png"
                },
                name: "Flipa"
            },
            _id: "646033f87a3603ab9b8e9523",
            name: "Mobiles & Accessories",
            description: "Stay connected and up-to-date with the latest mobile phones and accessories. With a wide range of options to choose from, you'll find everything you need to stay connected on-the-go.",
            highlights: [
                "Made with high-quality materials",
                "Stylish designs",
                "Comfortable and efficient work environment",
                "Ideal for home office or workspace"
            ],
            specifications: [
                {
                    title: "title 1",
                    description: "this is the description",
                    _id: "646033f87a3603ab9b8e9524"
                }
            ],
            price: 595,
            cuttedPrice: 700,
            images: [
                {
                    public_id: "1",
                    url: "https://rukminim1.flixcart.com/image/150/150/ksoz53k0/data-cable/micro-usb-cable/o/w/a/d4-lava-original-imag67jpby4fehga.jpeg",
                    _id: "646033f87a3603ab9b8e9525"
                }
            ],
            category: "Electronics",
            stock: 1,
            warranty: 1,
            ratings: 4,
            numOfReviews: 1,
            user: "646032a018539556759371a3",
            reviews: [
                {
                    user: "646032a018539556759371a3",
                    name: "Nigtmare Burger",
                    rating: 4,
                    comment: "nice",
                    _id: "646037df7a3603ab9b8e9b0f"
                }
            ],
            createdAt: "2023-05-14T01:06:00.654Z",
            __v: 1
        },
        {
            brand: {
                logo: {
                    public_id: "1",
                    url: "http://localhost:3000/static/media/home.eb7132924aab6919441b.png"
                },
                name: "Flipa"
            },
            _id: "6460346c7a3603ab9b8e9541",
            name: "Calculators",
            description: "Solve complex equations and calculations with ease using our collection of calculators. From basic to advanced functions, these calculators are perfect for students, professionals, and anyone who needs to perform calculations quickly and accurately.",
            highlights: [
                "Made with high-quality materials",
                "Stylish designs",
                "Comfortable and efficient work environment",
                "Ideal for home office or workspace"
            ],
            specifications: [
                {
                    title: "title 1",
                    description: "this is the description",
                    _id: "6460346c7a3603ab9b8e9542"
                }
            ],
            price: 200,
            cuttedPrice: 250,
            images: [
                {
                    public_id: "1",
                    url: "https://rukminim1.flixcart.com/image/150/150/kffq2kw0/calculator/p/m/a/orpat-gt-ot-512-gt-calaculatot-original-imafvwdmnzpzufbb.jpeg",
                    _id: "6460346c7a3603ab9b8e9543"
                }
            ],
            category: "Mobiles",
            stock: 1,
            warranty: 1,
            ratings: 0,
            numOfReviews: 0,
            user: "646032a018539556759371a3",
            reviews: [],
            createdAt: "2023-05-14T01:07:56.875Z",
            __v: 0
        },
        {
            brand: {
                logo: {
                    public_id: "1",
                    url: "http://localhost:3000/static/media/home.eb7132924aab6919441b.png"
                },
                name: "Flipa"
            },
            _id: "6460353e7a3603ab9b8e95c2",
            name: "Office Study Chairs",
            description: "Stay comfortable and productive with our collection of office study chairs. These chairs are designed to offer maximum comfort and support, allowing you to work for longer periods without experiencing discomfort or fatigue.",
            highlights: [
                "Maximum comfort and support",
                "Designed for long work periods",
                "Stay comfortable and productive",
                "Reduce discomfort and fatigue"
            ],
            specifications: [
                {
                    title: "title 1",
                    description: "this is the description",
                    _id: "6460353e7a3603ab9b8e95c3"
                }
            ],
            price: 2000,
            cuttedPrice: 2500,
            images: [
                {
                    public_id: "1",
                    url: "https://rukminim1.flixcart.com/image/150/150/krkyt8w0/office-study-chair/v/l/1/pp-polypropylene-shdelta-1001-savya-home-original-imag5ccydueur3es.jpeg",
                    _id: "6460353e7a3603ab9b8e95c4"
                }
            ],
            category: "Home",
            stock: 1,
            warranty: 1,
            ratings: 0,
            numOfReviews: 0,
            user: "646032a018539556759371a3",
            reviews: [],
            createdAt: "2023-05-14T01:11:26.094Z",
            __v: 0
        }
    ]
    return (
        <section className="content-main">
            <div className="content-header">
                <h2 className="content-title">Products</h2>
                <div>
                    <Link to="/addproduct" className="btn btn-primary">
                        Create new
                    </Link>
                </div>
            </div>

            <div className="card mb-4 shadow-sm">
                <header className="card-header bg-white ">
                    <div className="row gx-3 py-3">
                        <div className="col-lg-4 col-md-6 me-auto ">
                            <input
                                type="search"
                                placeholder="Search..."
                                className="form-control p-2"
                            />
                        </div>
                        <div className="col-lg-2 col-6 col-md-3">
                            <select className="form-select">
                                <option>All category</option>
                                <option>Electronics</option>
                                <option>Clothings</option>
                                <option>Something else</option>
                            </select>
                        </div>
                        <div className="col-lg-2 col-6 col-md-3">
                            <select className="form-select">
                                <option>Latest added</option>
                                <option>Cheap first</option>
                                <option>Most viewed</option>
                            </select>
                        </div>
                    </div>
                </header>

                <div className="card-body">
                    <div className="row">
                        {/* Products */}
                        {products.map((product) => (
                            <Product product={product} key={product._id} />
                        ))}
                    </div>

                    <nav className="float-end mt-4" aria-label="Page navigation">
                        <ul className="pagination">
                            <li className="page-item disabled">
                                <Link className="page-link" to="#">
                                    Previous
                                </Link>
                            </li>
                            <li className="page-item active">
                                <Link className="page-link" to="#">
                                    1
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link className="page-link" to="#">
                                    2
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link className="page-link" to="#">
                                    3
                                </Link>
                            </li>
                            <li className="page-item">
                                <Link className="page-link" to="#">
                                    Next
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </section>
    );
};

export default MainProducts;

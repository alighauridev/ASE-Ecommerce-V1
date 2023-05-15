import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createProduct } from "../../Redux/actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../Redux/constants/productConstants";
import { toast, ToastContainer } from "react-toastify";

const AddProductMain = () => {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [countInStock, setCountInStock] = useState();
    const [image, setImage] = useState(
        "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg"
    );
    const dispatch = useDispatch();
    const ProductCreate = useSelector((state) => state.ProductCreate);
    const { loading, success, product, error } = ProductCreate;
    const validator = () => {
        if (!title) {
            toast.warning("title is required");
            return false;
        } else if (!description) {
            toast.warning("description is required");
            return false;
        } else if (!price) {
            toast.warning("price is required");
            return false;
        } else if (!image) {
            toast.warning("price is required");
            return false;
        } else if (!countInStock) {
            toast.warning("countInStock is required");
            return false;
        } else {
            return true;
        }
    };
    const submitHandler = (e) => {
        e.preventDefault();
        if (validator()) {
            dispatch(
                createProduct({ title, description, price, countInStock, image })
            );
        }
    };
    const postDetails = (pics) => {
        if (!pics) {
            // return setPicMessage("Please Select an Image");
        }
        // setPicMessage(null);
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "notesapp");
            data.append("cloud_name", "dipcjbjho");
            fetch("https://api.cloudinary.com/v1_1/dipcjbjho/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setImage(data.url.toString());
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            // return setPicMessage("Please Select an Image");
        }
    };
    useEffect(() => {
        if (success) {
            toast.success("Product Created")

        }
        if (error) {
            toast.error(error)

        }
        if (product) {

            dispatch({ type: PRODUCT_CREATE_RESET });

            setTitle("");
            setDescription("");
            setImage("");
            setCountInStock(0);
            setPrice(0);
        }
    }, [dispatch, product, success, error]);

    return (
        <>
            <section
                className="content-main"
                style={{
                    maxWidth: "1200px",
                }}
            >
                <form onSubmit={submitHandler}>
                    <div className="content-header">
                        <Link to="/products" className="btn btn-danger text-white">
                            Go to products{" "}
                        </Link>{" "}
                        <h2 className="content-title"> Add product </h2>{" "}
                        <div>
                            <button type="submit" className="btn btn-primary">
                                Publish now{" "}
                            </button>{" "}
                        </div>{" "}
                    </div>
                    <div className="row mb-4">
                        <div className="col-xl-8 col-lg-8">
                            <div className="card mb-4 shadow-sm">
                                <div className="card-body">
                                    <div className="mb-4">
                                        <label htmlFor="product_title" className="form-label">
                                            Product title{" "}
                                        </label>{" "}
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="form-control"
                                            id="product_title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                        />
                                    </div>{" "}
                                    <div className="mb-4">
                                        <label htmlFor="product_price" className="form-label">
                                            Price{" "}
                                        </label>{" "}
                                        <input
                                            type="number"
                                            placeholder="Type here"
                                            className="form-control"
                                            id="product_price"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            required
                                        />
                                    </div>{" "}
                                    <div className="mb-4">
                                        <label htmlFor="product_price" className="form-label">
                                            Count In Stock{" "}
                                        </label>{" "}
                                        <input
                                            type="number"
                                            placeholder="Type here"
                                            className="form-control"
                                            id="product_price"
                                            value={countInStock}
                                            onChange={(e) => setCountInStock(e.target.value)}
                                            required
                                        />
                                    </div>{" "}
                                    <div className="mb-4">
                                        <label className="form-label"> Description </label>{" "}
                                        <textarea
                                            placeholder="Type here"
                                            className="form-control"
                                            rows="7"
                                            required
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        ></textarea>{" "}
                                    </div>{" "}
                                    <div className="mb-4">
                                        <label className="form-label"> Images </label>{" "}
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Inter Image URL"
                                        />
                                        <input
                                            className="form-control mt-3"
                                            type="file"
                                            onChange={(e) => postDetails(e.target.files[0])}
                                        />
                                    </div>{" "}
                                </div>{" "}
                            </div>{" "}
                        </div>{" "}
                    </div>{" "}
                </form>{" "}
            </section>{" "}
        </>
    );
};

export default AddProductMain;

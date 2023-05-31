import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./CategoryForm.module.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { listCategories } from "../../Redux/actions/categoryActions";
import axiosa from "../../api/axiosa"
const CategoryForm = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [parentCategory, setParentCategory] = useState(null);
    const [subCategory, setSubCategory] = useState(null);
    const [subCategories, setSubCategories] = useState([]);
    const [tab, setTab] = useState(1); // 1 for Category, 2 for Subcategory
    const dispatch = useDispatch()


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axiosa.get("/api/v1/categories");
                setCategories(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchSubCategories = async () => {
            if (parentCategory) {
                try {
                    const res = await axiosa.get(`/api/v1/categories/${parentCategory}/subcategories`);
                    setSubCategories(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
        };
        fetchSubCategories();
    }, [parentCategory]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let url = "/api/v1/categories";
            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-'); // convert name to slug
            let payload = { name, slug };
            if (tab === 1) {
                url += `/${subCategory}/subcategories`;
                payload = { ...payload, parentId: subCategory };
            } else if (tab === 2) {
                url += `/${parentCategory}/subcategories`;
                payload = { ...payload, parentId: parentCategory };
            }
            await axiosa.post(url, payload);
            toast.success("Created Successfully!");
            dispatch(listCategories())
            setName("");
            setParentCategory(null);
            setSubCategory(null);
        } catch (err) {
            console.error(err);
            toast.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.buttonGroup}>
                <button
                    type="button"
                    className={tab === 1 ? styles.active : ''}
                    onClick={() => setTab(1)}
                >
                    Add SubCategory
                </button>
                <button
                    type="button"
                    className={tab === 2 ? styles.active : ''}
                    onClick={() => setTab(2)}
                >
                    Add Category
                </button>

            </div>
            <div className={styles.inputGroup}>
                {tab === 1 && (
                    <>
                        <select value={parentCategory} onChange={(e) => setParentCategory(e.target.value)}>
                            <option value="">--Select Parent Category--</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {parentCategory && (
                            <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
                                <option value="">--Select Category--</option>
                                {subCategories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </>
                )}
                {tab === 2 && (
                    <select value={parentCategory} onChange={(e) => setParentCategory(e.target.value)}>
                        <option value="">--Select Parent Category--</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            <div className={styles.inputGroup}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <button type="submit" style={{
                padding: '10px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#4fa607',
                color: 'white',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                width: '100%',
                marginTop: '10px'
            }}>Submit</button>
        </form >
    );
};

export default CategoryForm;

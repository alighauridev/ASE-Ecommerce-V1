const express = require("express");
const router = express.Router();
const {
    registerVendor,
    loginVendor,
    getVendorDetails,
    updateVendorProfile,
    updateVendorPassword,
    uploadProduct,
    updateProduct,
    deleteProduct,
    requestWithdrawal,
    getVendorProducts,
} = require("../controllers/vendorControllers");
const { protect } = require("../middlewares/authMiddleware");

router.post("/register", registerVendor);
router.post("/login", loginVendor);
router.get("/details", protect, getVendorDetails);
router.put("/profile/update", protect, updateVendorProfile);
router.put("/password/update", protect, updateVendorPassword);
router.post("/product/upload", protect, uploadProduct);
router.put("/product/:id/update", protect, updateProduct);
router.delete("/product/:id/delete", protect, deleteProduct);
router.post("/withdrawal/request", protect, requestWithdrawal);
router.get("/products", protect, getVendorProducts);

module.exports = router;

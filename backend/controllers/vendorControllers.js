const Vendor = require("../models/vendorModel");
const Product = require("../models/productModel");
const Withdrawal = require("../models/withdrawalModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/sendToken");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const cloudinary = require("cloudinary");

// Register vendor
exports.registerVendor = asyncErrorHandler(async (req, res, next) => {
    const { name, email, companyName, address, user } = req.body;
    const parsedAddress = JSON.parse(address);
    const vendor = await Vendor.create({
        name,
        email,
        companyName,
        address: parsedAddress,
        user,
    });

    res.status(201).json({
        success: true,
        vendor,
    });
});

// Login Vendor
exports.loginVendor = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
    }

    const vendor = await Vendor.findOne({ email }).select("+password");

    if (!vendor) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await vendor.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(vendor, 200, res);
});

// Get Vendor Details
exports.getVendorDetails = asyncErrorHandler(async (req, res, next) => {
    const vendor = await Vendor.findById(req.vendor.id)
        .populate("user")
        .populate("products");

    res.status(200).json({
        success: true,
        vendor,
    });
});

// Update Vendor Profile
exports.updateVendorProfile = asyncErrorHandler(async (req, res, next) => {
    const newVendorData = {
        name: req.body.name,
        email: req.body.email,
        companyName: req.body.companyName,
        address: req.body.address,
        user: req.body.user,
    };

    await Vendor.findByIdAndUpdate(req.vendor.id, newVendorData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

// Update Vendor Password
exports.updateVendorPassword = asyncErrorHandler(async (req, res, next) => {
    const vendor = await Vendor.findById(req.vendor.id).select("+password");

    const isPasswordMatched = await vendor.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is invalid", 400));
    }

    vendor.password = req.body.newPassword;
    await vendor.save();
    sendToken(vendor, 200, res);
});

// Upload product
exports.uploadProduct = asyncErrorHandler(async (req, res, next) => {
    const {
        name,
        description,
        price,
        cuttedPrice,
        category,
        stock,
        auction,
        classifiedAd,
    } = req.body;

    const vendor = await Vendor.findById(req.vendor.id);

    if (!vendor) {
        return next(new ErrorHandler("Vendor not found", 404));
    }

    // Upload images to Cloudinary
    const imageUploadPromises = req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path);
        return {
            public_id: result.public_id,
            url: result.secure_url,
        };
    });
    const images = await Promise.all(imageUploadPromises);

    // Create product with images
    const product
        = await Product.create({
            name,
            description,
            price,
            cuttedPrice,
            images,
            category,
            stock,
            auction,
            classifiedAd,
            vendor: req.vendor.id,
        });
    vendor.products.push(product._id);
    await vendor.save();

    res.status(201).json({
        success: true,
        product,
    });
});

// Update product
exports.updateProduct = asyncErrorHandler(async (req, res, next) => {
    const { name, description, price, cuttedPrice, category, stock, auction, classifiedAd } = req.body;
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    if (product.vendor.toString() !== req.vendor.id) {
        return next(new ErrorHandler("You are not allowed to update this product", 403));
    }

    const updatedProductData = {
        name,
        description,
        price,
        cuttedPrice,
        category,
        stock,
        auction,
        classifiedAd,
    };

    product = await Product.findByIdAndUpdate(req.params.id, updatedProductData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        product,
    });

    await Product.create({
        name,
        description,
        price,
        cuttedPrice,
        images,
        category,
        stock,
        auction,
        classifiedAd,
        vendor: req.vendor.id,
    });

    //     scss
    // Copy code
    vendor.products.push(product._id);
    await vendor.save();

    res.status(201).json({
        success: true,
        product,
    });
});

// Update product
exports.updateProduct = asyncErrorHandler(async (req, res, next) => {
    const { name, description, price, cuttedPrice, category, stock, auction, classifiedAd } = req.body;

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    if (product.vendor.toString() !== req.vendor.id) {
        return next(new ErrorHandler("You are not allowed to update this product", 403));
    }

    const updatedProductData = {
        name,
        description,
        price,
        cuttedPrice,
        category,
        stock,
        auction,
        classifiedAd,
    };

    product = await Product.findByIdAndUpdate(req.params.id, updatedProductData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        product,
    });
});

// Delete product
exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    const vendor = await Vendor.findById(req.vendor.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    if (product.vendor.toString() !== req.vendor.id) {
        return next(new ErrorHandler("You are not allowed to delete this product", 403));
    }

    // Remove product from vendor's array of products
    const index = vendor.products.indexOf(product._id);

    if (index > -1) {
        vendor.products.splice(index, 1);
        await vendor.save();
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
    });
});

// Request withdrawal
exports.requestWithdrawal = asyncErrorHandler(async (req, res, next) => {
    const vendor = await Vendor.findById(req.vendor.id);
    if (!vendor) {
        return next(new ErrorHandler("Vendor not found", 404));
    }

    const { amount } = req.body;

    if (amount > vendor.wallet.balance) {
        return next(new ErrorHandler("Withdrawal amount exceeds available balance", 400));
    }

    const withdrawal = await Withdrawal.create({
        vendor: req.vendor.id,
        amount,
    });

    vendor.wallet.withdrawals.push(withdrawal._id);
    await vendor.save();

    res.status(201).json({
        success: true,
        withdrawal,
    });
});

// Get vendor's products
exports.getVendorProducts = asyncErrorHandler(async (req, res, next) => {
    const vendor = await Vendor.findById(req.vendor.id);
    if (!vendor) {
        return next(new ErrorHandler("Vendor not found", 404));
    }

    const products = await Product.find({ vendor: req.vendor.id });

    res.status(200).json({
        success: true,
        products,
    });
});
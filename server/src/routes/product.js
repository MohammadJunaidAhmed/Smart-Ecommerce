const express = require("express");
const { Category } = require("../models/Category/Category");
const { Product } = require("../models/Product/Product");
const { Seller } = require("../models/Seller/Seller");
const { Order } = require("../models/Order/Order");
const csv = require('csv-parser'); // CSV parser library
const fs = require('fs'); // File system to read files
const multer = require("multer");
const mongoose = require('mongoose');
const router = express.Router();

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  'text/csv': 'csv'
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid file type");

    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

// API TO GET ALL PRODUCTS;
router.get("/products", async (req, res) => {
  try {
    const categoryId = req.query.categoryId || null;
    const minPrice = req.query.minPrice || 0;
    const maxPrice = req.query.maxPrice || 1000000;
    const searchTerm = req.query.search || "";

    // Find all products and populate necessary fields
    const products = await Product.find({})
      .populate("category")
      .populate("sellerProducts.seller");

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    // Create an array to store flattened product-seller combinations
    let allProducts = [];
    // Loop through each product and flatten sellerProducts
    products.forEach((product) => {
      product.sellerProducts.forEach((sellerProduct) => {
        if((categoryId !== null ? product.category._id.toString() === categoryId : true) && product.name.toLowerCase().startsWith(searchTerm.toLowerCase()) && sellerProduct.stock > 0 && sellerProduct.price >= Math.min(minPrice,maxPrice) && sellerProduct.price <= Math.max(minPrice,maxPrice)){
          allProducts.push({
            id: product._id,
            name: product.name,
            description: product.description,
            category: product.category.name,
            mrp: product.mrp,
            seller: sellerProduct.seller._id,
            sellerName: sellerProduct.seller.name, // Assuming seller has a 'name' field
            sellerRating: sellerProduct.sellerRating,
            price: sellerProduct.price,
            stock: sellerProduct.stock,
            sellerRating: (Math.round(sellerProduct.sellerRating * 100) / 100).toFixed(2),
            numReviews: sellerProduct.numReviews,
            status: sellerProduct.status,
            published: product.published,
            image: sellerProduct ? sellerProduct.images[0] : '',
          });
        }
      });
    });

    res.status(200).json({ allProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// API to retrieve sellers for a specific product
router.get("/products/:productId/sellers", async (req, res) => {
  const { productId } = req.params;

  try {
    // Find the product and populate the seller details
    const product = await Product.findById(productId).populate({
      path: "sellerProducts.seller",
      select: "name email phone", // Select the required seller fields
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Send the list of sellers selling this product
    res.status(200).json({
      productName: product.name,
      sellers: product.sellerProducts.map((sellerProduct) => ({
        seller: sellerProduct.seller,
        price: sellerProduct.price,
        rating: sellerProduct.sellerRating,
        stock: sellerProduct.stock,
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET A PRODUCT FOR GIVEN SELLER
router.get("/products/:productId/sellers/:sellerId", async (req, res) => {
  const { productId, sellerId } = req.params;

  try {
    // Find the product by productId
    const product = await Product.findById(productId).populate(
      "sellerProducts.seller"
    );

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the seller exists in the product's sellerProducts
    const sellerProduct = product.sellerProducts.find(
      (sp) => sp.seller._id.toString() === sellerId
    );

    if (!sellerProduct) {
      return res
        .status(404)
        .json({ message: "Seller not selling this product" });
    }

    // Return the specific product details for the seller
    res.status(200).json({
      product: {
        name: product.name,
        category: product.category,
        description: product.description,
        seller: {
          sellerId: sellerProduct.seller._id,
          price: sellerProduct.price,
          stock: sellerProduct.stock,
          images: sellerProduct.images,
          mrp: product.mrp,
          purchasePrice: product.purchasePrice,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// API TO GET ALL PRODUCTS OF A GIVEN SELLER
router.get("/sellers/:sellerId/products", async (req, res) => {
  const { sellerId } = req.params;

  try {
    // Find all products where the seller has entries in the sellerProducts array
    const products = await Product.find({ "sellerProducts.seller": sellerId })
      .populate("category", "name") // Populate the category name for each product
      .lean(); // Use lean for better performance since we are just reading data

    // Format the products to the desired structure
    const formattedProducts = products.map((product) => {
      // Find the seller-specific details for this seller from sellerProducts array
      const sellerProduct = product.sellerProducts.find(
        (sp) => sp.seller.toString() === sellerId
      );

      return {
        id: product._id,
        name: product.name,
        category: product.category ? product.category.name : "NA", // Assuming category is populated with the 'name'
        mrp: product.mrp || "N/A", // Assuming 'mrp' exists or defaults to 'N/A'
        price: sellerProduct ? sellerProduct.price : "N/A",
        stock: sellerProduct ? sellerProduct.stock : "N/A",
        status:
          sellerProduct && sellerProduct.stock > 0
            ? "In Stock"
            : "Out of Stock",
      };
    });

    if (formattedProducts.length === 0) {
      return res
        .status(200)
        .json({ message: "No products found for this seller", products: [] });
    }

    res.status(200).json({
      message: `Products found for seller ${sellerId}`,
      products: formattedProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Flattened API to Get Products by Category (with at least 1 seller)
router.get("/products/category/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  const minPrice = req.query.minPrice || 0;
  const maxPrice = req.query.maxPrice || 1000000;
  const searchTerm = req.query.search || "";
  try {
    // Fetch products with at least one seller in the specified category
    const products = await Product.find({
      category: categoryId,
      sellerProducts: { $exists: true, $not: { $size: 0 } },
    })
      .populate("category")
      .populate("sellerProducts.seller");

    // Flatten the products based on sellerProducts
    let allProducts = [];

    products.forEach((product) => {
      product.sellerProducts.forEach((sellerProduct) => {
        if( product.name.toLowerCase().startsWith(searchTerm.toLowerCase()) && sellerProduct.stock > 0 && sellerProduct.price >= Math.min(minPrice,maxPrice) && sellerProduct.price <= Math.max(minPrice,maxPrice)){
          allProducts.push({
            id: product._id,
            name: product.name,
            description: product.description,
            category: product.category.name,
            mrp: product.mrp,
            seller: sellerProduct.seller._id,
            sellerName: sellerProduct.seller.name, // Assuming seller has a 'name' field
            sellerRating: sellerProduct.sellerRating,
            price: sellerProduct.price,
            stock: sellerProduct.stock,
            sellerRating: (Math.round(sellerProduct.sellerRating * 100) / 100).toFixed(2),
            numReviews: sellerProduct.numReviews,
            status: sellerProduct.status,
            published: product.published,
            image: sellerProduct ? sellerProduct.images[0] : '',
          });
        }
      });
    });

    res.status(200).json({ allProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// API TO GET ALL INFO
router.get('/products/seller/info', async (req, res) => {
  try {
      // Find products that have sellers
      const products = await Product.find({ sellerProducts: { $exists: true, $not: { $size: 0 } } })
          .populate('category')
          .populate('sellerProducts.seller'); // Populate seller details

      if (products.length === 0) {
          return res.status(404).json({ message: 'No products found' });
      }

      // Construct response data
      const productData = products.map(product => {
          return product.sellerProducts.map(sellerProduct => ({
              sellerId: sellerProduct.seller._id,
              productName: product.name,
              stock: sellerProduct.stock,
              category: product.category.name, // Assuming category has a name field
              costPrice: sellerProduct.purchasePrice, // Assuming purchasePrice is the cost price
              mrp: product.mrp,
              sellerRating: sellerProduct.sellerRating, // Assuming seller has a rating field
              totalCustomers: sellerProduct.seller.totalCustomers, // Assuming seller has totalCustomers field
              salePrice: sellerProduct.price,
              salesVolume: sellerProduct.salesVolume // Assuming sales volume is present in sellerProduct
          }));
      }).flat(); // Flatten the array to get individual records

      res.status(200).json(productData);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});
router.get('/products/seller/info/main', async (req, res) => {
  try {
      // Find products that have sellers
      const products = await Product.find({ sellerProducts: { $exists: true, $not: { $size: 0 } } })
          .populate('category')
          .populate('sellerProducts.seller'); // Populate seller details

      if (products.length === 0) {
          return res.status(404).json({ message: 'No products found' });
      }

      // Prepare the product data
      const productData = await Promise.all(products.map(async (product) => {
          return await Promise.all(product.sellerProducts.map(async (sellerProduct) => {
              // Aggregate the orders to calculate totalCustomers and salesVolume
              const orders = await Order.aggregate([
                  {
                      $match: {
                          product: product._id,
                          seller: sellerProduct.seller._id
                      }
                  },
                  {
                      $group: {
                          _id: null,
                          totalCustomers: { $addToSet: '$consumer' }, // Unique consumers
                          salesVolume: { $sum: '$quantity' } // Total quantity sold
                      }
                  }
              ]);

              const totalCustomers = orders.length > 0 ? orders[0].totalCustomers.length : 0;
              const salesVolume = orders.length > 0 ? orders[0].salesVolume : 0;

              return {
                  sellerId: sellerProduct.seller._id,
                  productName: product.name,
                  category: product.category.name, // Assuming category has a name field
                  stock: sellerProduct.stock,
                  costPrice: sellerProduct.purchasePrice, // Assuming purchasePrice is the cost price
                  mrp: product.mrp,
                  sellerRating: sellerProduct.sellerRating, // Assuming seller has a rating field
                  totalCustomers, // Derived from orders aggregation
                  salePrice: sellerProduct.price,
                  salesVolume // Derived from orders aggregation
              };
          }));
      }));

      // Flatten the result and return
      res.status(200).json(productData.flat()); // Flatten to get all products in one array
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});


router.get('/products/category/:categoryId/popular', async (req, res) => {
  const { categoryId } = req.params;

  try {
      // Step 1: Get products in the given category
      const products = await Product.find({ 
          category: categoryId, 
          sellerProducts: { $exists: true, $not: { $size: 0 } } 
      }).populate('category').populate("sellerProducts.seller").lean(); // Convert documents to plain JavaScript objects


      if (!products || products.length === 0) {
          return res.status(404).json({ message: 'No products found in this category' });
      }

      // Step 2: Extract product IDs and seller IDs
      const productSellerPairs = [];
      products.forEach(product => {
          product.sellerProducts.forEach(sellerProduct => {
              productSellerPairs.push({
                  productId: product._id,
                  sellerId: sellerProduct.seller
              });
          });
      });


      // Step 3: Query the Orders collection to calculate sales volume for each product-seller pair
      const salesData = await Order.aggregate([
          {
              $match: {
                  $or: productSellerPairs.map(pair => ({
                      product: new mongoose.Types.ObjectId(pair.productId),
                      seller: new mongoose.Types.ObjectId(pair.sellerId._id)
                  }))
              }
          },
          {
              $group: {
                  _id: { product: "$product", seller: "$seller" },
                  totalSales: { $sum: "$quantity" } // Summing up quantities sold
              }
          }
      ]);

      // Step 4: Map sales data back to product details
      const popularProducts = salesData.map(sale => {
          const product = products.find(p => p._id.toString() === sale._id.product.toString());
          const sellerProduct = product.sellerProducts.find(sp => sp.seller._id.toString() === sale._id.seller.toString());

          return {
              productId: product._id,
              productName: product.name,
              category: product.category, // Assuming category has a `name` field
              costPrice: sellerProduct.purchasePrice,
              mrp: product.mrp,
              sellerId: sale._id.seller,
              sellerName: sellerProduct.seller.name,
              sellerRating: sellerProduct.sellerRating,
              salePrice: sellerProduct.price,
              totalSales: sale.totalSales,
              image: sellerProduct ? sellerProduct.images[0] : '',
          };
      });

      // Step 5: Sort by totalSales in descending order and limit to top 10
      const topProducts = popularProducts.sort((a, b) => b.totalSales - a.totalSales).slice(0, 10);

      res.status(200).json(topProducts);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});

router.get('/products/all?minPrice&maxPrice&search', async (req, res) => {

  try {
      // Step 1: Get products in the given category
      const products = await Product.find({ 
          sellerProducts: { $exists: true, $not: { $size: 0 } } 
      }).populate('category').populate("sellerProducts.seller").lean(); // Convert documents to plain JavaScript objects


      if (!products || products.length === 0) {
          return res.status(404).json({ message: 'No products found in this category' });
      }

      // Step 2: Extract product IDs and seller IDs
      const productSellerPairs = [];
      products.forEach(product => {
          product.sellerProducts.forEach(sellerProduct => {
              productSellerPairs.push({
                  productId: product._id,
                  sellerId: sellerProduct.seller
              });
          });
      });


      // Step 3: Query the Orders collection to calculate sales volume for each product-seller pair
      const salesData = await Order.aggregate([
          {
              $match: {
                  $or: productSellerPairs.map(pair => ({
                      product: new mongoose.Types.ObjectId(pair.productId),
                      seller: new mongoose.Types.ObjectId(pair.sellerId._id)
                  }))
              }
          },
          {
              $group: {
                  _id: { product: "$product", seller: "$seller" },
                  totalSales: { $sum: "$quantity" } // Summing up quantities sold
              }
          }
      ]);

      // Step 4: Map sales data back to product details
      const popularProducts = salesData.map(sale => {
          const product = products.find(p => p._id.toString() === sale._id.product.toString());
          const sellerProduct = product.sellerProducts.find(sp => sp.seller._id.toString() === sale._id.seller.toString());

          return {
              productId: product._id,
              productName: product.name,
              category: product.category, // Assuming category has a `name` field
              costPrice: sellerProduct.purchasePrice,
              mrp: product.mrp,
              sellerId: sale._id.seller,
              sellerName: sellerProduct.seller.name,
              sellerRating: sellerProduct.sellerRating,
              salePrice: sellerProduct.price,
              totalSales: sale.totalSales,
              image: sellerProduct ? sellerProduct.images[0] : '',
          };
      });

      // Step 5: Sort by totalSales in descending order and limit to top 10
      const topProducts = popularProducts.sort((a, b) => b.totalSales - a.totalSales).slice(0, 10);

      res.status(200).json(topProducts);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});



// API to add a product for a seller
router.post("/sellers/:sellerId/products", uploadOptions.single("file"),
  async (req, res) => {
    const { sellerId } = req.params;
    const {
      productName,
      category,
      description,
      sellerPrice,
      stock,
      mrp,
      purchasePrice,
    } = req.body;

    // Use req.file to get the uploaded file
    const file = req.file;
    // if (!file) return res.status(400).send("No image in the request");
    let basePath,fileName;
    if(file){
      fileName = file.filename; // Multer stores the file in req.file, not req.body
      basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    }

    try {
      // Find the seller by ID
      const seller = await Seller.findById(sellerId);
      if (!seller) {
        return res.status(404).json({ message: "Seller not found" });
      }

      let existingProduct = await Product.findOne({ name: productName });

      if(existingProduct){
        // Check if the seller already exists in the sellerProducts array
        const sellerExists = existingProduct.sellerProducts.some(sp => sp.seller.toString() === sellerId);

        if (sellerExists) {
          // If the seller exists, update price and stock for that seller
          existingProduct.sellerProducts = existingProduct.sellerProducts.map((sp) =>
            sp.seller.toString() === sellerId ? { ...sp, price: sellerPrice, stock: stock } : sp
          );
        } else {
          // If the seller is not found, add the seller to the sellerProducts array
          existingProduct.sellerProducts.push({
            seller: sellerId,
            purchasePrice: purchasePrice,
            price: sellerPrice,
            stock: stock,
          });
        }

        // Save the updated product
        await existingProduct.save();
        res
          .status(201)
          .json({ message: "Product added successfully", product: existingProduct });
      }
      else{
        const newProduct = new Product({
          name: productName,
          category: category,
          description: description,
          mrp: mrp,
          sellerProducts: [
            {
              seller: sellerId,
              price: sellerPrice,
              purchasePrice: purchasePrice,
              stock: stock,
              images: `${basePath}${fileName}`, // Save the image path
            },
          ],
        });
  
        // Save the product
        const savedProduct = await newProduct.save();
        res
          .status(201)
          .json({ message: "Product added successfully", product: savedProduct });
      }

      // Create the new product object
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// API to add multiple products for a seller from a CSV file
router.post("/sellers/:sellerId/products/import", uploadOptions.single("file"), async (req, res) => {
  const { sellerId } = req.params;
  const file = req.file;

  // Ensure a file is uploaded
  if (!file) {
    return res.status(400).json({ message: "No CSV file provided" });
  }

  try {
    // Find the seller by ID
    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const products = [];
const promises = []; // To store all async operations

// Open and parse the CSV file
fs.createReadStream(file.path)
  .pipe(csv()) // Pipe the file stream through the CSV parser
  .on("data", (row) => {
    const processRow = async () => {
      try {
        // Check if the product already exists in the database
        let existingProduct = await Product.findOne({ name: row.productName });
        if (existingProduct) {
          // Check if the seller already exists in the sellerProducts array
          const sellerExists = existingProduct.sellerProducts.some(sp => sp.seller.toString() === sellerId);

          if (sellerExists) {
            // If the seller exists, update price and stock for that seller
            existingProduct.sellerProducts = existingProduct.sellerProducts.map((sp) =>
              sp.seller.toString() === sellerId ? { ...sp, price: row.sellerPrice, stock: row.stock } : sp
            );
          } else {
            // If the seller is not found, add the seller to the sellerProducts array
            existingProduct.sellerProducts.push({
              seller: sellerId,
              purchasePrice: row.purchasePrice,
              price: row.sellerPrice,
              stock: row.stock,
            });
          }

          // Save the updated product
          await existingProduct.save();
        } else {
          // If the product doesn't exist, create a new product
          const newProduct = {
            name: row.productName,
            category: row.category,
            description: row.description,
            mrp: row.mrp,
            sellerProducts: [
              {
                seller: sellerId,
                price: row.sellerPrice,
                purchasePrice: row.purchasePrice,
                stock: row.stock,
              },
            ],
          };
          products.push(newProduct);
        }
      } catch (error) {
        console.error("Error processing row: ", error);
      }
    };

    // Push the async processRow function to the promises array
    promises.push(processRow());
  })
  .on("end", async () => {
    try {
      // Wait for all the promises to complete before proceeding
      await Promise.all(promises);

      if (products.length > 0) {
        // Insert new products
        const insertedProducts = await Product.insertMany(products);
        res.status(201).json({
          message: `${insertedProducts.length} new products added successfully`,
          products: insertedProducts,
        });
      } else {
        res.status(200).json({ message: "All products were updated or already existed." });
      }
    } catch (error) {
      console.error("Error inserting products: ", error);
      res.status(500).json({ message: "Error saving products to the database" });
    }
  })
  .on("error", (error) => {
    console.error("Error reading CSV file: ", error);
    res.status(500).json({ message: "Error processing CSV file" });
  });


  } catch (error) {
    console.error("Error in CSV upload process: ", error);
    res.status(500).json({ message: "Server error" });
  }
});

// MODIFY PRODUCT INFO BY SELLER
router.put('/sellers/:sellerId/products/:productId', uploadOptions.single("file"), async (req, res) => {
    const { sellerId, productId } = req.params;
    const { sellerPrice, stock } = req.body;
    // Use req.file to get the uploaded file
    const file = req.file;
    // if (!file) return res.status(400).send("No image in the request");
    let basePath,fileName;
    if(file){
      fileName = file.filename; // Multer stores the file in req.file, not req.body
      basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    }

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const sellerProduct = product.sellerProducts.find(sp => sp.seller.toString() === sellerId);
        if (!sellerProduct) {
            return res.status(404).json({ message: 'Seller does not sell this product' });
        }

        // Update the seller's product details
        sellerProduct.price = sellerPrice || sellerProduct.price;
        sellerProduct.stock = stock || sellerProduct.stock;
        if(file){
          sellerProduct.images = `${basePath}${fileName}`;
        }

        await product.save();
        res.status(200).json({ message: 'Product information updated successfully', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


// BULK ADD IMAGES BY SELLER
router.put('/sellers/:sellerId/bulk-add-images', uploadOptions.array("files", 10), async (req, res) => {
  const { sellerId } = req.params;
  const selectedRows = req.body.selectedRows; // Assuming product IDs are passed as selectedRows
  const files = req.files; // Multer stores uploaded files here

  if (!selectedRows || selectedRows.length === 0) {
    return res.status(400).json({ message: 'No product data provided.' });
  }

  if (!files || files.length === 0) {
    return res.status(400).json({ message: 'No image files uploaded.' });
  }

  try {
    // Iterate over each product and update images
    const updatePromises = selectedRows.map(async (productId, index) => {
      const file = files[index]; // Match the file with the product ID based on index

      if (!file) {
        throw new Error(`No image file provided for product with id: ${productId}`);
      }

      // Construct the image URL
      const fileName = file.filename;
      const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
      const imageUrl = `${basePath}${fileName}`;

      // Find the product and update the image
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error(`Product with id ${productId} not found`);
      }

      // Assuming the product has a sellerProducts array
      const sellerProduct = product.sellerProducts.find(sp => sp.seller.toString() === sellerId);
      if (!sellerProduct) {
        throw new Error(`Seller with id ${sellerId} does not sell this product`);
      }

      // Update the image URL for the seller's product
      sellerProduct.images = imageUrl;

      // Save the product
      await product.save();
    });

    // Wait for all update promises to complete
    await Promise.all(updatePromises);

    res.status(200).json({ message: 'Images updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// API TO DELETE A PRODUCT;
router.delete("/sellers/:sellerId/products/:productId", async (req, res) => {
  const { sellerId, productId } = req.params;

  try {
    // Step 1: Find the product by productId
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Step 2: Find the seller's product details in the `sellerProducts` array of the product
    const sellerIndex = product.sellerProducts.findIndex(
      (sp) => sp.seller.toString() === sellerId
    );
    if (sellerIndex === -1) {
      return res
        .status(404)
        .json({ message: "Seller does not sell this product" });
    }

    // Step 3: Remove the seller's product details from the product's `sellerProducts`
    product.sellerProducts.splice(sellerIndex, 1);
    await product.save();

    // Step 4: Find the seller and remove the product from their `sellerProducts`
    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res
      .status(200)
      .json({ message: "Product removed successfully for the seller" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// API TO BULK DELETE PRODUCTS;
router.delete("/sellers/:sellerId/products/bulk/delete", async (req, res) => {
  console.log("Hello")
  const { productsList } = req.body; 
  const { sellerId } = req.params;

  console.log(productsList)

  if (!Array.isArray(productsList) || productsList.length === 0) {
    return res.status(400).json({ message: "Invalid input, expected an array of productId" });
  }

  try {
    const deleteResults = [];

    for (const productId of productsList) {
      // Step 1: Find the product by productId
      const product = await Product.findById(productId);
      if (!product) {
        deleteResults.push({ productId, sellerId, message: "Product not found" });
        continue;
      }

      // Step 2: Find the seller's product details in the `sellerProducts` array of the product
      const sellerIndex = product.sellerProducts.findIndex(
        (sp) => sp.seller.toString() === sellerId
      );
      if (sellerIndex === -1) {
        deleteResults.push({ productId, sellerId, message: "Seller does not sell this product" });
        continue;
      }

      // Step 3: Remove the seller's product details from the product's `sellerProducts`
      product.sellerProducts.splice(sellerIndex, 1);
      
      // If no sellers are left for the product, optionally delete the product itself
      if (product.sellerProducts.length === 0) {
        await Product.findByIdAndDelete(productId); // If no seller left, delete product
        deleteResults.push({ productId, sellerId, message: "Product deleted because no sellers remain" });
      } else {
        await product.save();
        deleteResults.push({ productId, sellerId, message: "Seller's product removed successfully" });
      }
    }

    res.status(200).json({
      message: "Bulk delete operation completed",
      results: deleteResults
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during bulk deletion" });
  }
});



module.exports = router;

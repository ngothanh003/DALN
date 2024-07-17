const bodyParser = require("body-parser");

// Import các model
const ProductModel = require("../models/newproduct");
const UserModel = require("../models/user");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = {
  /* CÁC CHỨC NĂNG QUẢN LÝ SẢN PHẨM */
  // Hiển thị trang thêm sản phẩm
  getAddProduct: function(req, res, next) {
    let message = req.flash("error");
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
    req.session.isManager = false;
    res.render("product/addproduct", {
      errorMessageProduct: message
    });
  },

  // Xử lý khi người dùng thêm sản phẩm
  postAddProduct: function(req, res, next) {
    const {
      productname,
      price,
      imagePath,
      description,
      quantity,
      category
    } = req.body;

    // Lấy ngày hiện tại dưới dạng yyyy-MM-dd
    const today = new Date();
    const date_format = today.toISOString().slice(0, 10);

    ProductModel.findOne({ imagePath: imagePath })
      .then(function(product) {
        if (product) {
          req.flash("error", "Sản phẩm đã tồn tại.");
          return res.redirect("/adminTin/addproduct");
        }

        if (
          productname === "" ||
          price === "" ||
          imagePath === "" ||
          description === ""
        ) {
          req.flash("error", "Tên sản phẩm, giá, đường dẫn ảnh, mô tả không được để trống.");
          return res.redirect("/adminTin/addproduct");
        }

        const newProduct = new ProductModel({
          productname: productname,
          imagePath: imagePath,
          price: price,
          description: description,
          quantity: quantity,
          category: category,
          created: date_format
        });

        return newProduct.save()
          .then(function(savedProduct) {
            console.log("Đã lưu sản phẩm mới:", savedProduct);
            res.redirect("/adminTin");
          });
      })
      .catch(function(err) {
        console.log("Lỗi khi lưu sản phẩm:", err);
        res.send("Lỗi: " + err);
      });
  },

  // Hiển thị chi tiết sản phẩm
  getProductDetail: function(req, res, next) {
    const productId = req.params._id;

    UserModel.find()
      .then(users => {
        ProductModel.findById(productId)
          .then(productdetail => {
            if (!productdetail) {
              return res.status(404).render("error", { message: "Không tìm thấy sản phẩm" });
            }

            res.render("product/product-detail", {
              product: productdetail
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).send("Lỗi: " + err);
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Lỗi: " + err);
      });
  }
};

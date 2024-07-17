const bodyParser = require("body-parser");

// Model
const UserModel = require("../models/user");
const NewProductModel = require("../models/newproduct");

module.exports = {
  // Admin
  getAdmin: function(req, res, next) {
    var count = 0;
    UserModel.find()
      .then(user => {
        var data = user.filter(i => i.productNewOrder.order.length > 0);
        for (var i = 0; i < data.length; i++) {
          var js = JSON.parse(JSON.stringify(data[i].productNewOrder.order));
          console.log("data", js[0].sum);
        }
        res.render("admin/adminmanager", {
          path: "/admin",
          count: count,
          listusers: user,
          listorders: data,
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err.message
        });
      });
  },

  // Manager Users
  getManagerUsers: function(req, res, next) {
    req.session.isManager = false;
    var count = 0;
    UserModel.find()
      .then(user => {
        var data = user.filter(i => i.productNewOrder.order.length > 0);
        res.render("admin/list-user", {
          path: "/admin/list-user",
          count: count,
          listusers: user,
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err.message
        });
      });
  },

  // Update User
  getUpdate: function(req, res, next) {
    const userID = req.params._id;
    console.log("TCL: ", userID);
    UserModel.findById(userID)
      .then(user => {
        if (!user) {
          return res.redirect("/adminTin");
        }
        res.render("admin/updateusers", {
          user: user,
          alo: console.log(user.username)
        });
      })
      .catch(err => {
        console.log("TCL: ", err);
        res.status(500).json({
          error: err.message
        });
      });
  },

  postUpdateUser: function(req, res, next) {
    const userID = req.body._id;
    const {
      username,
      age,
      phone,
      role,
      email,
      address,
      created
    } = req.body;
    console.log("TCL: ", req.body._id);
    console.log("TCL: ", username);
    UserModel.findById(userID)
      .then(user => {
        if (!user) {
          return res.redirect("/adminTin");
        }
        user.username = username;
        user.age = age;
        user.phone = phone;
        user.role = role;
        user.email = email;
        user.address = address;
        user.created = created;
        return user.save();
      })
      .then(result => {
        console.log("Complete Updated Completed user!");
        res.redirect("/adminTin");
      })
      .catch(err => {
        console.log("TCL: ", err);
        res.status(500).json({
          error: err.message
        });
      });
  },

  // Remove User
  getRemoveUser: function(req, res, next) {
    const userID = req.params._id;
    console.log("ALOALO: " + userID);
    UserModel.deleteOne({
        _id: userID
      })
      .then(result => {
        console.log("Complete Delete Completed user!");
        res.redirect("/adminTin/managerusers");
      })
      .catch(err => {
        console.log("TCL: ", err);
        res.status(500).json({
          error: err.message
        });
      });
  },

  // List Order
  getListOrder: function(req, res, next) {
    req.session.isManager = false;
    var count = 0;
    UserModel.find()
      .then(user => {
        var data = user.filter(i => i.productNewOrder.order.length > 0);
        res.render("admin/list-order", {
          path: "/admin/list-order",
          count: count,
          listorder: data
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err.message
        });
      });
  },

  postlistOrder: function(req, res, next) {
    req.session.isManager = false;
    var {
      year
    } = req.body;
    console.log("TCL: year", year)

    var count = 0;
    UserModel.find()
      .then(user => {
        var data = user.filter(i => i.productNewOrder.order.length > 0);
        var data2 = data.filter(i => i.productNewOrder.createdOrder.indexOf(year) > 0);
        res.render("admin/list-order", {
          path: "/admin/list-order",
          yearorder: year,
          count: count,
          listorder: data2
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err.message
        });
      });
  },

  // List New Product
  getListNewProduct: function(req, res, next) {
    req.session.isManager = false;
    var count = 0;
    NewProductModel.find()
      .then(products => {
        res.render("admin/list-product", {
          path: "/admin/list-product",
          count: count,
          kind: 'allproducts',
          listproducts: products
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err.message
        });
      });
  },

  // List iPhone
  getListiPhone: function(req, res, next) {
    req.session.isManager = false;
    var count = 0;
    NewProductModel.find()
      .then(products => {
        var data = products.filter(i => i.category == "iPhone");
        console.log(data);
        res.render("admin/list-product", {
          path: "/admin/list-product",
          count: count,
          kind: 'iphone',
          listproducts: data
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err.message
        });
      });
  },

  // List Macbook
  getListMacbook: function(req, res, next) {
    req.session.isManager = false;
    var count = 0;
    NewProductModel.find()
      .then(products => {
        var data = products.filter(i => i.category == "Macbook");
        console.log(data);
        res.render("admin/list-product", {
          path: "/admin/list-product",
          count: count,
          kind: 'macbook',
          listproducts: data
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err.message
        });
      });
  },

  // List Apple Watch
  getListAppleWatch: function(req, res, next) {
    req.session.isManager = false;
    var count = 0;
    NewProductModel.find()
      .then(products => {
        var data = products.filter(i => i.category == "AppleWatch");
        console.log(data);
        res.render("admin/list-product", {
          path: "/admin/list-product",
          count: count,
          kind: 'applewatch',
          listproducts: data
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err.message
        });
      });
  },

  // List Airpod
  getListAirpod: function(req, res, next) {
    req.session.isManager = false;
    var count = 0;
    NewProductModel.find()
      .then(products => {
        var data = products.filter(i => i.category == "AirPods");
        console.log('alo ', data);
        res.render("admin/list-product", {
          path: "/admin/list-product",
          count: count,
          kind: 'airpods',
          listproducts: data
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err.message
        });
      });
  },

  // Remove New Product
  getRemoveNewProduct: function(req, res, next) {
    const newproductID = req.params._id;
    console.log("Product ID: " + newproductID);
    req.session.isManager = false;
    NewProductModel.deleteOne({
        _id: newproductID
      })
      .then(result => {
        console.log("Complete Delete Product!");
        res.redirect('/adminTin/managerproducts');
      })
      .catch(err => {
        console.log("TCL: ", err);
        res.status(500).json({
          error: err.message
        });
      });
  },

  // Update New Product
  getUpdateNewProduct: function(req, res, next) {
    const newproductID = req.params._id;
    console.log("TCL: ", newproductID);
    NewProductModel.findById(newproductID)
      .then(newproduct => {
        if (!newproduct) {
          return res.redirect("/adminTin");
        }
        res.render("admin/update-product", {
          airpods: newproduct,
          alo: console.log(newproduct.productname)
        });
      })
      .catch(err => {
        console.log("TCL: ", err);
        res.status(500).json({
          error: err.message
        });
      });
  },

  postUpdateNewProduct: function(req, res, next) {
    const newproductID = req.body._id;
    const {
      productname,
      imagePath,
      description,
      price,
      category,
      quantity,
      created
    } = req.body;
    console.log("TCL: ", newproductID);
    NewProductModel.findById(newproductID)
      .then(newproduct => {
        if (!newproduct) {
          return res.redirect("/adminTin");
        }
        newproduct.productname = productname;
        newproduct.imagePath = imagePath;
        newproduct.description = description;
        newproduct.price = price;
        newproduct.category = category;
        newproduct.quantity = quantity;
        newproduct.created = created;
        return newproduct.save();
      })
      .then(result => {
        console.log("Complete Updated Completed Product!");
        res.redirect("/adminTin/managerproducts");
      })
      .catch(err => {
        console.log("TCL: ", err);
        res.status(500).json({
          error: err.message
        });
      });
  },
  // Unused Post Test
  postTest: function(req, res, next) {
    // https://smartjob.vn/node-js-va-mongodb-huong-dan-ket-noi/
  }
};

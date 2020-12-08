
const Product = require('../models/product.model');

//Simple version, without validation or sanitation
exports.findAll = function (req, res) {

    Product.find()
        .then(products => {

            res.send(products);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving products."
            });
        });
};



// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (!req.body.email) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Create a Note
    const product = new Product({
        name: req.body.name || "Untitled Product",
        email: req.body.email
    });

    // Save Note in the database
    product.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
};

// Find a single note with a prodId
exports.findOne = (req, res) => {
    Product.findById(req.params.prodId)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.prodId
                });
            }
            res.send(product);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.prodId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Product with id " + req.params.prodId
            });
        });
};


// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.email) {
        return res.status(400).send({
            message: "product email can not be empty"
        });
    }


    // Find note and update it with the request body
    Product.findByIdAndUpdate(req.params.prodId, {
        name: req.body.name || "Untitled product",
        email: req.body.email
    }, { new: true })
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "product not found with id " + req.params.prodId
                });
            }
            res.send(product);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "product not found with id " + req.params.prodId
                });
            }
            return res.status(500).send({
                message: "Error updating product with id " + req.params.prodId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.prodId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "product not found with id " + req.params.prodId
            });
        }
        res.send({message: "product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "product not found with id " + req.params.prodId
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.prodId
        });
    });
};

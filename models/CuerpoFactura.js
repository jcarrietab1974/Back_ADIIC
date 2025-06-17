const mongoose = require("mongoose");

const CuerpoFacturaSchema = mongoose.Schema(
  {
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Productos",
      required: true,
    },
    descripcionProducto: {
      type: String,
      trim: true,
    },
    cantidadProducto: {
      type: Number,
      required: true,
      min: 1,
    },
    precioProducto: {
      type: mongoose.Decimal128,
      required: true,
    },
    descuentoProducto: {
      type: Number,
      default: 0,
      min: 0,
    },
    iva: {
      type: Number,
      default: 0,
      min: 0,
    },
    subtotal: {
      type: mongoose.Decimal128,
      required: true,
    },
    total: {
      type: mongoose.Decimal128,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CuerpoFactura", CuerpoFacturaSchema);

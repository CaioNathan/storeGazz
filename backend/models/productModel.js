import mongoose from 'mongoose';
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    reviews: [reviewSchema],
    productImages1: { type: String, required: true },
    productImages2: { type: String, required: true },
    productImages3: { type: String, required: true },
    productImages4: { type: String, required: true },
    productImages5: { type: String, required: true },
    condicao:{type: String},
    tamanhosDisponiveis:[
      {
      p:{ type: Boolean},
      m:{ type: Boolean},
      g:{ type: Boolean},
      gg:{ type: Boolean},
      num34:{ type: Boolean},
      num35:{ type: Boolean},
      num36:{ type: Boolean},
      num37:{ type: Boolean},
      num38:{ type: Boolean},
      num39:{ type: Boolean},
      num40:{ type: Boolean},
      num41:{ type: Boolean},
      num42:{ type: Boolean},
      num43:{ type: Boolean},
      num44:{ type: Boolean},
      }
    ],
    tamanho:{ type: String},
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('Product', productSchema);

export default Product;

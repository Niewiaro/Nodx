import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IProduct extends mongoose.Document {
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  userId: mongoose.Types.ObjectId;
}

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

export const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);


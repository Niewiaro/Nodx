import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IOrder extends mongoose.Document {
  products: Array<{
    product: any;
    quantity: number;
  }>;
  user: {
    email: string;
    userId: mongoose.Types.ObjectId;
  };
}

const orderSchema = new Schema<IOrder>({
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  user: {
    email: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  }
});

export const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);

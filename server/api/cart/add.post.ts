import { User } from '../../models/user';
import { Product } from '../../models/product';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { userId, productId } = body;

    if (!userId || !productId) {
      throw createError({
        statusCode: 422,
        statusMessage: 'User ID and Product ID are required',
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Product not found',
      });
    }

    await user.addToCart(product);

    return {
      success: true,
      message: 'Product added to cart',
      cart: user.cart,
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Error adding to cart',
      message: error.message,
    });
  }
});

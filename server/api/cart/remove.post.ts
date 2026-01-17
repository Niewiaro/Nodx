import { User } from '../../models/user';

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

    await user.removeFromCart(productId);

    return {
      success: true,
      message: 'Product removed from cart',
      cart: user.cart,
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Error removing from cart',
      message: error.message,
    });
  }
});

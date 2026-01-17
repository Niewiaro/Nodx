import { User } from '../../models/user';

export default defineEventHandler(async (event) => {
  try {
    const userId = getRouterParam(event, 'userId');
    
    if (!userId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'User ID is required',
      });
    }

    const user = await User.findById(userId).populate('cart.items.productId');
    
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      });
    }

    return {
      success: true,
      cart: user.cart,
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Error fetching cart',
      message: error.message,
    });
  }
});

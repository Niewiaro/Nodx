import { Order } from '../../models/order';

export default defineEventHandler(async (event) => {
  try {
    const userId = getRouterParam(event, 'userId');
    
    if (!userId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'User ID is required',
      });
    }

    const orders = await Order.find({ 'user.userId': userId });

    return {
      success: true,
      orders,
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Error fetching orders',
      message: error.message,
    });
  }
});

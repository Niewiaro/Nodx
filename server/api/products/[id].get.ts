import { Product } from '../../models/product';

export default defineEventHandler(async (event) => {
  try {
    const productId = getRouterParam(event, 'id');
    
    if (!productId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Product ID is required',
      });
    }

    const product = await Product.findById(productId).populate('userId', 'email');
    
    if (!product) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Product not found',
      });
    }

    return product;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Error fetching product',
      message: error.message,
    });
  }
});

import { Product } from '../../models/product';

export default defineEventHandler(async (event) => {
  try {
    const productId = getRouterParam(event, 'id');
    const body = await readBody(event);
    const { userId } = body;

    if (!productId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Product ID is required',
      });
    }

    const product = await Product.findById(productId);
    
    if (!product) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Product not found',
      });
    }

    // Sprawdzenie autoryzacji
    if (product.userId.toString() !== userId) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Not authorized to delete this product',
      });
    }

    await Product.deleteOne({ _id: productId, userId });

    return {
      success: true,
      message: 'Product deleted successfully',
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Error deleting product',
      message: error.message,
    });
  }
});

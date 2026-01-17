import { Product } from '../../models/product';

export default defineEventHandler(async (event) => {
  try {
    const productId = getRouterParam(event, 'id');
    const body = await readBody(event);
    const { title, price, description, imageUrl, userId } = body;

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

    // Sprawdzenie autoryzacji - czy użytkownik jest właścicielem produktu
    if (product.userId.toString() !== userId) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Not authorized to edit this product',
      });
    }

    // Aktualizacja pól
    if (title) product.title = title;
    if (price) product.price = price;
    if (description) product.description = description;
    if (imageUrl) product.imageUrl = imageUrl;

    await product.save();

    return {
      success: true,
      product,
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Error updating product',
      message: error.message,
    });
  }
});

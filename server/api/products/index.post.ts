import { Product } from '../../models/product';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { title, price, description, imageUrl, userId } = body;

    // Walidacja podstawowych pól
    if (!title || !price || !description || !imageUrl || !userId) {
      throw createError({
        statusCode: 422,
        statusMessage: 'All fields are required',
      });
    }

    const product = new Product({
      title,
      price,
      description,
      imageUrl,
      userId,
    });

    await product.save();

    return {
      success: true,
      product,
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Error creating product',
      message: error.message,
    });
  }
});

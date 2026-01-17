import { Product } from '../../models/product';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const userId = query.userId as string | undefined;

    // Build filter - if userId provided, filter by that user
    const filter = userId ? { userId } : {};

    const totalItems = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit)
      .populate('userId', 'email');

    return {
      products,
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      hasNextPage: limit * page < totalItems,
      hasPreviousPage: page > 1,
    };
  } catch (err: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Nie udało się pobrać produktów',
      message: err.message,
    });
  }
});


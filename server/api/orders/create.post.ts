import { Order } from '../../models/order';
import { User } from '../../models/user';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { userId } = body;

    if (!userId) {
      throw createError({
        statusCode: 422,
        statusMessage: 'User ID is required',
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      });
    }

    // Populuj produkty w koszyku
    await user.populate('cart.items.productId');

    // Przygotuj produkty do zamówienia
    const products = user.cart.items.map((item: any) => {
      return {
        quantity: item.quantity,
        product: { ...item.productId._doc }
      };
    });

    // Utwórz zamówienie
    const order = new Order({
      user: {
        email: user.email,
        userId: user._id
      },
      products: products
    });

    await order.save();
    
    // Wyczyść koszyk
    await user.clearCart();

    return {
      success: true,
      message: 'Order created successfully',
      order,
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Error creating order',
      message: error.message,
    });
  }
});

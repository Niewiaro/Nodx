import bcrypt from 'bcryptjs';
import { User } from '../../models/user';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, password, confirmPassword } = body;

    // Walidacja podstawowa
    if (!email || !password || !confirmPassword) {
      throw createError({
        statusCode: 422,
        statusMessage: 'All fields are required',
      });
    }

    if (password !== confirmPassword) {
      throw createError({
        statusCode: 422,
        statusMessage: 'Passwords do not match',
      });
    }

    // Sprawdź czy użytkownik już istnieje
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createError({
        statusCode: 422,
        statusMessage: 'Email already exists',
      });
    }

    // Hash hasła
    const hashedPassword = await bcrypt.hash(password, 12);

    // Utwórz nowego użytkownika
    const user = new User({
      email,
      password: hashedPassword,
      cart: { items: [] }
    });

    await user.save();

    return {
      success: true,
      message: 'User created successfully',
      userId: user._id,
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Error creating user',
      message: error.message,
    });
  }
});

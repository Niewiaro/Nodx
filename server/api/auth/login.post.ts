import bcrypt from 'bcryptjs';
import { User } from '../../models/user';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, password } = body;

    // Walidacja podstawowa
    if (!email || !password) {
      throw createError({
        statusCode: 422,
        statusMessage: 'Email and password are required',
      });
    }

    // Znajdź użytkownika
    const user = await User.findOne({ email });
    if (!user) {
      throw createError({
        statusCode: 422,
        statusMessage: 'Invalid email or password',
      });
    }

    // Sprawdź hasło
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw createError({
        statusCode: 422,
        statusMessage: 'Invalid email or password',
      });
    }

    // W Nuxt 3, sesje są zarządzane inaczej niż w Express
    // Możesz użyć cookies lub JWT tokens
    // Na razie zwracamy podstawowe informacje o użytkowniku
    return {
      success: true,
      user: {
        id: user._id,
        email: user.email,
      },
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Error logging in',
      message: error.message,
    });
  }
});

import bcrypt from 'bcryptjs';
import { User } from '../../models/user';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { token, password } = body;

    if (!token || !password) {
      throw createError({
        statusCode: 422,
        statusMessage: 'Token and password are required',
      });
    }

    // Znajdź użytkownika z ważnym tokenem
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }
    });

    if (!user) {
      throw createError({
        statusCode: 422,
        statusMessage: 'Invalid or expired token',
      });
    }

    // Zaktualizuj hasło
    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    return {
      success: true,
      message: 'Password updated successfully',
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Error updating password',
      message: error.message,
    });
  }
});

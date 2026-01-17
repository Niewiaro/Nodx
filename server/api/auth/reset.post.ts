import crypto from 'crypto';
import { User } from '../../models/user';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email } = body;

    if (!email) {
      throw createError({
        statusCode: 422,
        statusMessage: 'Email is required',
      });
    }

    // Znajdź użytkownika
    const user = await User.findOne({ email });
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'No account with that email found',
      });
    }

    // Wygeneruj token resetowania hasła
    const buffer = crypto.randomBytes(32);
    const token = buffer.toString('hex');

    // Zapisz token w bazie danych (ważny 1 godzinę)
    user.resetToken = token;
    user.resetTokenExpiration = new Date(Date.now() + 3600000);
    await user.save();

    // W prawdziwej aplikacji wyślesz email z linkiem resetującym
    // Na razie zwracamy token (w produkcji NIE rób tego!)
    return {
      success: true,
      message: 'Password reset token generated',
      token, // Usuń to w produkcji!
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Error resetting password',
      message: error.message,
    });
  }
});

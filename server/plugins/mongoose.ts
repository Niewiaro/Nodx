import mongoose from 'mongoose';

export default defineNitroPlugin(async (nitroApp) => {
  const config = useRuntimeConfig();

  try {
    await mongoose.connect(config.mongodbUri);
    console.log('Połączono z MongoDB');
  } catch (e) {
    console.error('Błąd połączenia z MongoDB:', e);
  }
});
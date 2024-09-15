import mongoose from 'mongoose'

export const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.NEXT_PUBLIC_DB_URI as string);
    console.log('Database connection successful to host:', connection.connection.host);
  } catch (error) {
    console.log(error)
    console.error('Database connection error:', error);
  }
}
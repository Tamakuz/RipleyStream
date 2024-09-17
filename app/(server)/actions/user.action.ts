"use server"

import { dbConnection } from "../db/dbConnection";
import User from "../models/user.model";
import crypto from "crypto-js";

export const createUser = async (email: string) => {
  try {
    await dbConnection()
    const user = await User.findOne({ email })
    if (user) return user
    const newUser = await User.create({ email, tokenApi: crypto.lib.WordArray.random(16).toString() })
    return newUser
  } catch (error) {
    console.error("Error creating user:", error)
    throw new Error("Failed to create user")
  }
}

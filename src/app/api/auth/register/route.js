// src/app/api/auth/register/route.js
import { getCollection } from "@/lib/db.connect"
import bcrypt from "bcrypt"

export async function POST(req) {
  try {
    const { name, email, password } = await req.json()

    const { usersCollection } = await getCollection() 

    //Check if the user already exist
    const existingUser = await usersCollection.findOne({ email })
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 })
    }

    //Hashed the password for user privacy
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      role: 'user'
    })

    return new Response(JSON.stringify({ success: true, userId: newUser.insertedId }), { status: 201 })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}

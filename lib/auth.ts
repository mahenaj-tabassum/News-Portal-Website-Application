import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const DB_URL = process.env.BETTER_AUTH_DATABASE_URL!;
const client = new MongoClient(DB_URL);
const db = client.db("news-website");

export const auth = betterAuth({
  //...other options
  emailAndPassword: {
    enabled: true,
  },

  database: mongodbAdapter(db, {
    client,
  }),
});

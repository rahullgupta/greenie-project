import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  try {
    const { username, password } = req.body;
    const existingUser = await prismadb.account.findUnique({
      where: {
        username,
      },
    });

    if (existingUser) return res.status(422).json({ error: "Username taken" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.account.create({
      data: {
        username,
        hashedPassword,
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}

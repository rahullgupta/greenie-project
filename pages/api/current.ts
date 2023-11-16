import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/lib/serverAuth";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();
  try {
    const currentUser = await serverAuth(req, res);

    const user = await prismadb.account.findUnique({
      where: {
        username: currentUser.username || "",
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}

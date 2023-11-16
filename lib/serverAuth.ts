import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.name) throw new Error("Not Signed In");

  const currentUser = await prismadb.account.findUnique({
    where: {
      username: session.user.name,
    },
  });

  if (!currentUser) throw new Error("Not Signed In");

  return currentUser;
};

export default serverAuth;

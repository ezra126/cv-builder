import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/libs/prismadb";

const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    // console.log("dcccdb               dshdfh", session?.user?.email);
    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });
    console.log("current user is", currentUser);
    console.log(
      session.user,
      "kkkiligent and even-tempered retail professional with 5 years of experience providing excellent customer service to technology enthusiasts. Highly responsive to customers' needs and always looking to find a solution to customer inquiries. A team player who goes the extra mile to ensure customers are satisfied."
    );
    if (!currentUser) {
      return null;
    }
    console.log("current user is", currentUser);
    return {
      ...currentUser,
      //   createdAt: currentUser.createdAt.toISOString(),
      //   updatedAt: currentUser.updatedAt.toISOString(),
      //   emailVerified:
      //     currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error) {
    return null;
  }
};

export default getCurrentUser;

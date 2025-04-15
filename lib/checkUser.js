import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";
import { getCachedUserData, cacheUserData } from "./redis";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    const cachedUser = await getCachedUserData(user.id);
    if (cachedUser) {
      return cachedUser;
    }

    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      await cacheUserData(user.id, loggedInUser);
      return loggedInUser;
    }

    const name = `${user.firstName} ${user.lastName}`;

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    await cacheUserData(user.id, newUser);
    return newUser;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
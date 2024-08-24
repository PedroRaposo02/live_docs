'use server';

import { clerkClient } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";
import { liveblocks } from "../liveblocks";


export const getClerkUsers = async ({userIds}: {userIds: string[]}) => {
  try {
    const {data} = await clerkClient().users.getUserList({
      emailAddress: userIds
    })

    const users : User[] = data.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      avatar: user.imageUrl
    })) as User[];

    const sortedUsers = userIds.map((email) => users.find((user) => user.email === email)).filter((user) => user !== undefined);

    return parseStringify(sortedUsers);
  } catch (error) {
    console.log(`Error happened while fetching users: ${error}`);  
  }
}

export const getDocumentUsers = async ({roomId, currentUser, text}: {roomId: string, currentUser: string, text: string}): Promise<string[]> => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const users = Object.keys(room.usersAccesses).filter((email) => email !== currentUser);

    let filteredUsers: string[] = []

    if (text.length) {
      const lowerCaseText = text.toLowerCase();
      
      filteredUsers = users.filter((email) => email.toLowerCase().includes(lowerCaseText));
    }

    return parseStringify(filteredUsers);
  } catch (error) {
    console.log(`Error happened while fetching users: ${error}`);
    return parseStringify([]);
  }
}
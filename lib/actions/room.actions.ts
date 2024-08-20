'use server';

import {v4 as uuidv4} from 'uuid';
import { liveblocks } from '../liveblocks';
import { revalidatePath } from 'next/cache';
import { parseStringify } from '../utils';
import { clerkClient } from '@clerk/nextjs/server';

export const createDocument = async ( {userId, email}: CreateDocumentParams) => {
  const roomId = uuidv4();

 try {
  const metadata = {
    creatorId: userId,
    email,
    title: 'Untitled'
  }
  
  // !DEBUG Add all users to accesses to test
  const allUsers = await clerkClient().users.getUserList();
  const usersAccesses: RoomAccesses = allUsers.data.reduce((acc: RoomAccesses, user) => {
    acc[user.emailAddresses[0].emailAddress] = ['room:write'];
    return acc;
  }, {});

  /* const usersAccesses: RoomAccesses = {
    [email]: ['room:write']
  } */

  const room = await liveblocks.createRoom(roomId, {
    metadata,
    usersAccesses,
    defaultAccesses: ['room:write']
  });

  revalidatePath(`/`);

  return parseStringify(room);
 } catch (error) {
  console.log(`Error happened while creating a room: ${error}`);
 }
}

export const getDocument = async ({roomId, userId}: {roomId: string, userId: string}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const hasAccess = Object.keys(room.usersAccesses).includes(userId);

    if(!hasAccess) {
      throw new Error('You do not have access to this document');
    }

    return parseStringify(room);
  } catch (error) {
    console.log(`Error happened while getting a room: ${error}`);
  }
}

export const getDocuments = async (email: string) => {
  try {
    const rooms = await liveblocks.getRooms({ userId: email})
    
    return parseStringify(rooms); 
  } catch (error) {
    console.log(`Error happened while getting rooms: ${error}`);
  }
}



export const updateDocument = async (roomId: string, title: string) => {
  try {
    const updatedRoom = await liveblocks.updateRoom(roomId, {
      metadata: {
        title
      }
    })

    revalidatePath(`/documents/${roomId}`);

    return parseStringify(updatedRoom);
  } catch (error) {
    console.log(`Error happened while updating a room: ${error}`);
    
  }
}
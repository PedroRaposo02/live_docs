import CollaborativeRoom from '@/components/CollaborativeRoom'
import { getDocument } from '@/lib/actions/room.actions'
import { getClerkUsers } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const Documents = async ({ params: { id } }: SearchParamProps) => {
  const clerkUser = await currentUser()

  if (!clerkUser) redirect('/sign-in')

  const room = await getDocument({
    roomId: id,
    userId: clerkUser.emailAddresses[0].emailAddress,
  })

  if (!room) redirect('/')

  const userIds = Object.keys(room.usersAccesses)
  const users = await getClerkUsers({ userIds })

  

  let usersData = users?.map((user: User) => {
    const hasWriteAccess = room.usersAccesses[user.email]?.some(
      (access) => access === 'room:write'
    )
    return {
      ...user,
      userType: hasWriteAccess ? 'editor' : 'viewer',
    } as User
  })

  if (!usersData) {
    usersData = []
  }

  const currentUserType = room.usersAccesses[
    clerkUser.emailAddresses[0].emailAddress
  ]?.some((access) => access === 'room:write')
    ? 'editor'
    : 'viewer'

  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom
        roomId={id}
        roomMetadata={room.metadata as RoomMetadata}
        users={usersData}
        currentUserType={currentUserType}
      />
    </main>
  )
}

export default Documents

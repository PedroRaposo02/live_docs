'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { createDocument } from '@/lib/actions/room.actions'
import { useRouter } from 'next/navigation'

const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {
  const [isCreating, setIsCreating] = useState(false)
  const router = useRouter()

  const addDocumentHandler = async () => {
    try {
      setIsCreating(true)
      const room = await createDocument({ userId, email })

      if (room) router.push(`/documents/${room.id}`)
      setIsCreating(false)
    } catch (error) {
      console.log(`${error}`)
    }
  }

  if (isCreating) {
    return (
      <Button
        type="submit"
        className="bg-blue-600 flex gap-1 shadow-md cursor-not-allowed">
        <Image
          src={'/assets/icons/loader.svg'}
          alt="loader"
          width={24}
          height={24}
        />
        <p className="hidden sm:block w-44">Creating blank document</p>
      </Button>
    )
  } else {
    return (
      <Button
        type="submit"
        className="bg-blue-600 flex gap-1 shadow-md hover:shadow-lg hover:bg-blue-800 transition-all"
        onClick={addDocumentHandler}>
        <Image src={'/assets/icons/add.svg'} alt="add" width={24} height={24} />
        <p className="hidden sm:block w-44">Start a blank document</p>
      </Button>
    )
  }
}

export default AddDocumentBtn

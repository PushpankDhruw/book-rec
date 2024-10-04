'use client'

import { useState } from 'react'
import Image from 'next/image'
import GenreSelection from '@/components/GenraSelection'

interface Book {
  title: string
  author: string
  cover_i: string
}

export default function Home() {
  const [recommendations, setRecommendations] = useState<Book[]>([])
  const [preferencesSubmitted, setPreferencesSubmitted] = useState(false)

  const handlePreferencesSubmit = async (genres: string[], people: string[]) => {
    setPreferencesSubmitted(true)
    const response = await fetch('/api/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ genres, people }),
    })

    const data = await response.json()
    setRecommendations(data.recommendations)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {!preferencesSubmitted ? (
        <GenreSelection onPreferencesSubmit={handlePreferencesSubmit} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 px-4">
          {recommendations.map((book, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                alt={book.title}
                width={200}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{book.title}</h3>
                <p className="text-gray-600">by {book.author}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
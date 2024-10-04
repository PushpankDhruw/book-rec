// frontend/app/search/page.tsx
'use client'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface Book {
  title: string;
  author: string;
  cover_i: string | null;
}

const SearchPage: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setSearchResults([]);
        return;
      }
      setIsFetching(true);
      const response = await fetch(`/api/search?query=${query}`);
      const data = await response.json();
      setSearchResults(data.results);
      setIsFetching(false);
    };

    fetchSearchResults();
  }, [query]);

  if (!query) {
    return <div>Please enter a search query.</div>;
  }

  if (isFetching) return <div>Loading...</div>;

  return (
    <div className="min-h-screen container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Search Results for {query}</h1>
      <div className="grid grid-cols-3 gap-4">
        {searchResults.map((book, index) => (
          <div key={index} className="p-4 bg-white text-black rounded-lg shadow-md">
            {book.cover_i ? (
              <Image
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                alt={book.title}
                width={200}
                height={300}
                className="w-full h-64 object-cover rounded-t-lg"
              />
            ) : (
              <div className="w-full h-64 flex items-center justify-center bg-gray-200 rounded-t-lg">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}
            <div className="p-4">
              <h3 className="text-xl font-bold">{book.title}</h3>
              <p className="text-gray-700">by {book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;

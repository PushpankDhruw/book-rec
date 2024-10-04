"use client";

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const HeaderHero: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ id: string; title: string }[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery) {
        setIsFetching(true);
        const response = await fetch(`/api/search?query=${searchQuery}`);
        const data = await response.json();
        setSearchResults(data.results);
        setIsFetching(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      router.push(`/search?query=${searchQuery}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-100">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
            <Link href="/books" className="text-blue-600 hover:text-blue-800">Books ▼</Link>
            <Link href="/people" className="text-blue-600 hover:text-blue-800">People ▼</Link>
            <Link href="/lists" className="text-blue-600 hover:text-blue-800">Lists</Link>
            <Link href="/series" className="text-blue-600 hover:text-blue-800">Series</Link>
            <Link href="/top-100" className="text-blue-600 hover:text-blue-800">Top 100</Link>
            <Link href="/blog" className="text-blue-600 hover:text-blue-800">Blog</Link>
          </div>
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="flex items-center border border-blue-600 rounded p-1">
              <Search className="text-blue-600 w-5 h-5" />
              <input
                type="text"
                placeholder="Search books"
                className="ml-2 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {isFetching && <span className="ml-2 text-blue-600">Loading...</span>}
            </form>
            <div className="border border-blue-600 rounded p-1">
              <span className="text-blue-600 font-bold">GOOD</span>
              <span className="text-blue-600">BOOKS</span>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 mt-20">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold text-blue-800 mb-4">
            Good Books
            <br />
            <span className="border-b-4 border-blue-600">— Find your next</span>
            <br />
            favorite book.
          </h1>
          <div className="bg-red-100 border border-red-300 rounded-full inline-flex items-center px-3 py-1 mb-6">
            <span className="text-red-500 font-bold text-xs mr-2">PRODUCT HUNT</span>
            <span className="text-red-700 font-bold text-sm">#1 Product of the Day</span>
          </div>
          <p className="text-gray-600 mb-8">
            — 9,500+ book recommendations from the most
            <br />
            successful and interesting people in the world.
          </p>
          <Link 
            href="/top-12" 
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            Top 12 most recommended books
            <svg 
              className="w-4 h-4 ml-1" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </Link>
        </div>

        {/* Render search results if available */}
        {searchResults.length > 0 && (
          <div className="container mx-auto px-4">
            <h2 className="text-xl text-black font-bold mt-6">Search Results:</h2>
            <ul>
              {searchResults.map((result) => (
                <li className='text-black' key={result.id}>{result.title}</li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default HeaderHero;

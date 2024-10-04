// frontend/components/GenreSelection.tsx
'use client'
import { useState } from 'react';

const genres = ['Fantasy', 'Sci-Fi', 'Mystery', 'Romance', 'Non-Fiction'];
const people = ['Elon Musk', 'Naval Ravikant', 'Bill Gates'];

interface GenreSelectionProps {
  onPreferencesSubmit: (selectedGenres: string[], selectedPeople: string[]) => void;
}

const GenreSelection: React.FC<GenreSelectionProps> = ({ onPreferencesSubmit }) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const togglePerson = (person: string) => {
    setSelectedPeople((prev) =>
      prev.includes(person) ? prev.filter((p) => p !== person) : [...prev, person]
    );
  };

  const handleSubmit = () => {
    onPreferencesSubmit(selectedGenres, selectedPeople);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl text-blackmb-4">Select Your Favorite Genres</h2>
      <div className="grid grid-cols-2 gap-2">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => toggleGenre(genre)}
            className={`p-2 rounded-lg ${selectedGenres.includes(genre) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          >
            {genre}
          </button>
        ))}
      </div>
      <h2 className="text-2xl text-black mt-4 mb-4">Select Your Favorite People</h2>
      <div className="grid grid-cols-2 gap-2">
        {people.map((person) => (
          <button
            key={person}
            onClick={() => togglePerson(person)}
            className={`p-2 rounded-lg ${selectedPeople.includes(person) ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}
          >
            {person}
          </button>
        ))}
      </div>
      <button onClick={handleSubmit} className="mt-4 p-2 bg-green-500 rounded-lg">Submit</button>
    </div>
  );
};

export default GenreSelection;

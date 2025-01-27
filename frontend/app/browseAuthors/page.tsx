'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BOOKS } from '../../queries/getBooks';
import { GET_AUTHORS } from '../../queries/getAuthors'; 
import { CREATE_AUTHOR } from '../../queries/createAuthor';
import { DELETE_AUTHOR } from '../../queries/deleteAuthor'; 
import { UPDATE_AUTHOR } from '../../queries/updateAuthor'; 

export default function BrowseBooks() {
  const { loading, error, data, refetch } = useQuery(GET_AUTHORS);
  const { data: booksData } = useQuery(GET_BOOKS); 
  const [createAuthor] = useMutation(CREATE_AUTHOR);
  const [deleteAuthor] = useMutation(DELETE_AUTHOR); 
  const [updateAuthor] = useMutation(UPDATE_AUTHOR); 
  const [isFormOpen, setIsFormOpen] = useState(false); 
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false); 
  const [name, setName] = useState('');
  const [biography, setBiography] = useState('');
  const [bornDate, setBornDate] = useState('');
  const [books, setBooks] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>(''); 
  const [authorToUpdate, setAuthorToUpdate] = useState<any>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAuthor({
      variables: { name, biography, bornDate },
      onCompleted: () => {
        setSuccessMessage('New author added successfully!');
        setIsFormOpen(false);
        refetch();
      },
      onError: (err) => {
        console.error("Error adding new author:", err);
      }
    });
  };

  const handleDelete = (id: string) => {
    deleteAuthor({
      variables: { deleteAuthorId: id },
      onCompleted: () => {
        setSuccessMessage('Author deleted successfully!');
        refetch();
      },
      onError: (err) => {
        console.error("Error deleting author:", err);
      }
    });
  };

  const handleRefresh = () => {
    refetch();
    setSuccessMessage('');
  };

  const handleUpdateFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authorToUpdate) {
      updateAuthor({
        variables: {
          updateAuthorId: authorToUpdate.id,
          biography,
          bornDate,
        },
        onCompleted: () => {
          setSuccessMessage('Author updated successfully!');
          setIsUpdateFormOpen(false);
          refetch();
        },
        onError: (err) => {
          console.error("Error updating author:", err);
        },
      });

    }
  };

  const handleOpenUpdateForm = (author: any) => {
    setAuthorToUpdate(author);
    setBiography(author.biography);
    setBornDate(author.born_date);
    setIsUpdateFormOpen(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-4xl font-bold mb-6">Authors</h1>
      
      {successMessage && (
        <div className="bg-green-500 text-white p-4 mb-6 rounded-md text-center">
          <p>{successMessage}</p>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 mt-2"
            onClick={handleRefresh}
          >
            Refresh
          </button>
        </div>
      )}

      <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 text-left">Name</th>
            <th className="border border-gray-300 p-2 text-left">About</th>
            <th className="border border-gray-300 p-2 text-left">Birth Date</th>
            <th className="border border-gray-300 p-2 text-left">Books</th>
            <th className="border border-gray-300 p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.getAuthors.map((author: any, index: number) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{author.name || 'Not Available'}</td>
              <td className="border border-gray-300 p-2">{author.biography || 'Not Available'}</td>
              <td className="border border-gray-300 p-2">{author.born_date || 'Not Available'}</td>
              <td className="border border-gray-300 p-2">
                {author.books.length > 0 
                  ? author.books.map((book: any) => book.title).join(', ') 
                  : 'Not Available'}
              </td>
              <td className="border border-gray-300 p-2 flex space-x-2">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                  onClick={() => handleOpenUpdateForm(author)} 
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                  onClick={() => handleDelete(author.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
      <div className="text-center mb-4">
        <button
          className="bg-green-400 text-white px-6 py-3 rounded-md hover:bg-green-500 transition"
          onClick={() => setIsFormOpen(true)}
        >
          Add New Author
        </button>
      </div>

     
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Add New Author</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="title"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="biography" className="block mb-2 text-sm font-medium text-gray-700">About</label>
                <textarea
                  id="biography"
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="bornDate" className="block mb-2 text-sm font-medium text-gray-700">Birth Date</label>
                <input
                  type="date"
                  id="bornDate"
                  value={bornDate}
                  onChange={(e) => setBornDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
                  onClick={() => setIsFormOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                >
                  Add Author
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

   
      {isUpdateFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Update Author</h2>
            <form onSubmit={handleUpdateFormSubmit}>
              <div className="mb-4">
                <label htmlFor="biography" className="block mb-2 text-sm font-medium text-gray-700">Biography</label>
                <textarea
                  id="biography"
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="bornDate" className="block mb-2 text-sm font-medium text-gray-700">Birth Date</label>
                <input
                  type="date"
                  id="bornDate"
                  value={bornDate}
                  onChange={(e) => setBornDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
                  onClick={() => setIsUpdateFormOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                >
                  Update Author
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

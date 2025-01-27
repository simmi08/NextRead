'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BOOKS } from '../../queries/getBooks';
import { GET_AUTHORS } from '../../queries/getAuthors';
import { CREATE_BOOK } from '../../queries/createBook';
import { DELETE_BOOK } from '../../queries/deleteBook'; 
import { UPDATE_BOOK } from '../../queries/updateBook';
import { ASSOCIATE_BOOK_WITH_AUTHORS } from '../../queries/associateBookWithAuthors';

export default function BrowseBooks() {
  const { loading, error, data, refetch } = useQuery(GET_BOOKS);
  const { data: authorsData } = useQuery(GET_AUTHORS);
  const [createBook] = useMutation(CREATE_BOOK);
  const [deleteBook] = useMutation(DELETE_BOOK);
  const [updateBook] = useMutation(UPDATE_BOOK);
  const [associateBookWithAuthors] = useMutation(ASSOCIATE_BOOK_WITH_AUTHORS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [authors, setAuthors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [bookToUpdate, setBookToUpdate] = useState<any>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBook({
      variables: { title, description, publishedDate },
      onCompleted: () => {
        setSuccessMessage('New book added successfully!');
        setIsFormOpen(false);
        refetch();
      },
      onError: (err) => {
        console.error("Error creating book:", err);
      }
    });
  };

  const handleDelete = (id: string) => {
    deleteBook({
      variables: { deleteBookId: id },
      onCompleted: () => {
        setSuccessMessage('Book deleted successfully!');
        refetch();
      },
      onError: (err) => {
        console.error("Error deleting book:", err);
      }
    });
  };

  const handleRefresh = () => {
    refetch();
    setSuccessMessage('');
  };

  const handleUpdateFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookToUpdate) {
      updateBook({
        variables: {
          updateBookId: bookToUpdate.id,
          description,
          publishedDate,
        },
        onCompleted: () => {
          setSuccessMessage('Book updated successfully!');
          setIsUpdateFormOpen(false);
          refetch();
        },
        onError: (err) => {
          console.error("Error updating book:", err);
        },
      });

     
      associateBookWithAuthors({
        variables: {
          bookId: bookToUpdate.id,
          authorIds: authors,
        },
        onCompleted: () => {
          setSuccessMessage('Authors associated successfully!');
          refetch();
        },
        onError: (err) => {
          console.error("Error associating authors with book:", err);
        }
      });
    }
  };

  const handleOpenUpdateForm = (book: any) => {
    setBookToUpdate(book);
    setDescription(book.description);
    setPublishedDate(book.published_date);
    setAuthors(book.authors.map((author: any) => author.id));
    setIsUpdateFormOpen(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-4xl font-bold mb-6">Books</h1>
      
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
            <th className="border border-gray-300 p-2 text-left">Title</th>
            <th className="border border-gray-300 p-2 text-left">Description</th>
            <th className="border border-gray-300 p-2 text-left">Published Date</th>
            <th className="border border-gray-300 p-2 text-left">Authors</th>
            <th className="border border-gray-300 p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.getBooks.map((book: any, index: number) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{book.title || 'Not Available'}</td>
              <td className="border border-gray-300 p-2">{book.description || 'Not Available'}</td>
              <td className="border border-gray-300 p-2">{book.published_date || 'Not Available'}</td>
              <td className="border border-gray-300 p-2">
                {book.authors.length > 0 
                  ? book.authors.map((author: any) => author.name).join(', ') 
                  : 'Not Available'}
              </td>
              <td className="border border-gray-300 p-2 flex space-x-2">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                  onClick={() => handleOpenUpdateForm(book)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                  onClick={() => handleDelete(book.id)}
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
          Add New Book
        </button>
      </div>

  
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Add New Book</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="publishedDate" className="block mb-2 text-sm font-medium text-gray-700">Published Date</label>
                <input
                  type="date"
                  id="publishedDate"
                  value={publishedDate}
                  onChange={(e) => setPublishedDate(e.target.value)}
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
                  Create Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    
      {isUpdateFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Update Book</h2>
            <form onSubmit={handleUpdateFormSubmit}>
              <div className="mb-4">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="publishedDate" className="block mb-2 text-sm font-medium text-gray-700">Published Date</label>
                <input
                  type="date"
                  id="publishedDate"
                  value={publishedDate}
                  onChange={(e) => setPublishedDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="authors" className="block mb-2 text-sm font-medium text-gray-700">Authors</label>
                <select
                  multiple
                  id="authors"
                  value={authors}
                  onChange={(e) => setAuthors([...e.target.selectedOptions].map(o => o.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                >
                  {authorsData?.getAuthors.map((author: any) => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </select>
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
                  Update Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

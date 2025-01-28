/* eslint-disable */

import styles from './page.module.css';


export default function Home() {
  return (
<div className="flex flex-col items-center min-h-screen">
  <div className="border-2 border-gray-300 mt-3 mb-3">
    <img src="/logoNR.PNG" alt="Logo" className="w-32 h-32" />
  </div>
  <p className={`text-xl font-semibold font-mono font-medium mt-4 ${styles.typingEffect}`}>
    Your Next Read Recommendations
  </p>

  <div className="flex flex-wrap justify-center mt-8 space-x-4">

    <div className="bg-white shadow-lg rounded-lg p-6 max-w-xs flex flex-col items-center cursor-pointer hover:shadow-xl transition duration-300 ease-in-out">
      <i className="fas fa-users text-4xl text-blue-500 mb-4"></i>
      <p className="text-xl font-semibold text-gray-700 mb-2">Browse by Authors</p>
      <p className="text-gray-600 text-center mb-4">Explore books by your favorite authors.</p>
      <a href="/browseAuthors" className="text-blue-500 hover:underline">Go to Authors</a>
    </div>

 
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-xs flex flex-col items-center cursor-pointer hover:shadow-xl transition duration-300 ease-in-out">
      <i className="fas fa-book text-4xl text-green-500 mb-4"></i>
      <p className="text-xl font-semibold text-gray-700 mb-2">Browse Books</p>
      <p className="text-gray-600 text-center mb-4">Discover new books to add to your collection.</p>
      <a href="/browseBooks" className="text-green-500 hover:underline">Go to Books</a>
    </div>
  </div>
</div>

  );
}

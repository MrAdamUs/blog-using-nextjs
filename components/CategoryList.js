/* eslint-disable @next/next/link-passhref */
import Link from 'next/link';

export default function CategoryList({ categories }) {
  return (
    <div className='w-full p-5 bg-white rounded-lg shadow-md mt-6'>
      <h3 className='text-2xl bg-gray-800 text-white p-3 rounded'>
        Blog Categories
      </h3>
      <ui className='divide-y divide-gray-300'>
        {categories.map((cat, i) => (
          <Link key={i} href={`/blog/category/${cat.toLowerCase()}`}>
            <li className='p-4 cursor-pointer hover:bg-gray-50'>{cat}</li>
          </Link>
        ))}
      </ui>
    </div>
  );
}

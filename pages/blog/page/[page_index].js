import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Layout from '../../../components/Layout';
import Link from 'next/link';
import Post from '../../../components/Post';
import { sortByDate } from '../../../utils';
import { POST_PER_PAGE } from '../../../config';

export default function BlogPage({ posts, numPages, currentPage }) {
  return (
    <Layout>
      <h1 className='text-5xl border-b-4 p-6 font-bold'>Blog</h1>
      <div className='grid  md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));

  const numPages = Math.ceil(files.length / POST_PER_PAGE);

  let paths = [];
  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const page = parseInt((params && params.page_index) || 1);

  const files = fs.readdirSync(path.join('posts'));

  const posts = files.map((fileName) => {
    const slug = fileName.replace('.md', '');

    const markdownWithMeta = fs.readFileSync(
      path.join('posts', fileName),
      'utf-8'
    );
    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });
  const numPages = Math.ceil(files.length / POST_PER_PAGE);
  const pageIndex = page - 1;
  const orderdPosts = posts
    .sort(sortByDate)
    .slice(pageIndex * POST_PER_PAGE, (pageIndex + 1) * POST_PER_PAGE);

  return {
    props: { posts: orderdPosts, numPages, currentPage: page },
  };
}
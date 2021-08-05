import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Layout from '../components/Layout'

export default function HomePage() {
  return (
    <Layout >
      <h1>Hello world</h1>
    </Layout>
  )
}


export async function getStaticProps() {
  const files  = fs.readdirSync(path.join('posts'))

   const posts = files.map(fileName => {
     const slug = fileName.replace('.md', '')

     const markdownWithMeta = fs.readFileSync(path.join('posts', fileName), 'utf-8')
 const {data: frontmatter} = matter(markdownWithMeta)
 
     return {
       slug,
       frontmatter
     }
   })
  console.log(posts)
  return {
    props: {}
  }
}
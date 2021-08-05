import Head from 'next/head'
import Header from './Header'

export default function Layout({title, children, keywords, description}) {
  return (
    <div>
        <Head>
           <title>{title}</title>
           <meta name="keywords" content={keywords} />
           <meta name="description" content={description} />
           <link rel='icon' herf="/favicon.icon" />
        </Head>
        <Header />
        <main className="container mx-auto my-7">
          {children}
        </main>
    </div>
  )
}


Layout.defaultProps = {
  title: 'Welcome to DevSpace',
  keywords: 'development, coding, programming',
  description: "Mr Adam the best"
}
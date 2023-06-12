import { FC, ReactNode, memo } from 'react'
// import { Header } from 'components'

type Title = {
  title: string
  children: ReactNode
}
const Layout: FC<Title> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-mono text-gray-800">
      {/* <Head>
        <title>{title}</title>
      </Head>
      <header>
        {router.pathname !== '/login' && router.pathname !== '/signup' && (
          <Header />
        )}
      </header> */}
      <main className="flex w-screen flex-1 flex-col items-center justify-center">
        {children}
      </main>
      <footer className="flex h-12 w-full items-center justify-center border-t">
        <div>
          <p className="text-sm text-gray-600">&copy; 2023 Sekiguchi</p>
        </div>
      </footer>
    </div>
  )
}

export default memo(Layout)
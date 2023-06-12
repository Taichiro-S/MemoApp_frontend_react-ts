// import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className="bg-neutral-800 h-10 flex items-center">
      {/* <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex justify-between items-center">
          <Link to="/">
            <p className="text-lg text-neutral-50 font-bold flex items-center">
              <span>
                <MapPinIcon className="h-6 w-6 mr-2 text-neutral-50" />
              </span>
              TaskFlow
            </p>
          </Link>
          <div className="flex justify-end items-center">
            {!sessionUser || sessionUser === null ? (
              <>
                <li>
                  <Link to="/">
                    <span
                      className={
                        router.pathname === '/'
                          ? ' text-blue-400 mx-1 px-2 py-2 border-t-2 border-blue-400 text-sm font-medium'
                          : ' text-gray-400 hover:bg-gray-700 hover:text-white mx-1 px-2 py-2 rounded-md text-sm font-medium'
                      }
                    >
                      Home
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/demo">
                    <span
                      className={
                        router.pathname === '/demo'
                          ? ' text-blue-400 mx-1 px-2 py-2 border-t-2 border-blue-400 text-sm font-medium'
                          : ' text-gray-400 hover:bg-gray-700 hover:text-white mx-1 px-2 py-2 rounded-md text-sm font-medium'
                      }
                    >
                      Demo
                    </span>
                  </Link>
                </li>
                <li className="ml-2">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      router.push('/login')
                    }}
                    startIcon={<LoginIcon />}
                    size="small"
                    style={{
                      backgroundColor: '#2196f3',
                    }}
                  >
                    Login
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">
                    <span
                      className={
                        router.pathname === '/'
                          ? ' text-blue-400 mx-1 px-2 py-2 border-t-2 border-blue-400 text-sm font-medium'
                          : ' text-gray-400 hover:bg-gray-700 hover:text-white mx-1 px-2 py-2 rounded-md text-sm font-medium'
                      }
                    >
                      Home
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">
                    <span
                      className={
                        router.pathname === '/dashboard'
                          ? ' text-blue-400 mx-1 px-2 py-2 border-t-2 border-blue-400 text-sm font-medium'
                          : ' text-gray-400 hover:bg-gray-700 hover:text-white mx-1 px-2 py-2 rounded-md text-sm font-medium'
                      }
                    >
                      Dashboard
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/demo">
                    <span
                      className={
                        router.pathname === '/demo'
                          ? ' text-blue-400 mx-1 px-2 py-2 border-t-2 border-blue-400 text-sm font-medium'
                          : ' text-gray-400 hover:bg-gray-700 hover:text-white mx-1 px-2 py-2 rounded-md text-sm font-medium'
                      }
                    >
                      Demo
                    </span>
                  </Link>
                </li>
                <li className="">
                  <Link to="/account">
                    <span
                      className={
                        router.pathname === '/account'
                          ? ' text-blue-400 mx-1 px-2 py-2 border-t-2 border-blue-400 text-sm font-medium'
                          : ' text-gray-400 hover:bg-gray-700 hover:text-white mx-1 px-2 py-2 rounded-md text-sm font-medium'
                      }
                    >
                      Account
                    </span>
                  </Link>
                </li>
                <li className="ml-2">
                  <form onSubmit={handleSubmit}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<LoginIcon />}
                      size="small"
                      type="submit"
                      style={{
                        backgroundColor: '#f87171',
                      }}
                    >
                      Logout
                    </Button>
                  </form>
                </li>
              </>
            )}
          </div>
        </ul>
      </div> */}
    </nav>
  )
}

export default Header
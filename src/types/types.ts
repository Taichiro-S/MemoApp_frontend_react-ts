export type Task = {
  id: number
  userId: number
  user: User
  title: string
  description: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

export type NewTask = {
  userId: number
  title: string
  description: string
  completed: boolean
}

export type UpdatedTask = {
  id: number
  page: number
  title: string
  description: string
  completed: boolean
}

export type DeletedTask = {
  id: number
  page: number
}

export type User = {
  id: number
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export type SignUpUserData = {
  name: string
  email: string
  password: string
  repassword: string
}

export type LogInUserData = {
  email: string
  password: string
}

export type errorResponse = {
  config: any
  data: any
  headers: any
  request: any
  status: number
  statusText: string
}

export type paginatedResponse = {
  data: Task[]
  links: {
    first: string
    last: string
    next: string | null
    prev: string | null
  }
  meta: {
    current_page: number
    from: number
    last_page: number
    links: any[]
    path: string
    per_page: number
    to: number
    total: number
  }
}

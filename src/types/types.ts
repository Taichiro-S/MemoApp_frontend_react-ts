export type Task = {
  id: string
  user_id: string
  title: string
  description: string
  priority: string
  completed: boolean
  start: string
  end: string
  created_at: string
  updated_at: string
}

export type User = {
  id: string
  name: string
  email: string
  password: string
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

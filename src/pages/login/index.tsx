import { LoginForm } from '@/features/login'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-orange-50">
      <div className="flex w-3/12 flex-col  gap-32 rounded-2xl bg-white p-32 shadow-md phones:w-10/12">
        <Link to="/">
          <img src="/img/logo.png" alt="PPDB" className="p-24" />
        </Link>
        <LoginForm />
        <p className="text-right text-[1.8rem] text-blue-900 hover:cursor-pointer hover:text-blue-700">
          Forgot Password?
        </p>
      </div>
    </div>
  )
}

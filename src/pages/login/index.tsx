import { LoginForm } from '@/features/login'
import { setStateJenjang } from '@/store/reducer/stateJenjang'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Login() {
  const dispatch = useDispatch()

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-orange-50">
      <div className="flex w-3/12 flex-col  gap-32 rounded-2xl bg-white p-32 shadow-md phones:w-10/12">
        <Link to="/">
          <img src="/img/logo.png" alt="PPDB" className="p-24" />
        </Link>
        <LoginForm />
        <div className="flex justify-between gap-32">
          <div className="flex flex-col gap-8">
            <Link
              to="/daftar?jenjang=sd"
              onClick={() => {
                dispatch(setStateJenjang({ tingkatan: 'sd' }))
              }}
              className="text-[1.8rem] text-blue-900 hover:cursor-pointer hover:text-blue-700"
            >
              Daftar akun SD
            </Link>
            <Link
              to="/daftar?jenjang=smp"
              onClick={() => {
                dispatch(setStateJenjang({ tingkatan: 'smp' }))
              }}
              className="text-[1.8rem] text-blue-900 hover:cursor-pointer hover:text-blue-700"
            >
              Daftar akun SMP
            </Link>
          </div>
          <p className="text-right text-[1.8rem] text-blue-900 hover:cursor-pointer hover:text-blue-700">
            Lupa Password?
          </p>
        </div>
      </div>
    </div>
  )
}

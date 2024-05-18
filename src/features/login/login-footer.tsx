import { setStateJenjang } from '@/store/reducer/stateJenjang'
import { User, User2 } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function LoginFooter({ disabled }: { disabled: boolean }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div className="mb-32 flex w-full items-center justify-center">
      <div className="flex w-4/6 flex-col gap-24 phones:w-full">
        <div className="flex items-center">
          <hr className="flex-1 border" />
          <p className="w-80 border p-8 text-center font-mono text-[2rem] uppercase">
            atau
          </p>
          <hr className="flex-1 border" />
        </div>
        <div className="flex">
          <button
            type="button"
            disabled={disabled}
            onClick={() => {
              dispatch(setStateJenjang({ tingkatan: 'sd' }))
              navigate('/')
            }}
            className="flex w-full items-center justify-center gap-x-8 bg-danger-100 py-12 text-[2rem] text-white hover:bg-danger-300 disabled:cursor-not-allowed disabled:bg-danger-tint-1 phones:w-full"
          >
            <User size={16} />
            <p>Daftar Akun SD</p>
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={() => {
              dispatch(setStateJenjang({ tingkatan: 'smp' }))
              navigate('/')
            }}
            className="flex w-full items-center justify-center gap-x-8 bg-primary py-12 text-[2rem] text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-primary-400 phones:w-full"
          >
            <User2 size={16} />
            <p>Daftar Akun SMP</p>
          </button>
        </div>
      </div>
    </div>
  )
}

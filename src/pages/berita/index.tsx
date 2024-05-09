import { getJenjangSlice } from '@/store/reducer/stateJenjang'
import { useSelector } from 'react-redux'

export default function Berita() {
  const tingkatan = useSelector(getJenjangSlice)
  return (
    <div className="">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit odit,
      quo consequuntur obcaecati a similique, corporis dicta ex ut quia
      possimus! Animi beatae, rerum obcaecati illum mollitia similique dolor
      perspiciatis?
      <p className="text-[4rem]">{tingkatan?.tingkatan}</p>
    </div>
  )
}

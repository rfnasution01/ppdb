import Loading from '@/components/atoms/Loading'
import { SliderType } from '@/libs/types'
import { useGetSliderQuery } from '@/store/slices/sliderAPI'
import { useEffect, useState } from 'react'

export function Banner() {
  const [slider, setSlider] = useState<SliderType[]>()
  const {
    data: getSlider,
    isFetching: isFetchingSlider,
    isLoading: isLoadingSlider,
  } = useGetSliderQuery()

  useEffect(() => {
    if (getSlider?.data) {
      setSlider(getSlider?.data)
    }
  }, [getSlider?.data])

  //   const [showIndex, setShowIndex] = useState<number>(0)

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       if (showIndex >= slider?.length - 1) {
  //         setShowIndex(0)
  //       } else {
  //         setShowIndex(showIndex + 1)
  //       }
  //     }, 3000)

  //     return () => clearInterval(interval)
  //   }, [showIndex])

  const isLoading = isLoadingSlider || isFetchingSlider

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <img
          src={slider?.[0]?.gambar}
          alt={slider?.[0]?.urutan}
          className="h-[40vh] w-full object-cover phones:h-[30vh]"
        />
      )}
    </>
  )
}

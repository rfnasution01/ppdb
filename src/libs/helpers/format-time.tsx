import React from 'react'
import dayjs from 'dayjs'

interface Props {
  uploadTime: string
}

const TimeSinceUploaded: React.FC<Props> = ({ uploadTime }) => {
  const calculateTimeDifference = () => {
    const currentTime = dayjs()
    const uploadedTime = dayjs(uploadTime)

    const timeDifference = currentTime.diff(uploadedTime, 'minute')

    if (timeDifference < 1) {
      return 'Baru saja'
    } else if (timeDifference < 60) {
      return `${timeDifference} menit yang lalu`
    } else if (timeDifference < 24 * 60) {
      const hours = Math.floor(timeDifference / 60)
      return `${hours} jam yang lalu`
    } else if (timeDifference < 7 * 24 * 60) {
      const days = Math.floor(timeDifference / (24 * 60))
      return `${days} hari yang lalu`
    } else if (timeDifference < 30 * 24 * 60) {
      const weeks = Math.floor(timeDifference / (7 * 24 * 60))
      return `${weeks} minggu yang lalu`
    } else {
      const months = Math.floor(timeDifference / (30 * 24 * 60))
      return `${months} bulan yang lalu`
    }
  }

  return <div>{calculateTimeDifference()}</div>
}

export default TimeSinceUploaded

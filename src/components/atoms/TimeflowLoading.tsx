import ReactLoading, { LoadingProps } from 'react-loading'

export const TimeflowLoading = ({
  width = '3.2rem',
  height = '3.2rem',
  color = '#400053',
}: LoadingProps) => {
  return (
    <div className="flex h-full items-center justify-center">
      <ReactLoading width={width} height={height} color={color} type="spin" />
    </div>
  )
}

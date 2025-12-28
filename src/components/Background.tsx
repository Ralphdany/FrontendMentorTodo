
interface BackgroundProps {
    imageUrl: string;
}
const Background = ({imageUrl}: BackgroundProps) => {
  return (
    <header>
      <img src={imageUrl} alt="Header background" className="w-full"/>
    </header>
  )
}

export default Background
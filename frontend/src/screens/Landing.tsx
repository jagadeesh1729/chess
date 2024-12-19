import { useNavigate } from "react-router-dom"
import chess from "../assets/chess.png"
import Button from "../components/Button"

const Landing = () => {
    const navigate=useNavigate()
    const handleClick=()=>{
        navigate("/game")
    }
  return (
    <div className="flex justify-center px-4 sm:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-screen-lg gap-8">
        {/* Image Section */}
        <div className="md:pl-40 pt-8 md:pt-14 flex justify-center md:justify-start">
          <img src={chess} alt="Chess" className="w-full max-w-sm md:max-w-md" />
        </div>

        {/* Text Section */}
        <div className="flex flex-col md:pl-20 justify-center text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
            Play Chess Online on the #1 Site!
          </h1>
          <div className="pt-6">
            <Button onClick={handleClick} text={"Play Online"}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing

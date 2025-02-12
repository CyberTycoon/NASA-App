import Footer from "./components/Footer"
import SideBar from "./components/SideBar"
import Main from "./components/Main"
import { useEffect, useState } from "react"

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(true)

  function handleToggleModal(){
    setShowModal(!showModal)
  }
  
  useEffect(() => {
    async function fetchApiData(){
      const apiKey = import.meta.env.VITE_NASA_API_KEY;
      const url = 'https://api.nasa.gov/planetary/apod?api_key=1MtsZJDSderYKXVS8QuuIVxTvtexGK1XBIc0kcP1' 

      const today = (new Date()).toDateString()
      const localKey =  `NASA-${today}`
      if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey))
        setData(apiData)
        console.log('Fetched From Cache Today')
        return
      }
      localStorage.clear()
     

    try {
       const res = await fetch(url)
       const apiData = await res.json()
       localStorage.setItem(localKey, JSON.stringify(apiData))
       setData(apiData)
       console.log('Fetched From API Today')
    } catch (err) {
      console.log(err.message)
    }
    
    }
    fetchApiData()
  }, [])

  return (
    <>
    {data ? (<Main data={data}/>) : (
      <div className="loadingState">
        <i className="fa-solid fa-gear"></i>
      </div>
    )}
    {showModal && (<SideBar data={data} handleToggleModal={handleToggleModal}/>) } 
    {data && (<Footer data={data} handleToggleModal = {handleToggleModal}/>)}
    </>
  )
}

export default App

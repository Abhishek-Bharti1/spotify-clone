import AlbumCard from "../components/AlbumCard";
import Layout from "../components/Layout"
import SongCard from "../components/SongCard";
import { useSongData } from "../context/SongContext"

const Home = () => {
  const {albums,songs} = useSongData();
  return (
  <div>
    <Layout>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto gap-4">
          {
            albums?.map((e,i)=>(
              <AlbumCard key={i} image={e.thumbnail} name={e.title} desc={e.description} id={e.id}/>
            ))
          }
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
        <div className="flex overflow-auto gap-4">
          {
            songs?.map((e,i)=>(
              <SongCard key={i} image={e.thumbnail} name={e.title} desc={e.description} id={e.id}/>
            ))
          }
        </div>
      </div>
    </Layout>
  </div>
  )
}

export default Home
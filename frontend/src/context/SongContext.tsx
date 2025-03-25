import axios from "axios";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const server = "http://localhost:8000";

export interface Song {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  audio: string;
  album: string;
}
export interface Album {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

interface SongContextType {
  songs: Song[],
  isPlaying: boolean,
  setIsPlaying: (value: boolean) => void,
  loading: boolean,
  selectedSong: string | null,
  setSelectedSong: (id: string) => void,
  albums:Album[],
  fetchSingleSong:()=>Promise<void>,
  song:Song | null,
  nextSong:()=>void,
  prevSong:()=>void,

}

const SongContext = createContext<SongContextType | undefined>(undefined);

interface SongProviderProps {
  children: ReactNode;
}

export const SongProvider: React.FC<SongProviderProps> = ({ children }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [index,setIndex] = useState<number>(0);
  const fetchSongs = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<Song[]>(`${server}/api/v1/song/all`);
      setSongs(data);
      if (data.length > 0) {
        setSelectedSong(data[0].id.toString());
        // setIsPlaying(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);
  const fetchSingleSong = useCallback(async () => {
    // setLoading(true);
    if(!selectedSong) return;
    try {
      const { data } = await axios.get<Song>(`${server}/api/v1/song/${selectedSong}`);
      setSong(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [selectedSong]);
  const fetchAlbums = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<Album[]>(`${server}/api/v1/album/all`);
      setAlbums(data);
   
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);
const nextSong = useCallback(()=>{
if(index === songs.length - 1){
  setIndex(0);
  setSelectedSong(songs[0].id.toString());
}else{
  setIndex((prevIndex)=>prevIndex + 1);
  setSelectedSong(songs[index+1]?.id.toString());
}
},[index,songs]);
const prevSong = useCallback(()=>{
  if(index > 0){
    setIndex((prev)=>prev-1);
    setSelectedSong(songs[index-1]?.id.toString());
  }
  },[index,songs]);
  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, []);
  return (
    <SongContext.Provider
      value={{
        songs,
        selectedSong,
        setSelectedSong,
        isPlaying,
        setIsPlaying,
        loading,
        albums,
        fetchSingleSong,
        song,
        nextSong,
        prevSong
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const useSongData = (): SongContextType => {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error("useSongData must be use in song provide");
  }
  return context;
};

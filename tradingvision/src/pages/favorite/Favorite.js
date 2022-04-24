import React, {useState, useEffect} from 'react'
import FavoriteInfo from '../../components/favorite/FavoriteInfo'
import FavoriteEmpty from '../../components/favorite/FavoriteEmpty'
import Login from '../login/Login'
import axios from 'axios'
import useStyles from './style'
import {CircularProgress} from '@material-ui/core'

const Favorite = ({user}) => {
  const [favorites, setFavorite] = useState([])
  const classes = useStyles()
  const [loading, setLoading] = useState(true)

  useEffect(() =>{
    // getFavorite();
 
    axios.get(`/api/favorites`)
        .then((response) =>{
          setFavorite(response.data.favorites)
          setLoading(false)
        });
  },[])

  // const getFavorite = async() => {
  //   setLoading(true)
    
  //   const interval = await setInterval(() =>{
  //     axios.get(`/api/favorites`)
  //       .then((response) =>{
  //         setFavorite(response.data.favorites)
  //         setLoading(false)
  //       });
  //   }, 1000)
	// 	return () => {
	// 	clearInterval(interval);
	// 	};
    
  // }

  
  return (
    <div>
      { user ? (
        <>
          {loading ? (
            <div className={classes.loading_spinner}>
						  <CircularProgress style={{ backgroundColor: "primary" }}/>
						</div>
          ):(
            <>
              {favorites.length === 0 ?(
                <FavoriteEmpty/>
          ) : (
              <FavoriteInfo favorites = {favorites}
                setFavorite = {setFavorite}

              />
          )}
            </>
          )}

        </>
      ) : (
        <Login/>
      )
    }
    </div>
    
    
  )
}

export default Favorite
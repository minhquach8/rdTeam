import { Button, 
         Container, 
         Typography, 
         Box,
         Link,
        } from '@material-ui/core'
import React from 'react'
import useStyles from './style'
import {useNavigate} from "react-router-dom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

var GifPlayer = require("react-gif-player");
const PageNotFound = () => {
    const classes = useStyles()
    const history = useNavigate();
  return (
    <div className={classes.banner}>
        <Container  className={classes.bannerContent}>
            <div className={classes.tagline}>

                <Typography
                            variant="h1"
                            style={{
                            fontWeight: "bold",
                            marginBottom: 15,
                            fontFamily: "Montserrat",
                            }}
                        >
                            Oops! 
                        </Typography>
                <GifPlayer gif=".././404.gif" autoplay={true} className={classes.gif}/>
                {/* <Typography
                            variant="h4"
                            style={{
                            fontWeight: "bold",
                            marginBottom: 15,
                            fontFamily: "Montserrat",
                            }}>
                   404 - PAGE NOT FOUND
                </Typography> */}
                {/* <Button 
                    onClick={() => {history("/");} }
                    variant="outlined"
                    className={classes.btn}>
                    BACK TO HOMEPAGE
                </Button> */}
                <Link 
                    onClick={() => {history("/")}}
                    component="button"
                    variant="h5"
                    style={{color: '#fff', fontFamily: "Montserrat"}}>
                <NavigateNextIcon style={{height: "25px", width: "25px",}} /> BACK TO HOMEPAGE
                </Link>
            </div>
        </Container>

    </div>
  )
}

export default PageNotFound
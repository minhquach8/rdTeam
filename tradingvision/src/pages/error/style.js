import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles(() =>({
    
    bannerContent:{
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    },
    tagline: {
        display: "flex",
        height: "40%",
        marginTop: "30%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",

      },
    btn :{
        fontFamily: "Montserrat",
        fontWeight: "bold",
        backgroundColor: "rgb(55,58,109)",
        color: "white",
        width: "200px",
        height: "50px",
        borderRadius: "2%",
        marginLeft: "42%",
        marginBottom: "5%",
        '&:hover' :{
            backgroundColor: "#777bb8",
        }

    },
    gif:{
        height: "450px",
        width: "750px",
    }
}))

export default useStyles
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme)=>({
    container:{
        backgroundColor: "black",
        paddingLeft: '2%',
        paddingRight:'2%',
        fontFamily: "Montserrat",
    },
    title:{
        paddingTop: 25,
        paddingBottom: 30,
        fontFamily: "Montserrat",
        
    },
    field:{
        fontFamily: "Montserrat",
       
    },
    name:{
        fontFamily: "Montserrat",
        fontWeight: "bold",
        
    },
    line:{
        border: 'solid #FF9936',
        height: '100%',
        width: '100px',
        marginTop: '1px',
    },
    fav_border: {
        marginLeft: "30px",
        marginTop: "-20px", 
        padding: "-3px",
    },
    divider: {
        height:"30px",
        width: "3px",
        marginLeft: "2%",
        marginRight: "2%",
        display: "block",
        backgroundColor: "#FF9936",		
        [theme.breakpoints.down('sm')]: {
            marginLeft: "9%",           
          },
    },
    // -------------------- graph ---------------------
    graph:{
        marginTop: "20px",
        marginBottom: "20px",
    },
    button: {
        cursor: "pointer",
        radial: "3px",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        backgroundColor: "rgb(55,58,109)",
        color: "white",
        '&:hover' :{
            backgroundColor: "#777bb8",
        }
    },
    // -------------------loading progress -------------------
    loading:{
        marginTop: "20%",
        marginLeft: "50%",
        marginBottom: "20%",
    },
    loading_spinner:{
        marginTop: "40%",
        marginLeft: "50%",
        marginBottom: "20%",
    },
    //-------------------------- toast ----------------------
    toast:{
        fontFamily: "Montserrat",
        fontSize: "14px",
        color: "white",
        },
    
}))


export default useStyles
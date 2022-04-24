import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme)=>({
    tablehead:{
        backgroundColor:"black",
      },
      tablecell:{
        color: "white",
        fontWeight: "700",
        fontFamily: "Montserrat",
        backgroundColor:"black",
        borderBottom: "1.5px solid #AEAEAE",
      },
      row: {
        cursor: "pointer",
        fontFamily: "Montserrat",
        backgroundColor: "black",
        
        '&:hover': {
          backgroundColor: "rgba(55,58,109,0.5)",
      },
    },
      cell:{
        color:'white',
        fontFamily:'Montserrat',
      },
      tableContainer: {
        marginTop: "5%",
        maxHeight: 500,
        marginBottom: "10%",
        border: "2px solid #AEAEAE",
        maxWidth: '100%',
      },
    pagination: {
        backgroundColor: "black",
       
        "& .MuiTablePagination-root": {
          fontFamily: "Montserrat",
        },       
        "& .MuiTypography-root": {
          fontFamily: "Montserrat",
        },
        "& .MuiTypography-body2": {
          fontFamily: "Montserrat",
        },
        "& .MuiSelect-root": {          
          fontFamily: "Montserrat",
        },
    },
    // ------ Popup Set Reminder --------------
    line:{
      border: 'solid #FF9936',
      height: '1.4px',
      width: '50px',
      marginTop: '-2%',
      marginLeft: '4%',
      backgroundColor: '#FF9936',
    },
    backDrop: {
      background: 'rgba(255,255,255,0.2)',
    },
    dialog_content: {
      marginTop: "2%",
    },
    calendar:{
      color:"black"
    },
    reminder:{
      padding:"2%"
    },
    btn:{
      marginBottom: "3%",
      marginRight: "2%",
      
    },
    btn_Save: {
      fontFamily: "Montserrat",
      fontWeight: "bold",
      backgroundColor: "rgb(55,58,109)",
      color: "white",
      '&:hover' :{
          backgroundColor: "#777bb8",
      }
    },
    btn_Cancel: {
      fontFamily: "Montserrat",
      fontWeight: "bold",
      backgroundColor:"#c1c1c1",
      "&:hover":{
        backgroundColor:"#AAAAAA",
      }
    },
    btn_SetReminder: {
      cursor: "pointer",
      marginTop: "2%",
      radial: "3px",
      borderColor: "rgb(55,58,109)",
      fontFamily: "Montserrat",
      fontWeight: "bold",
      backgroundColor: "rgb(55,58,109)",
      color: "white",
      '&:hover' :{
          backgroundColor: "#777bb8",
          borderColor: "#777bb8"
      }
    },
    ticker_field: {
      color: "grey",
      fontSize: "Montserrat",
      borderColor: "grey",
      marginBottom: "3%",
    },
    
    toast:{
      fontFamily: "Montserrat",
      fontSize: "14px",
      color: "white",
      },
}))

export default useStyles
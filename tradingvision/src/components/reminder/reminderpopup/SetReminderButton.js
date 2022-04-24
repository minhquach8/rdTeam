import React, {useState, useEffect} from 'react'
import useStyles from '../style'
import {Button,
        Dialog,
        DialogActions,
        DialogContent,
        DialogContentText ,
        DialogTitle,
      } from '@material-ui/core';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';
import { useForm, Form } from '../useForm';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios'
import { Typography } from '@mui/material';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SetReminderButton = (props) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false);

    var current = new Date();
    current.setMinutes(current.getMinutes() + 10)

    const [date, setDate] = useState(new Date());
    const [stockTicker,setTicker] = useState([]);


    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      resetForm();
      setOpen(false);
    };

    const initialFValues = {
      title: '',
      content: '',
    }
    
    const validate = (fieldValues = values) => {
      let temp = { ...errors }
      var current = new Date();
      current.setMinutes(current.getMinutes() + 9)
      if ('title' in fieldValues)
          temp.title = fieldValues.title ? "" : "This field is required."
      if ('content' in fieldValues)
          temp.content = fieldValues.content ? "" : "This field is required."
      if ('ticker' in fieldValues)
          temp.ticker = fieldValues.ticker ? "" : "This field is required."
      
     
      setErrors({
          ...temp
      })

      if (fieldValues === values)
          return Object.values(temp).every(x => x === "")
      }
      
      const {
          values,
          setValues,
          errors,
          setErrors,
          handleInputChange,
          resetForm
      } = useForm(initialFValues, true, validate);

        const handleSubmit = e => {
            e.preventDefault()
            if(date.getTime() < current.getTime()) {
              toast.error("Reminder time must be 10 minutes after current time!", 
              {autoClose: 2000, 
              transition: Slide,
              position:"bottom-left",
              });
            }
            if (validate() &&  (date.getTime() >= current.getTime())) {
              
              // ham insert reminder vo database
           fetch(`/api/reminders`, {
            method: "POST",
            body: JSON.stringify({
              Content: values.content,
              Title: values.title,
              Ticker: stockTicker.ticker,
              RemindAt: date.getTime(),
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((res) => res.json())
            toast.success("Successfully added your reminder!", 
            {autoClose: 5000, 
            transition: Slide,
            position:"bottom-left",
            }) 
              resetForm();
              handleClose();
              props.getReminders();
          }
         
          
           
      }

    const [stocks, setStock] = useState([])

    useEffect(() => {
      getListofTickers()
    },[])

    const getListofTickers = async() => {
      axios.get(`/api/companyinfo?field=Ticker`)
      .then((response) =>{
        setStock(response.data.companyinfo);
      })
    }
    
    const listStocks = stocks.map((stock) =>{
      return {
        ticker: stock.Ticker,
      }
    })
    
    const options = listStocks.map((option) => {
      const firstLetter = option.ticker[0].toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option,
      };
    });

    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen} className={classes.btn_SetReminder}>
          Set Reminder
        </Button>
        <Dialog 
          open={open} 
          onClose={handleClose}
          BackdropProps={{
						style: { backgroundColor: "rgba(0,0,0,0.50)" },
					}}
          PaperProps={{
            style: {
              backgroundColor: 'white',
              height: '500px',
              width: '560px',}
          }}
        >
        <Form onSubmit={handleSubmit}>
          <DialogTitle>
            <TextField
             component = "form"
              variant = "standard" //to disable outline
              required 
              placeholder="Add Title" 
              noValidate
              autoComplete="off"
              InputProps={{ 
                    disableUnderline: true,
                    style:{
                      fontSize:"18px",
                      fontFamily: "Montserrat",
                      color:"black",
                    }}} 
              name="title"        
              value={values.title}
              onChange={handleInputChange}
              error={errors.title}
              helperText = {errors.title}
            /> 
          </DialogTitle>
          <div className={classes.line}></div>
          <DialogContent 
            className={classes.dialog_content}>
            <DialogContentText 
              style={{
                color:"black",
              }}> 
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    component = "form"
                    noValidate
                    autoComplete="off"
                    renderInput={(props) => <TextField {...props} required/>}
                    value={date}
                    minDateTime={new Date().setMinutes(new Date().getMinutes() + 10)}
                    onChange={(newValue) => {
                       
                          setDate(newValue);
                    }}
                    
                    className={classes.calendar}
                    inputProps={{
                        disableUnderline: true,
                        style: {
                          color: "black",
                          fontFamily:"Montserrat",
                          fontSize:"15px",
                        },
                        readOnly: true,
                        
                      }}
                  />
        
        
              </LocalizationProvider>

            </DialogContentText>
            
            <DialogContentText>
            <Autocomplete
                id="grouped-demo"
                selectOnFocus          
                options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.ticker}
                getOptionSelected={(option, value) => option.ticker === value.ticker}
                isOptionEqualToValue={(option, value) => option.ticker === value.ticker}
                
                onChange={(event, value) => setTicker(value)}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField 
                {...params} 
                required
                label={<Typography style={{fontFamily:"Montserrat"}}>Choose a ticker...</Typography>} />}
              />
            </DialogContentText>

            <DialogContentText>
                
                 <TextField
                  component = "form"                  
                  noValidate
                  autoComplete="off"
                  
                  required  
                  placeholder="Content"
                  multiline
                  rows={4}
                  className={classes.reminder}
                  InputProps={{
                    disableUnderline: true,
                    style:{
                      fontSize:"17px",
                      fontFamily: "Montserrat",
                      color:"black",
                      width:"500px",
                      },
                    }}
                  variant = "outlined"
                  size = "large"
                  name="content"        
                  value={values.content}
                  onChange={handleInputChange}
                  error={errors.content}
                  helperText={errors.content}
                />
             
          </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.btn}>
            <Button 
              type = "submit"
              className={classes.btn_Save}>Save</Button>
             <ToastContainer className={classes.toast} 
											toastStyle={{ color:"#000" }}/>
            <Button
              onClick={handleClose}
              className={classes.btn_Cancel}>Cancel</Button>
          </DialogActions>
          </Form>
        </Dialog>
      </div>
    );
}

export default SetReminderButton
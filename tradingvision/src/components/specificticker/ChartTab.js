import React from 'react'
import LineChart from './LineChart'
import Candlestick from '../candlestick/Candlestick'
import useStyles from './style'
import PropTypes from 'prop-types';
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';


const StyledButton = styled('button')(
  ({}) => `
  font-family: Montserrat;
  
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 30px;
  border: 1px solid rgba(55,58,109,0.8);
  border-radius: 5px;
  margin-top: 0.5em;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: white;
  font-weight: bold;
  background-color: rgb(55,58,109);
  &:hover {
    background: #777bb8;
    border-color: 1px solid #777bb8;
  }

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid #FFC55C;
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
  `,
);

const StyledListbox = styled('ul')(
  ({}) => `
  font-family: Montserrat;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: 320px;
  background: #fff;
  border: 1px solid #fff;
  border-radius: 0.75em;
  color: #444444;
  overflow: auto;
  outline: 0px;
  `,
);

const StyledOption = styled(OptionUnstyled)(
  ({}) => `
  list-style: none;
  padding: 8px;
  border-radius: 0.45em;
  cursor: poi;
  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    font-weight: bold;
    background-color: #FDB750;
    color: #FD7F20;
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: #FAEBD9;
    color: #F86F15;
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: #FAEBD9;
    color: #F86F15;
  }

  &.${optionUnstyledClasses.disabled} {
    color: #444444;
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: #E4E5E8;
    color: #444444;
  }
  `,
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;


function CustomSelect(props) {
  const components = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} components={components} />;
}

CustomSelect.propTypes = {
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Listbox: PropTypes.elementType,
    Popper: PropTypes.func,
    Root: PropTypes.elementType,
  }),
};

const ChartTab = (props) => {
  const classes = useStyles();  
  // const [chart,setChart] = React.useState("Line")

  
  return (
    <>
    <div className={classes.menu} >

       </div>

       <div className={classes.chart}>
        <CustomSelect value={props.chart} onChange={props.setChart} style = {{cursor: 'pointer'}}>
          <StyledOption value={"Line"} style = {{cursor: 'pointer'}}>Line Chart</StyledOption>
          <StyledOption value={"Candlestick"} style = {{cursor: 'pointer'}}>Candlestick Chart</StyledOption>
        </CustomSelect>
      {
        props.chart === "Line" ? (
          <div><LineChart compareTicker={props.compareTicker}/></div>
        ) : (
          <div><Candlestick/></div>
        )
       
      }
       </div>
       
      </>
  )
}

export default ChartTab

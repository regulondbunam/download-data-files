/**

# Component (user guide)

# Component name 

[Card --v0.5.0]

## Description  

[Component allows a minimum presentation, as a business card, we can insert content, and an icon in relation to the content, to choose the icon you must use the prop icon="name_of_the_icon" to get the names visit: https://material.io/resources/icons/?style=baseline ]

## Category   

[Visual]  

## Live demo 

[-]

## Installation 

[-]

## Usage 

    import {Card} from "ui-components"     
    
    
    

## Props

| props        | type   | default       | description                                                  |
| ------------ | ------ | ------------- | ------------------------------------------------------------ |
| height       | string | "110px"       | height of the card                                           |
| width        | string | "380px"       | width of the card                                            |
| style        | object | {}            | general card Style                                           |
| tipe         | string | "simple"      | you can use "simple" to just have the card with the frame, or "icon", to place an icon |
| icon         | string | "attach_file" | icon name, to get the names visit: https://material.io/resources/icons/?style=baseline |
| iconStyle    | object | {}            | Icon Style                                                   |
| iconDivStyle | object | {}            | icon container style                                         |

## Exception

__Warning__

## License

[MIT]

## Author 

[CCG-UNAM-RegulonDB]

**/
/**

# Component (technical guide)

## Component Type 

[Stateless functional component]

## Dependencies

[React,PropTypes]

**/
import React from "react";
import PropTypes from "prop-types";

const Card = ({
  children,
  height,
  width,
  style,
  type,
  icon,
  iconDivStyle,
  iconStyle
}) => {
  styleCard = Object.assign({}, styleCard, { height: height, width: width });
  style = Object.assign({}, style, styleCard);
  iconDivStyle = Object.assign({}, iconDivStyle, styleDivIcon);
  iconStyle = Object.assign({}, iconStyle, styleIcon);
  let cardType = () => {
    return <></>;
  };

  switch (type) {
    case "icon":
      style = Object.assign({}, style, { border: "3px solid #72A7C7" });
      cardType = () => {
        return (
          <>
            <link
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet"
            />
            <div style={iconDivStyle}>
              <i className="material-icons" style={iconStyle}>
                {icon}
              </i>
            </div>
          </>
        );
      };
      break;
    default:
      cardType = () => {
        return <></>;
      };
      break;
  }

  return (
    <div style={style}>
      {cardType()}
      <div>{children}</div>
    </div>
  );
};

const styleDivIcon = {
  background: "#72A7C7",
  float: "left"
};

const styleIcon = {
  color: "#ffffff"
};

let styleCard = {};
//background: "#72A7C7"

Card.defaultProps = {
  height: "110px",
  width: "380px",
  style: {},
  type: "simple",
  icon: "attach_file",
  iconDivStyle: {},
  iconStyle: {}
};

Card.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
  icon: PropTypes.string,
  iconDivStyle: PropTypes.object,
  iconStyle: PropTypes.object
};

export default Card;

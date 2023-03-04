/**
# Component (user guide)

# Component name 
	
	[Image]
	
## Description  
	
	[Component with the ability to place an Image, the props help complement the additional FAIR information]

## Category   
	
	[Visual]  

## Live demo 
	
	[]


## Installation 

	[]

## Usage 
	
	[]

## Props 




## Exception
	__Category (Error, Warning or Message)__  
	Description of the exception (if necessary)

## License

	[MTI]

## Author 
	
	[CCG-UNAM-RegulonDB]

**/


/**
# Component (technical guide)

## Component Type 

	[stateles funcional component]

## Dependencies

	[React,PropTypes]

## States
	
	| Property | Value | Desctiption |
	| -------- | ----- | ----------- |
	|          |       |             |
	
**/
import React from 'react';
import PropTypes from 'prop-types';


const Image = ({
  title,
    urlImage,
    width,
    height,
    id,
    imgStyle,
    imgAlt ,
    imgTitle,
    target,
    link
}) => {

    // Datos que debe renderizar la imagen

    const item = [
        {
          id: id,
          img: urlImage,
          style: imgStyle,
          alt: imgAlt,
          title: imgTitle,
          target: target,
          link: link,
          width: width,
          height: height
        }
      ];

    return ( 
        item.map(item => {
            return <React.Fragment key={`img-${item.id}`}>
              <img width={item.width} height={item.height} style={item.style} src={item.img} alt={item.alt} title={item.title} />
            </React.Fragment>
          })

     );
}
 
export default Image;

Image.propTypes = {
    urlImage: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    id: PropTypes.string,
    imgStyle: PropTypes.object,
    imgAlt: PropTypes.string ,
    imgTitle: PropTypes.string,
    target: PropTypes.string,
    link: PropTypes.string
}

Image.defaultProps = {
    urlImage: "",
    width: "",
    height:"",
    id: "123",
    imgStyle: {},
    imgAlt: "" ,
    imgTitle: "",
    target: "",
    link: ""
}

//dl.dropboxusercontent.com
import React, { useState } from "react";
import { Button } from "../../ui_components";
import Style from "./tabs.module.css";

export const Tabs = ({
  tabsInfo = undefined,
  tabsObj = undefined,
  tabSelect = "01",
  tabs = [<div id="01">contenido 1 </div>, <div id="02"> contenido 2 </div>],
  backgroundColor = "#d5e2ead7",
  lineColor = "#32617D"
}) => {
  const [_tab, set_tab] = useState(tabSelect);

  const headerStyle = {
    "WebkitBoxShadow": "inset -1px -10px 0px -6px "+lineColor,
    "MozBoxShadow": "inset -1px -10px 0px -6px "+lineColor,
    boxShadow: "inset -1px -10px 0px -6px "+lineColor,
    backgroundColor: backgroundColor
  }

  const style_Tab = {
    backgroundColor: "#ffffff",
    color: "#373737",
    borderTop: "1px solid #666666",
    borderRight: "1px solid #666666",
    borderBottom: "3px solid "+lineColor,
    borderLeft: "1px solid #666666"
  };
  
  const style_TabActive = {
    backgroundColor: "#ffffff",
    color: "#3D779B",
    fontWeight: "bold",
    borderTop: "3px solid "+lineColor,
    borderRight: "2px solid "+lineColor,
    borderLeft: "2px solid "+lineColor
  };

  return (
    <div>
      <nav
        className={Style.tabHeader}
        style={headerStyle}
      >
        {
          arrayTabs(tabsInfo,_tab,set_tab, style_TabActive, style_Tab)
        }
        {
          objTabs(tabsObj,_tab,set_tab,style_TabActive, style_Tab)
        }
      </nav>
      {tabs.map((tab) => {
        //console.log(tab.props?.id )
        //console.log(_tab)
        if (tab.props?.id === _tab) {
          return <div key={`tabContent_${_tab}_CCDFG`}>{tab}</div>;
        }
        return null;
      })}
    </div>
  );
};

function objTabs(tabsObj, _tab, set_tab, style_TabActive, style_Tab) {
  if(tabsObj){
    return <>
    {
      Object.keys(tabsObj).map(function(key) {
        const value = tabsObj[key];
        let styleTab = style_Tab;
        if (value.id === _tab) {
          styleTab = style_TabActive;
        }
        if (value.disabled) {
          return null;
        }
        return (
          <div key={`tab_${value.id}-${value.name}`} className={Style.tabContent}>
            <Button
              id={value.id}
              style={styleTab}
              label={value.name}
              onClick={() => {
                set_tab(value.id);
              }}
            />
          </div>
        );
      })
    }
    </>
  }else{
    return <></>
  }
}

function arrayTabs(tabsInfo, _tab, set_tab, style_TabActive, style_Tab) {
  if(tabsInfo){
    return <>
    {
      tabsInfo.map((tab) => {
        let styleTab = style_Tab;
        if (tab.id === _tab) {
          styleTab = style_TabActive;
        }
        if (tab.disabled) {
          return null;
        }
        return (
          <div key={`tab_${tab.id}-${tab.name}`} className={Style.tabContent}>
            <Button
              id={tab.id}
              style={styleTab}
              label={tab.name}
              onClick={() => {
                set_tab(tab.id);
              }}
            />
          </div>
        );
      })
    }
    </>
  }else{
    return <></>
  }
}



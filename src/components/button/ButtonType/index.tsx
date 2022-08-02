//This is the first section in the button creation process, but can be displayed or not depending on the selected network settings. It displays the buttons types (default offer an need and exchange) and leads to ButtonNewData after selection
import FieldError from "elements/Fields/FieldError";
import FieldRadio from "elements/Fields/FieldRadio";
import FieldRadioOption from "elements/Fields/FieldRadio/option";
import { GlobalState, store } from "pages";
import React from "react";
import { useState } from "react";

import { IoClose } from "react-icons/io5";
import { useRef } from "store/Store";
type IconType = "cross" | "red";

function RadioIcon({ icon }: { icon: IconType }) {
  switch (icon) {
    case "cross":
      return (
        <div className="checkbox__icon">
          <IoClose />
        </div>
      );
    case "red":
      return <div className="btn-filter__icon red"></div>;
    default:
      return null;
  }
}

const ButtonType = React.forwardRef(({name, onChange, onBlur, validationError}, ref) => {
  const selectedNetwork = useRef(
    store,
    (state: GlobalState) => state.networks.selectedNetwork
  );
  return (
        <>
         <FieldRadio label="Button type:">
          {selectedNetwork &&
            selectedNetwork.templateButtons.map((template: ITemplateButton) => {
            return (
            <FieldRadioOption
              onChange={onChange} 
              onBlur={onBlur}
              name={template.description}
              ref={ref} 
              value={template.slug}
            >
              <div className={`btn-filter__icon ${template.slug}`}></div>
              <div className="btn-with-icon__text">{template.description}</div>
            </FieldRadioOption>
            );
          })}
          </FieldRadio>
          <FieldError validationError={validationError}/>
        </>
  )
});

ButtonType.displayName = "ButtonType"

export default ButtonType;

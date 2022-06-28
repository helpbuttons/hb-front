//is the component or element integrated in buttonNewPublish. Right before activate button. It displays the current selected date and a button to chang it, that ddisplays a picker with the date options for the net that's selecte
import { Picker, PickerSelector } from "components/picker/Picker";
import PickerPeriodDate from "components/picker/PickerPeriodDate";
import PickerDate from "components/picker/PickerDate";
import React, { useState } from "react";
import DateTimeFormat from "components/formatting/DateTimeFormat";

export default function ButtonNewDate({ exact, ...props }) {
  const [showHideMenu, setHideMenu] = useState(false);
  const [pickerMode, setPickerMode] = useState("");

  let closeMenu = () => {
    setHideMenu(false);
    setPickerMode("");
  };
  return (
    <>
      <div className="form__field">
        <div className="card-button__date"><DateTimeFormat datetime={props.date}/></div>

        <div className="btn" onClick={() => setHideMenu(!showHideMenu)}>
          Change date
        </div>
      </div>
      {showHideMenu && (
        <Picker setHideMenu={setHideMenu} onClosed={closeMenu}>
          {pickerMode == "" && (
            <PickerSelector
              label="Now (until you deactivate it)"
              value="now"
              onHandleChange={setPickerMode}
            />
          )}
          {pickerMode == "" && (
            <PickerSelector
              label="Specific date and time"
              value="specific"
              onHandleChange={setPickerMode}
            />
          )}
          {pickerMode == "" && (
            <PickerSelector
              label="Regular periodic date and time"
              value="periodic"
              onHandleChange={setPickerMode}
            />
          )}
          {pickerMode == "now" && <PickerDate></PickerDate>}
          {pickerMode == "specific" && <PickerPeriodDate></PickerPeriodDate>}
          {pickerMode == "periodic" && <PickerPeriodDate></PickerPeriodDate>}
        </Picker>
      )}
    </>
  );
}

//Create new button and edit button URL, with three steps with different layouts in the following order: NewType --> NewData --> NewPublish --> Share
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "elements/Form";

import Popup from "components/popup/Popup";
import ButtonType from "components/button/ButtonType";

import { store } from "pages/index";
import { CreateButtonEvent } from "pages/ButtonNew/data";
import { IButton } from "services/Buttons/button.type";
import FieldLocation from "elements/Fields/FieldLocation";
import PopupSection from "components/popup/PopupSection";
import FieldTextArea from "elements/Fields/FieldTextArea";
import FieldUploadImage from "elements/Fields/FieldImageUpload";
import PopupOptions from "components/popup/PopupOptions";
import FormSubmit from "elements/Form/FormSubmit";
import ButtonShare from "components/button/ButtonShare";
// import Location from 'elements/Location';

export default function ButtonNew() {
  const networkId = window.localStorage.getItem("network_id");
  const token = window.localStorage.getItem("access_token");

  // TODO: tags

  const fields = {
    name: "",
    templateButtonId: null,
    type: "",
    description: "",
    latitude: null,
    longitude: null,
  };

  const [button, setValues] = useState<IButton>(fields);
  const [validationErrors, setValidationErrors] = useState(fields);

  const {
    formState: { isSubmitting },
  } = useForm();

  const setValue = (name, value) => {
    setValues({ ...button, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    store.emit(
      new CreateButtonEvent(button, token, networkId, setValidationErrors)
    );
  };

  return (
    <>
      <Popup title="Create Button" linkFwd="/Explore">
        {JSON.stringify(button)}
        <PopupSection>
          <Form onSubmit={handleSubmit}>
            <ButtonType
              handleChange={setValue}
              name="type"
              validationError={validationErrors.type}
            />
            <FieldTextArea
              label="Describe your purpose:"
              handleChange={setValue}
              name="description"
              placeholder="i.e. I would like to offer..."
              validationError={validationErrors.description}
            />
            <FieldUploadImage label="+ Add image (optional)" />
            <FieldLocation
              setValue={setValue}
              values={button}
              validationErrors={validationErrors}
            />
            dsa
            <ButtonShare />
            <PopupOptions>
              <FormSubmit title="Create Button" isSubmitting={isSubmitting} />
            </PopupOptions>
            {/* 
                  <ButtonNewData  setDescription={setDescription} setTags={setTags} description={description} tags={tags} register={register} errors={errors}/>
                  {tags}
                  {description}

                  <ButtonNewDate setDate={setDate} date={date}/>
                  
                  <FieldLocation setValue={setValue} values={values} validationErrors={validationErrors} />

                  

                  <div className="popup__options-v">

                    <button type="submit" disabled={formState.isSubmitting}  className="popup__options-btn btn-menu-white">

                      {formState.isSubmitting && <span className=""></span>}
                        Create Button

                    </button>

                  </div> */}
          </Form>
        </PopupSection>
      </Popup>
    </>
  );
}

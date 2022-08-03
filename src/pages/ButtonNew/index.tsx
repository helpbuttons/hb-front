//Create new button and edit button URL, with three steps with different layouts in the following order: NewType --> NewData --> NewPublish --> Share
import React, { useCallback, useState } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import Form from "elements/Form";

import Popup from "components/popup/Popup";
import ButtonType from "components/button/ButtonType";

import { GlobalState, store } from "pages";
import { CreateButton } from "state/Explore";
import { IButton } from "services/Buttons/button.type";
import FieldLocation from "elements/Fields/FieldLocation";
import { FieldTextArea } from "elements/Fields/FieldTextArea";
import FormSubmit from "elements/Form/FormSubmit";
import ButtonShare from "components/button/ButtonShare";
import ButtonNewDate from "components/button/ButtonNewDate";
import FieldUploadImages from "elements/Fields/FieldImagesUpload/index";
import { localStorageService, LocalStorageVars } from "services/LocalStorage";
import FieldTags from "elements/Fields/FieldTags";
import { useRef } from "store/Store";
import { NavigateTo } from "state/Routes";
import FieldText from "elements/Fields/FieldText";
import FieldError from "elements/Fields/FieldError";
import { alertService } from "services/Alert";
import TemplateButtonForm from "components/button/ButtonTemplate";

export default function ButtonNew() {
  const selectedNetwork = useRef(
    store,
    (state: GlobalState) => state.networks.selectedNetwork
  );

  const [date, setDate] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    watch,
  } = useForm();

  const watchType = watch("type", false);
  const [errorMsg, setErrorMsg] = useState(undefined);

  const onSubmit = (data) => {
    store.emit(new CreateButton(data, selectedNetwork.id, onSuccess, onError));
  };

  const onSuccess = () => {
    store.emit(new NavigateTo("/Explore"));
  };

  const onError = (err) => {
    alertService.error("Error on creating button " + err, {});
  };
  
  return (
    <>
      <Popup title="Publish Button" linkFwd="/Explore">
        <Form onSubmit={handleSubmit(onSubmit)} classNameExtra="publish_btn">
          <div className="publish_btn-first">
            <ButtonType
              name="type"
              {...register("type", { required: true })}
              validationError={errors.type}
            />
          </div>
          {watchType && selectedNetwork && 
          (
            <div className="publish_btn-scd">
                <TemplateButtonForm 
                templateSlug={watchType}
                errors={errors}
                register={register}
                selectedNetwork={selectedNetwork}
                control={control}
                />
            </div>
          )}
          <div className="publish__submit">
            <FormSubmit
              classNameExtra="create_btn"
              title="Publish"
              isSubmitting={isSubmitting}
            />
          </div>
        </Form>
      </Popup>
    </>
  );
}

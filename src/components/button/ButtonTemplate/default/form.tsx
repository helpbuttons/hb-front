import FieldUploadImages from "elements/Fields/FieldImagesUpload";
import FieldLocation from "elements/Fields/FieldLocation";
import FieldTags from "elements/Fields/FieldTags";
import { FieldTextArea } from "elements/Fields/FieldTextArea";

export default function TemplateButtonDefaultForm({register, errors, control, selectedNetwork})
{
    return (
        <>
          <FieldTextArea
                  label="Description:"
                  name="description"
                  placeholder="Write a description for your button"
                  validationError={errors.description}
                  classNameExtra="squared"
                  {...register("description", {required: true, minLength: 10})}
            />
            <FieldTags
                label="Tag suggestions"
                name="tags"
                control={control}
                validationError={errors.tags}
              />

            <FieldUploadImages
                name="images"
                label="+ Add image"
                maxNumber="4"
                control={control}
              />

            <FieldLocation
                control={control}
                validationErrors={undefined}
                initialLocation={{
                  lat: selectedNetwork.location.coordinates[0],
                  lng: selectedNetwork.location.coordinates[1],
                }}
              />
        </>
    )
}
import FieldUploadImages from "elements/Fields/FieldImagesUpload";
import FieldLocation from "elements/Fields/FieldLocation";
import FieldTags from "elements/Fields/FieldTags";
import { FieldTextArea } from "elements/Fields/FieldTextArea";

export default function TemplateButtonOfferForm({register, errors, control, selectedNetwork})
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
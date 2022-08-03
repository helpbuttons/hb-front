import TemplateButtonOfferForm from "components/button/ButtonTemplate/offer/form";
import TemplateButtonDefaultForm from "components/button/ButtonTemplate/default/form";


export default function TemplateButtonForm(props)
{
    const TemplateButtonFormComponents = {
      offer: TemplateButtonOfferForm,
      need: TemplateButtonDefaultForm,
      exchange: TemplateButtonDefaultForm,
    };
    const TemplateButtonFields = TemplateButtonFormComponents[props.templateSlug];
    return (
        <>
          <TemplateButtonFields {...props}/>
        </>
    )
}
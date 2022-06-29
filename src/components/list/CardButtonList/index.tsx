//Card that displays a resume of the button info in tthe List component. Its fieldds can be customizedd according to buttonTemplate.
import ImageCarrousel from "elements/ImageWrapper";
import { Link } from "elements/Link";
import DateTimeFormat from "components/formatting/DateTimeFormat";

export default function CardButtonList({id, type, userName, images, name, tags, description, date, location}) {
 
  return (
    <div className="list__element">
      <div className="card-button-list card-button-list--need">
        <ImageCarrousel images={images}/>
        <div className="card-button-list__content">
          <Link href={`/ButtonFile/${id}`}>
            <div className="card-button-list__header">
              <div className="card-button-list__info">
                <div className="card-button-list__status card-button-list__status">
                  <span className="card-button-list__status--offer">
                    {type}  - {id}
                  </span>
                </div>

                <div className="card-button-list__status card-button-list__status">
                  <span className="card-button-list__title">{name}</span>
                </div>
              </div>

              <div className="card-button-list__submenu card-button-list__trigger"></div>
            </div>

            <div className="card-button-list__hashtags">
              <div className="card-button-list__need">
              {tags?.length > 0 && tags.filter(tag => tag.length > 0).map( (tag,key)=>
                (
                <div className="hashtag" key={key}>{tag}</div>
                )
                )}
              </div>
            </div>

            <div className="card-button-list__paragraph">
              <p>{description}</p>
            </div>

            <div className="card-button-list__geoDate">
              <div className="card-button-list__city card-button-list__everywhere ">
                {JSON.stringify(location.coordinates)}
              </div>

              <div className="card-button-list__date">
                <DateTimeFormat datetime={date}/>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

//Card that displays a resume of the button info in tthe List component. Its fieldds can be customizedd according to buttonTemplate.
import {ImageCarrousel} from "elements/ImageWrapper";
import { Link } from "elements/Link";
import DateTimeFormat from "components/formatting/DateTimeFormat";

export default function CardButtonList(props) {
 
  return (
    <div className="list__element">
      <div className="card-button-list card-button-list--need">
        <ImageCarrousel images={props.images}/>
        <div className="card-button-list__content">
          <Link href="/ButtonFile">
            <div className="card-button-list__header">
              <div className="card-button-list__info">
                <div className="card-button-list__status card-button-list__status">
                  <span className="card-button-list__status--offer">
                    {props.type}
                  </span>
                </div>

                <div className="card-button-list__status card-button-list__status">
                  <span className="card-button-list__title">{props.name}</span>
                </div>
              </div>

              <div className="card-button-list__submenu card-button-list__trigger"></div>
            </div>

            <div className="card-button-list__hashtags">
              <div className="card-button-list__need">
              {props.tags.length > 0 && props.tags.filter(tag => tag.length > 0).map( (tag,key)=>
                (
                <div className="hashtag" key={key}>{tag}</div>
                )
                )}
              </div>
            </div>

            <div className="card-button-list__paragraph">
              <p>{props.description}</p>
            </div>

            <div className="card-button-list__geoDate">
              <div className="card-button-list__city card-button-list__everywhere ">
                {JSON.stringify(props.location.coordinates)}
              </div>

              <div className="card-button-list__date">
                <DateTimeFormat datetime={props.date}/>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

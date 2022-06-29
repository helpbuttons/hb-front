//The smallest of buttons'cards. It ddisplays over the map when a marker is clicked / touched. Itt was very reduce info, like image, tags, title or other fieldds conidered by the buttonTemplate field.
import { ImageCarrousel, ImageType } from "elements/ImageWrapper";
import { IoChevronForwardOutline } from "react-icons/io5";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "elements/Link";
import DateTimeFormat from "components/formatting/DateTimeFormat";

export default function CardButtonMap({ type, tags, images, description, date, location }) {
  
  let tagsElementsHTML = '';
  if (tags.length > 0) {
    tagsElementsHTML = tags.map((tag, key) => {
      return (
        <div className="hashtag" key={key}>{tag}</div>
      );
    
      });
    }

  return (
    <div className="card-button-map card-button-map--need">
      <div className="card-button-map__content">
        <Link href="/ButtonFile">
          <div className="card-button-map__header ">
            <div className="card-button-map__info">
              <div className="card-button-map__status card-button-map__status">
                {description}
              </div>
            </div>
          </div>
          {tags.length > 0 &&
          <div className="card-button-map__hashtags">
          <div className="card-button-map__need">
              {tagsElementsHTML}
          </div>
          </div>
          }

          <div className="card-button-maps">
            <div className="card-button-map__city card-button-map__everywhere ">
            {JSON.stringify(location.coordinates)}
            </div>

            <div className="card-button-map__date">
              <DateTimeFormat datetime={date}/>
            </div>
          </div>
        </Link>
      </div>

      <div className="card-button-map__picture-container">
      <ImageCarrousel images={images}/>
      </div>
    </div>
  );
}

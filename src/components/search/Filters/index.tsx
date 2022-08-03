//Filters is the component under the search bar sectioon of the home page and other pages. It consist of several items all with btn-fillter class, and its parts can be altered by the btn templates of the selected network.

import { GlobalState, store } from "pages";
import { ITemplateButton } from "services/ButtonTemplates/buttonTemplate.type";
import { useRef } from "store/Store";

//if the filters are too many, it ddisplays a "more filters" option at the end that brings the PopupExtraFilters

export default function Filters({ updateFiltersType }) {
  const selectedNetwork = useRef(
    store,
    (state: GlobalState) => state.networks.selectedNetwork
  );

  const buttonTypeChanged = (e) => {
    const buttonTypeName = e.target.value;
    const value = e.target.checked;
    updateFiltersType(buttonTypeName, value);
  };

  return (
    <div className="filters">
      <div className="checkbox-filter__container">
        {selectedNetwork &&
          selectedNetwork.templateButtons.map((template: ITemplateButton) => {
            return (
              <label key={template.slug} className="checkbox__filter-label">
                <input
                  type="checkbox"
                  className="checkbox-filter__checkbox"
                  id="input-tos"
                  defaultChecked={true}
                  value={template.slug}
                  onChange={buttonTypeChanged}
                ></input>
                <div className="checkbox-filter__content btn-filter-with-icon">
                  <div className={`btn-filter__icon ${template.slug}`}></div>
                  <div className="checkbox__text">{template.description}</div>
                </div>
              </label>
            );
          })}
      </div>

      {/* 
        <select className="dropdown__filter">
          <option value="status" className="dropdown-select__option">Status changes</option>
          <option value="status" className="dropdown-select__option">All comments</option>
          <option value="status" className="dropdown-select__option">Other users comments</option>
          <option value="status" className="dropdown-select__option">Telegram messages</option>
          <option value="status" className="dropdown-select__option">All interactions</option>
          <option value="status" className="dropdown-select__option">Other buttons interactions</option>
          <option value="status" className="dropdown-select__option">My buttons interactions</option>
        </select> */}
    </div>
  );
}

import { Component, ChangeEvent } from "react";
import ButtonDataService from "../services/Button.service";
import ButtonData from '../types/Button.type';

type Props = {};

type State = ButtonData & {
  submitted: boolean
};

export default class AddButton extends Component<Props, State> {
  constructor(props: Props) {

    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveButton = this.saveButton.bind(this);
    this.newButton = this.newButton.bind(this);

    this.state = {

      id: null,
      templateId: null,
      tags: [],
      //required data
      date: [],
      //GIS DATA
      location: [],
      longitude: [],
      latitude: [],
      // optional values
      networks: [],
      chatType: "single", //enum {single,group} chat structure
      templateExtraData: {}, //JSON

    };
  }

  onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      description: e.target.value
    });
  }

  saveButton() {
    const data: IButtonData = {
      title: this.state.title,
      description: this.state.description
    };

    ButtonDataService.create(data)
      .then(response => {
        this.setState({
          id: null,
          templateId: null,
          tags: [],
          //required data
          date: [],
          //GIS DATA
          location: [],
          longitude: [],
          latitude: [],
          // optional values
          networks: [],
          chatType: "single", //enum {single,group} chat structure
          templateExtraData: {}, //JSON
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newButton() {
    this.setState({
      id: null,
      templateId: null,
      tags: [],
      //required data
      date: [],
      //GIS DATA
      location: [],
      longitude: [],
      latitude: [],
      // optional values
      networks: [],
      chatType: "single", //enum {single,group} chat structure
      templateExtraData: {}, //JSON
    });
  }

  render() {
    const { submitted, title, description } = this.state;

    return (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newButton}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <button onClick={this.saveButton} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
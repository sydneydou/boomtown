import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Form, Field, FormSpy } from "react-final-form";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  updateItem,
  resetItem,
  resetItemImage
} from "../../redux/ShareItemPreview/reducer";
import { connect } from "react-redux";

class ShareItemForm extends Component {
  constructor({ props }) {
    super(props);
    this.state = {
      fileSelected: false,
      done: false,
      selectedTags: []
    };
    this.fileInput = React.createRef();
  }

  onSubmit(formState) {
    console.log(formState);
  }
  validate(formState) {
    console.log("validating");
  }

  getBase64Url() {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => {
        resolve(
          `data:${this.state.fileSelected.type};base64, ${btoa(
            e.target.result
          )}`
        );
      };
      reader.readAsBinaryString(this.state.fileSelected);
    });
  }

  //gets called from dispatchUpdate function
  //picks selected tag containing array which is an object containing title and id
  applyTags(tags) {
    return (
      tags &&
      tags
        .filter(t => this.state.selectedTags.indexOf(t.id) > -1)
        .map(t => ({ title: t.title, id: t.id }))
    );
  }

  //calls updateItem prop that dispatches action so that the preview gets updated
  dispatchUpdate(values, tags, updateItem) {
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateItem({
          imageurl
        });
      });
    }
    updateItem({
      ...values
      // tags: this.applyTags(tags)
    });
  }

  render() {
    const { tags, classes, updateItem } = this.props;
    return (
      <div>
        <Card>
          <CardContent>
            <Form
              validate={formState => this.validate(formState)}
              onSubmit={formState => this.onSubmit(formState)}
              render={({ handleSubmit, pristine, invalid }) => (
                <form onSubmit={handleSubmit}>
                  <FormSpy
                    subscription={{ values: true }}
                    component={({ values }) => {
                      if (values) {
                        this.dispatchUpdate(values, tags, updateItem);
                      }
                      return "";
                    }}
                  />
                  <h1>Share. Borrow. Prosper.</h1>
                  <FormControl fullWidth className={classes.formControl}>
                    <Field name="imageurl">
                      {({ input, meta }) => {
                        return (
                          <React.Fragment>
                            {!this.state.fileSelected ? (
                              <Button
                                size="medium"
                                color="primary"
                                variant="contained"
                                className={classes.imagebutton}
                                onClick={() => {
                                  this.fileInput.current.click();
                                }}
                              >
                                <p className={classes.imagebuttontext}>
                                  Select an Image
                                </p>
                              </Button>
                            ) : (
                              <Button
                                size="medium"
                                color="primary"
                                variant="outlined"
                                onClick={() => {
                                  this.resetFileInput();
                                }}
                              >
                                <p>Reset image</p>
                              </Button>
                            )}
                            <input
                              ref={this.fileInput}
                              hidden
                              type="file"
                              accept="image/*"
                              id="fileInput"
                              onChange={e => this.handleSelectFile(e)}
                            />
                          </React.Fragment>
                        );
                      }}
                    </Field>
                  </FormControl>
                  <div>
                    <Field
                      name="title"
                      render={({ input, meta }) => (
                        <label>
                          <TextField
                            id="title"
                            inputProps= {{...input}} 
                            label="Name your Item"
                            value={input.value}
                            margin="normal"
                            className={classes.inputfield}
                          />
                        </label>
                      )}
                    />
                  </div>
                  <div>
                    <Field
                      name="description"
                      render={({ input, meta }) => (
                        <label>
                          <TextField
                            id="description"
                            inputProps= {{...input}} 
                            label="Describe your Item"
                            value={input.value}
                            margin="normal"
                            className={classes.inputfield}
                          />
                        </label>
                      )}
                    />
                  </div>
                  <div>
                    <FormControl>
                      <InputLabel htmlFor="demo-controlled-open-select">
                        Add Some Tags
                      </InputLabel>
                      <Select>
                        {/* TODO get tags for menu */}
                        <MenuItem value={10} className={classes.inputfield}>
                          {tags.title}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  <Button variant="contained">Share</Button>
                </form>
              )}
            />
          </CardContent>
        </Card>
      </div>
    );
  }
}

//converts dispatch functions into props

const mapDispatchToProps = dispatch => ({
  updateItem(item) {
    dispatch(updateItem(item));
  },
  resetItem() {
    dispatch(resetItem());
  },
  resetItemImage() {
    dispatch(resetItemImage());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(ShareItemForm));

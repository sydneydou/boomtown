import React, { Component } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Form, Field, FormSpy } from "react-final-form";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import { ADD_ITEM_MUTATION } from "../../apollo/queries";
import { ALL_ITEMS_QUERY } from "../../apollo/queries";
import { Mutation } from "react-apollo";
import { ViewerContext } from "../../context/ViewerProvider";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";
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
      selectedTags: [],
      setOpen: false,
      open: false
    };

    this.fileInput = React.createRef();
  }

  onSubmit(formState, tags, addItem) {
    try {
      addItem({
        variables: {
          item: {
            ...formState,
            tags: this.applyTags(tags)
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  validate(formState) {
    console.log("validating");
  }

  handleClickOpen() {
    this.setState({ setOpen: true });
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ setOpen: false });
    this.setState({ open: false });
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

  applyTags(tags) {
    return (
      tags &&
      tags
        .filter(t => this.state.selectedTags.indexOf(t.id) > -1)
        .map(t => ({ title: t.title, id: t.id }))
    );
  }

  dispatchUpdate(values, tags, updateItem) {
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateItem({
          imageurl
        });
      });
    }

    updateItem({
      ...values,
      tags: this.applyTags(tags)
    });
  }

  handleSelectTag(event) {
    this.setState({ selectedTags: event.target.value });
  }

  handleSelectFile(e) {
    this.setState({
      fileSelected: this.fileInput.current.files[0]
    });
  }

  generateTagsText(tags, selected) {
    return tags
      .map(t => (selected.indexOf(t.id) > -1 ? t.title : false))
      .filter(e => e)
      .join(", ");
  }

  resetFileInput(e) {
    this.props.resetItemImage();
    this.fileInput.current.value = "";
    this.setState({ fileSelected: false });
  }

  render() {
    const { tags, classes, updateItem } = this.props;
    return (
      <div>
        <ViewerContext.Consumer>
          {({ viewer }) => (
            <div className={classes.outformcard}>
              <Mutation
                mutation={ADD_ITEM_MUTATION}
                refetchQueries={() => [
                  { query: ALL_ITEMS_QUERY, variables: { id: viewer.id } }
                ]}
              >
                {(addItem, { data }) => (
                  <Form
                    validate={formState => this.validate(formState)}
                    onSubmit={formState => {
                      this.onSubmit(formState, tags, addItem);
                      this.handleClickOpen();
                    }}
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
                        <h1 className={classes.form}>
                          Share. Borrow. <br /> Prosper.
                        </h1>
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
                                  inputProps={{ ...input }}
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
                                  inputProps={{ ...input }}
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
                          <FormControl
                            fullWidth
                            className={classes.formControl}
                          >
                            <InputLabel htmlFor="tags">
                              Add some tags
                            </InputLabel>
                            <Field name="tags">
                              {({ input, meta }) => {
                                return (
                                  <Select
                                    multiple
                                    value={this.state.selectedTags}
                                    onChange={e => this.handleSelectTag(e)}
                                    renderValue={selected => {
                                      return this.generateTagsText(
                                        tags,
                                        selected
                                      );
                                    }}
                                  >
                                    {tags &&
                                      tags.map(tag => (
                                        <MenuItem key={tag.id} value={tag.id}>
                                          <Checkbox
                                            checked={
                                              this.state.selectedTags.indexOf(
                                                tag.id
                                              ) > -1
                                            }
                                          />
                                          <ListItemText primary={tag.title} />
                                        </MenuItem>
                                      ))}
                                  </Select>
                                );
                              }}
                            </Field>
                          </FormControl>
                        </div>

                        <Button
                          variant="contained"
                          type="submit"
                          onClick={handleSubmit}
                          className={classes.submitbutton}
                        >
                          Share
                        </Button>
                      </form>
                    )}
                  />
                )}
              </Mutation>
            </div>
          )}
        </ViewerContext.Consumer>
        <Dialog
          open={this.state.open}
          keepMounted
          className={classes.EventPopupContainer}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle className={classes.EventPopupTitle}>
            Added New Item
          </DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.EventPopupContent}>
              You just successfully added a new item! This item will now be
              visible for other users to borrow.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link to="/profile" className={classes.EventPopupLink}>
              <Button className={classes.EventPopupBtns}>
                Show me my new item on my profile
              </Button>
            </Link>
            <Link to="/home" className={classes.EventPopupLink}>
              <Button className={classes.EventPopupBtns}>
                Show me other items
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
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

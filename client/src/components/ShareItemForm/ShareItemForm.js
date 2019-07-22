import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Form, Field } from 'react-final-form'
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';




class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSubmit(formState) {
    console.log(formState);
  }

  validate(formState) {
   console.log('validating');
  }

  render() {
    return (
      <div>
        <Card >
          <CardContent>
            <Form
              validate={formState => this.validate(formState)}
              onSubmit={formState => this.onSubmit(formState)}
              render={({ handleSubmit, pristine, invalid }) => (
              <form onSubmit={handleSubmit}>
                  <h1>Share. Borrow. Prosper.</h1>
                  <Button variant="contained" >
                    Select an image
                  </Button>
                  <div>
                    <Field
                    name="name"
                    render={({ input, meta }) => (
                     
                    <label>
                       <TextField
                          id="standard-name"
                          label="Name your Item"
                          value = {input.value}
                          margin="normal"
                        />
                    </label>
                    )}
                />
                  </div>
                  <div>
                  <Field
                    name="describe"
                    render={({ input, meta }) => (
                      <label>
                      <TextField
                         id="standard-name"
                         label="Describe your Item"
                         value = {input.value}
                         margin="normal"
                       />
                     {/* <input {...input} type='textbox' placeholder=' Name your Item' />
                     {meta.touched && meta.error && <span> {meta.error} </span>} */}
                   </label>
                  )}
                />
                </div>

                  <Button variant="contained" >
                    Share
                  </Button>

                </form>
              )}
            />
          
          </CardContent>
        </Card>
      </div>
    );
  }
}



export default ShareForm;

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';


//importing material ui components
import Button from '@material-ui/core/Button';

const Items = ({ classes, tags }) => {
  return (
    <div>
      <p>
        This is the items page located at <code>/items</code>.
      </p>
    </div>
    
  );
};

export default withStyles(styles)(Items);

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


export default function ItemCard({item}) {
    
    return (
      <Card >
        <CardContent>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
        </CardContent>
      </Card>
    );
  }
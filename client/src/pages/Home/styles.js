const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    background: theme.palette.primary.main,
    padding: theme.spacing(5),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(20)
    }
  },
  headline: {
    fontWeight: 800,
    color: theme.palette.text.primary,
    fontSize: '5.5em'
  },
  subheading: {
    fontWeight: 400,
    color: 'white'
  },
  welcome:{
    fontSize: '1.5em'
  }
});

export default styles;

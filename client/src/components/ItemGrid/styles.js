const styles = theme => ({
root: {
    flexGrow: 1,
    height: '50%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(20)
    }
  },
})

export default styles;
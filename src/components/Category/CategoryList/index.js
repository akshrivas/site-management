import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CategoryList({ categories, setActiveCategory, searchString }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  const classes = useStyles();
  let filteredList = [...categories];
  if(searchString){
    filteredList = [...categories].filter((item) => {
      return item.name.toLowerCase().includes(searchString.toLowerCase())
    })
  }
  return (
    <>
      <List className={classes.root}>
        {
          filteredList.length ?
          filteredList.map((item) => {
            return (
              <ListItem button key={item.id} onClick={() => setActiveCategory(item)}>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} secondary={item.description} />
              </ListItem>
            )
          })
          : <ListItem button>
            <ListItemText primary={'No categories found'} />
          </ListItem>
        }
      </List>
    </>
  );
}

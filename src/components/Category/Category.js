import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import SaveIcon from '@material-ui/icons/Save';

import {useStyles} from './categorystyles';
import CategoryList from './CategoryList';
import GroupList from './GroupList';
import AddCategory from './AddCategory';
import useCategories from './useCategories';

export default function Category() {
  const classes = useStyles();
  const categories = useCategories();
  const [activeCategory, setActiveCategory] = useState(null);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if(categories && categories.length){
      setActiveCategory(categories[0])
    }
  }, [categories])
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
    <div className={classes.root}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{display: 'none'}}>
       Create Category
      </Button>
      <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} sm={3}>
            <div>
            <Paper component="form" className={classes.categorySearch}>
              <InputBase
                className={classes.input}
                placeholder="Search Google Maps"
                inputProps={{ 'aria-label': 'search google maps' }}
              />
              <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
            </div>
            <div style={{marginTop: '10px'}}>
              <Paper>
                <CategoryList categories={categories} setActiveCategory={setActiveCategory} />
              </Paper>
              
            </div>
            <div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<SaveIcon />}
              onClick={handleClickOpen}
            >
              Add Category
            </Button>
            </div>
          </Grid>
          <Grid item xs={12} sm={9} >
            <Paper style={{padding: '10px'}}>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
              <Grid item>
              <Typography variant="h6" gutterBottom>
                {activeCategory ? activeCategory.name: 'Category Name'}
              </Typography>
              <Typography variant="p" gutterBottom>
                {activeCategory ? activeCategory.description: 'Category Description'}
              </Typography>
              </Grid>
              <Grid item className={classes.actionItem}>
                <Button variant="outlined" onClick={handleClickOpen}>Add Group</Button>
                <Button variant="outlined" onClick={handleClickOpen}>Edit</Button> 
                <Button variant="outlined">Delete</Button>
              </Grid>
              </Grid>
            </Paper>
            <div style={{marginTop: '10px'}}>
            <GroupList activeCategory={activeCategory} />
            </div>
          </Grid>
      </Grid>
      <AddCategory open={open} handleClose={handleClose} />
    </div>
    </>
  );
}

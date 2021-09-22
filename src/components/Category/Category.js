import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import SaveIcon from '@material-ui/icons/Save';

import { useStyles } from './categorystyles';
import CategoryList from './CategoryList';
import GroupList from './GroupList';
import AddCategory from './AddCategory';
import AddGroup from './AddGroup';
import useCategories from './useCategories';
import DeleteCategory from './DeleteCategory';
import DeleteGroup from './DeleteGroup';

export default function Category() {
  const classes = useStyles();
  const categories = useCategories();
  const [activeCategory, setActiveCategory] = useState(null);
  const [open, setOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteGroup, setDeleteGroup] = useState(false);
  const [mode, setMode] = useState(null);
  const [activeGroup, setActiveGroup] = useState(null);
  const [searchString, setSearchString] = useState('');
  const [currCategories, setCurrCategories] = useState([...categories]);
  useEffect(() => {
    if (categories && categories.length) {
      setActiveCategory(categories[0])
      setCurrCategories(categories)
    }
  }, [categories])
  useEffect(() => {
    if(searchString){
      let filteredCategories = categories && categories.length ? [...categories].filter((item) => item.name.toLowerCase().includes(searchString.toLowerCase())) : []
      if(filteredCategories.length){
        setActiveCategory(filteredCategories[0])
        setCurrCategories([...filteredCategories])
      }
      else{
        setActiveCategory(null)
        setCurrCategories([])
      }
    }
    else{
      setCurrCategories(categories)
      setActiveCategory(categories[0])
    }
  }, [searchString])
  const filterCategories = () => {
    if(searchString){
      let filteredCategories = categories && categories.length ? [...categories].filter((item) => item.name.toLowerCase().includes(searchString.toLowerCase())) : []
      if(filteredCategories.length){
        setActiveCategory(filteredCategories[0])
        setCurrCategories([...filteredCategories])
      }
      else{
        setActiveCategory(null)
        setCurrCategories([])
      }
    }
    else{
      setCurrCategories(categories)
      setActiveCategory(categories[0])
    }
  }
  const handleClickOpen = (val) => {
    setOpen(true);
    setMode(val);
  };
  const handleClose = () => {
    setOpen(false);
    setMode(null);
  };
  const handleGroupClose = () => {
    setGroupOpen(false);
  }
  const handleGroupOpen = () => {
    setGroupOpen(true);
  }
  const handleAction = (action, group) => {
    setActiveGroup({ ...group });
    if (action === 'edit') {
      setGroupOpen(true);
    }
    else{
      setDeleteGroup(true);
    }
  }
  return (
    <>
      <div className={classes.root}>
        <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{ display: 'none' }}>
          Create Category
        </Button>
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} sm={3}>
            <div>
              <Paper component="form" className={classes.categorySearch}>
                <InputBase
                  className={classes.input}
                  placeholder="Search Categories..."
                  inputProps={{ 'aria-label': 'search categories' }}
                  value={searchString}
                  onChange={(e) => setSearchString(e.target.value)}
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Paper>
            </div>
            <div style={{ marginTop: '10px' }}>
              <Paper>
                <CategoryList categories={currCategories} setActiveCategory={setActiveCategory} />
              </Paper>

            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={() => handleClickOpen('add')}
              >
                Add Category
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} sm={9} >
            <Paper style={{ padding: '10px' }}>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="h6" gutterBottom>
                    {activeCategory ? activeCategory.name : 'Category Name'}
                  </Typography>
                  <Typography variant="p" gutterBottom>
                    {activeCategory ? activeCategory.description : 'Category Description'}
                  </Typography>
                </Grid>
                <Grid item className={classes.actionItem}>
                  {
                    activeCategory ?
                      <>
                        <Button variant="outlined" onClick={handleGroupOpen}>Add Group</Button>
                        <Button variant="outlined" onClick={() => handleClickOpen('edit')}>Edit</Button>
                        <Button variant="outlined" onClick={() => setDeleteOpen(true)}>Delete</Button>
                      </>
                      : null
                  }
                </Grid>
              </Grid>
            </Paper>
            <div style={{ marginTop: '10px' }}>
              <GroupList activeCategory={activeCategory} handleAction={handleAction} />
            </div>
          </Grid>
        </Grid>
        <AddCategory open={open} handleClose={handleClose} activeCategory={mode == 'edit' ? activeCategory : null} />
        <DeleteCategory open={deleteOpen} handleClose={() => setDeleteOpen(false)} categoryId={activeCategory ? activeCategory.id : ''} />
        <AddGroup open={groupOpen} handleClose={handleGroupClose}
          categoryId={activeCategory ? activeCategory.id : ''}
          activeGroup={activeGroup}
        />
        <DeleteGroup
          open={deleteGroup}
          handleClose={() => setDeleteGroup(false)}
          categoryId={activeCategory ? activeCategory.id : ''}
          groupId={activeGroup ? activeGroup.id : ''}
        />
      </div>
    </>
  );
}

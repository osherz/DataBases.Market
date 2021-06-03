import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Typography, Toolbar, IconButton, List, Breadcrumbs } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import TableManagement from './table-management';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import './App.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 10,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 10 + drawerWidth,
  },
}));


function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [openMenu, setOpenMenu] = useState(true);
  const [tableNameToManage, setTableNameToManage] = useState('');
  const [directive, setDirective] = useState([]);

  const toggleMenu = () => setOpenMenu(!openMenu);
  const closeMenu = () => setOpenMenu(false);
  const changeTableToManage = (tableName) => {
    setTableNameToManage(tableName);
    setDirective(['Tables', tableName]);
  };

  const barHeader = "Market Data Management";
  const tablesNames = [
    'product',
    'employees',
    'branchs',
    'country',
    'manufacturer',
    'manufacturer_expenses',
    'product_in_branch',
    'publicity',
    'shareholder'
  ];
  const customQueries = ['a', 'b'];

  return (

    <div>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openMenu,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleMenu}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb" style={{ color: 'white' }}>
            <Typography variant="h6" noWrap>
              {barHeader}
            </Typography>
            {
              directive.map(text => (
                <Typography variant="h6" noWrap>
                  {text}
                </Typography>
              ))}
          </Breadcrumbs>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={openMenu}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div>
          <IconButton onClick={closeMenu}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListSubheader component="div" id="tables-to-manage-subheader">
            Tables To Manage
        </ListSubheader>
          {tablesNames.map((text, index) => (
            <ListItem button key={text} onClick={() => changeTableToManage(text)}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <ListSubheader component="div" id="custom-queries-subheader">
          Custom Queries
        </ListSubheader>
        <List >
          {customQueries.map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: openMenu,
        })}
      >
        <div className={classes.drawerHeader} />
        <TableManagement tableName={tableNameToManage} />
      </main>
    </div>
  );
}

export default App;

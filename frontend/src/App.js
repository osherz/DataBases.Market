import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Typography, Toolbar, IconButton, List, Breadcrumbs } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { ListItemText, ListSubheader } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import TableManagement from './pages/table-management';
import './App.css';
import QueryTable from './pages/query-table';
import MainPage from './pages/main-page';

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

const MAIN = 'main';
const MANAGEMENT = 'management';
const QUERIES = 'queries';

const customQueries = [
  'avg_country_price',
  'avg_manu_price',
  'best_manufaturer_of_each_branch',
  'big_seniority',
  'biggest_shareholders',
  'count_of_employees_in_each_branch',
  'maneger_manege_branch_by_bigest_revenue',
  'max_manu_cuntry',
  'max_manu_product',
  'min_salary',
  'num_of_town',
  'number_of_employs',
  'number_of_manager',
  'nums_emploeeys+sum_of_salary',
  'our_biggest_manufaturer',
  'over_ten_thousand',
  'product_of_min_manu',
  'salary_of_employee',
  'The_branch_with_the_most_products',
  'sum_of_meters_in_all_sopers',
  'the_number_os_branchs',
  'total_profit_all_branchs',
  'total_publicity_cost'
];


function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [openMenu, setOpenMenu] = useState(true);
  const [tableNameToManage, setTableNameToManage] = useState('');
  const [queryFullPath, setQueryFullPath] = useState('');
  const [directive, setDirective] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(MAIN);

  const toggleMenu = () => setOpenMenu(!openMenu);
  const closeMenu = () => setOpenMenu(false);
  const changeTableToManage = (tableName) => {
    setCurrentCategory(MANAGEMENT);
    setTableNameToManage(tableName);
    setDirective(['Tables', tableName]);
  };
  const changeQuery = (queryName) => {
    if (currentCategory !== QUERIES) setCurrentCategory(QUERIES);
    setQueryFullPath('query/' + queryName);
    setDirective(['Queries', queryName]);
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

  const mainDisplay = {
    [MAIN]: <MainPage />,
    [MANAGEMENT]: <TableManagement tableName={tableNameToManage} />,
    [QUERIES]: <QueryTable fullPath={queryFullPath} />
  }

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
        <ListItem button key="main" onClick={() => setCurrentCategory(MAIN)}>
              <ListItemText primary="Main" />
            </ListItem>
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
            <ListItem button key={text} onClick={() => changeQuery(text)}>
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
        <div style={{ height: "800px", width: "100%" }}>
          {mainDisplay[currentCategory]}
        </div>
      </main>
    </div>
  );
}


export default App;

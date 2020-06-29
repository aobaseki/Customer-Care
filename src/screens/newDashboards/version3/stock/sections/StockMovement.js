import React, {Component} from 'react';
import SectionNavbars from "../../../../../components/Sections/SectionNavbars";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AppBar from '@material-ui/core/AppBar';
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import SwipeableViews from "react-swipeable-views";
import TabPanel from "../../../../../components/Tabs/TabPanel";
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import {withRouter} from "react-router";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import BottomDrawer from "../../../../../components/Drawer/BottomDrawer/BottomDrawer";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ShareIcon from '@material-ui/icons/Share';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PrintIcon from '@material-ui/icons/Print';
import ListItemText from '@material-ui/core/ListItemText';

import SortDate from './movement/SortDate';
import SortProduct from './movement/SortProduct';

class StockMovement extends Component {

    state={
        value: 0,
        isShowDrawer: false,
    }

    props={
        history: this.props
    }

    handleChange = (event, newValue) => {
        this.setState({value: newValue});
      };

    handleChangeIndex = index => {
        this.setState({value: index});
    };

    render() {

        const a11yProps = (index) => {
            return {
                id: `full-width-tab-${index}`,
                'aria-controls': `full-width-tabpanel-${index}`,
            };
        };

        return(
            <div>

                <SectionNavbars
                    title="Stock movement"
                    leftIcon={
                        <div onClick={() => this.props.history.goBack()}>
                            <ArrowBackIcon
                                style={{fontSize: '2rem'}}
                            />
                        </div>
                    }
                    icons={
                        <div onClick={() => this.setState({isShowDrawer: true})}>
                            <MoreVertIcon
                                style={{fontSize: '2rem'}}
                            />
                        </div>
                    }
                />

                <div
                    onClick={() => this.setState({isShowDrawer: false})}
                    onKeyDown={() => this.setState({isShowDrawer: false})}
                >
                    <BottomDrawer isShow={this.state.isShowDrawer}>
                        <ListItem button key={11}>
                            <ListItemIcon><ShareIcon style={{color: '#707070'}} /></ListItemIcon>
                            <ListItemText primary="Share" />
                        </ListItem>
                        <ListItem button key={12}>
                            <ListItemIcon><CloudUploadIcon style={{color: '#707070'}} /></ListItemIcon>
                            <ListItemText primary="Upload" />
                        </ListItem>
                        <ListItem button key={13}>
                            <ListItemIcon><FileCopyIcon style={{color: '#707070'}} /></ListItemIcon>
                            <ListItemText primary="Copy" />
                        </ListItem>
                        <ListItem button key={14}>
                            <ListItemIcon><PrintIcon style={{color: '#707070'}} /></ListItemIcon>
                            <ListItemText primary="Print this page" />
                        </ListItem>
                    </BottomDrawer>
                </div>

                <AppBar position="static" color="white">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        style={{marginTop: '60px'}}
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab style={{textTransform: 'none'}} label="Sort by date"  {...a11yProps(0)} />
                        <Tab style={{textTransform: 'none'}} label="Sort by product"   {...a11yProps(1)} />
                    </Tabs>
                </AppBar>

                <SwipeableViews
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabPanel value={this.state.value} index={0} >
                        <SortDate />
                    </TabPanel>

                    <TabPanel value={this.state.value} index={1} >
                        <SortProduct />
                    </TabPanel>

                </SwipeableViews>

                <Box
                    className="shadow1"
                    bgcolor="background.paper"
                    p={1}
                    style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
                >
                    <Button
                        variant="contained"
                        style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px', textTransform: 'none', fontSize:'17px'}}
                    >
                        Print
                    </Button>
                </Box>

            </div>
        )
    }

}

export default withRouter(StockMovement);
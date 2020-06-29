import React , {useEffect , useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import './BottomDrawer.scss';

const useStyles = makeStyles({
    list: {
        width: '100%',
        backgroundColor: '#FFFFFF'
    },
    fullList: {
        width: 'auto',
    },
});

export default function BottomDrawer(props) {
    const classes = useStyles();
    const [state, setState] = useState({
        bottom: props.isShow,
    });

    useEffect(() => {
        toggleDrawer('bottom' , props.isShow);
    });


    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({['bottom']: open });
    };

    const list = (anchor) => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List style={{color: '#000000'}}>
                {props.children}
            </List>
        </div>
    );

    return (
        <div>
            <React.Fragment key={`bottom`}>
                <Drawer
                    anchor={`bottom`}
                    open={props.isShow}
                    onClose={toggleDrawer('bottom', false)}
                >
                    {list('bottom')}
                </Drawer>
            </React.Fragment>
        </div>
    );
}

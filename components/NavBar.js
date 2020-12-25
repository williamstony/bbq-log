import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, makeStyles, Typography, Button } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Link from 'next/link';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}))

function NavBar() {
    const classes = useStyles();

    const [loginOpen, setLoginOpen] = useState(false);

    const handleLoginOpen = () => {
        setLoginOpen(true)
    }

    return (
            <header className="App-header">
                <AppBar position="static" color="background">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            BBQ Log
                        </Typography>
                        <Link href="/dashboard" passHref>
                            <Button>Dashboard</Button>
                        </Link>
                    </Toolbar>
                </AppBar>
            </header>
    );
}

export default NavBar;
import React, { useState, useEffect } from 'react';
import { makeStyles, Typography, Button, Container, TableContainer, TableBody, TableHead, TableRow, TableCell, Paper, Table, useTheme, withTheme } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import dbConnect from '../utils/dbConnect'
import Cook from '../models/Cook'

import Link from 'next/link'

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
    pageHeader: {
        color: theme.palette.text.primary,
        padding: theme.spacing(1),
    },
    table: {
        minWidth: 650,
        padding: theme.spacing(2),
        borderCollapse: 'unset',
    },
    tableContainer: {
        background: '#282c34',
        border: '1px solid #000'
    },
    addCookButton: {
        marginLeft: theme.spacing(2),
        color: theme.palette.primary[300],
        border: `1px solid ${theme.palette.primary[300]}`
    },
    link: {
        color: theme.palette.primary[300],
        fontWeight: "bold",
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
            color: '#FFF'
        }
    }
}))

function Dashboard({cooks}) {
    const theme = useTheme()
    const classes = useStyles();

    // const [cooks, setCooks] = useState()


    return (
        <div>
            <Container>
                <Typography variant="h3" className={classes.pageHeader}>
                    Dashboard
                    <Link href="/cook/add" passHref>
                    <Button variant="outlined" className={classes.addCookButton}>
                        Add Cook
                    </Button>
                    </Link>
                </Typography>
                <TableContainer className={classes.tableContainer} component={Paper} elevation={0}>
                        <Typography variant="h4" style={{padding: '16px'}}>
                            Recent Cooks
                        </Typography>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Meat Type</TableCell>
                                    <TableCell>Brand</TableCell>
                                    <TableCell>Rub</TableCell>
                                    <TableCell>Wood Type</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cooks?.map(cook => (
                                    <TableRow key={cook._id}>
                                        <TableCell component="th" scope="row">{new Intl.DateTimeFormat('en-US', { timeZone: "America/New_York" }).format(new Date(cook.date))}</TableCell>
                                        <TableCell><Link href={`/cook/${cook._id}`}><a className={classes.link}>{cook.meatType}</a></Link></TableCell>
                                        <TableCell>{cook.brand}</TableCell>
                                        <TableCell>{cook.rubs}</TableCell>
                                        <TableCell>{cook.woodPellets}</TableCell>
                                    </TableRow>
                                ))
                                }
                                
                            </TableBody>
                        </Table>
                </TableContainer>
            </Container>
        </div>
    );
}

export async function getServerSideProps() {
    await dbConnect()
  
    /* find all the data in our database */
    const result = await Cook.find({}).sort({date: -1})
    const cooks = JSON.parse(JSON.stringify(result))
  
    return { props: { cooks: cooks } }
  }

export default Dashboard;
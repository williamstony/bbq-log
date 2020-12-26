import React, { useState, useEffect } from 'react';
import { makeStyles, Typography, Button, Container, Grid, Card, CardContent, CardHeader, useTheme, Tabs, Tab, Box, AppBar, TableContainer, Table, TableBody, TableRow, TableHead, TableCell, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Checkbox, FormControlLabel } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import dbConnect from '../../../utils/dbConnect';
import Cook from '../../../models/Cook'

import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr';

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.text.primary,
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    mainCard: {
        margin: theme.spacing(1),
    },
    table: {
        minWidth: 650,
        padding: theme.spacing(2),
        borderCollapse: 'unset',
    },
    tableContainer: {
    },
    addCookButton: {
        marginLeft: theme.spacing(2),
        color: theme.palette.primary[300],
        border: `1px solid ${theme.palette.primary[300]}`
    },
    textFields: {
        marginBottom: theme.spacing(1)
    }
}))

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

function CookDetail(props) {
    const theme = useTheme()
    const classes = useStyles();
    const router = useRouter();
    const fetcher = url => fetch(url).then(res => res.json())

    const [tabValue, setTabValue] = useState(0)

    const [addResultsOpen, setAddResultsOpen] = useState(false)
    const [results, setResults] = useState({ appearance: '', smokeRing: '', tenderness: '', flavor: '', postCookComments: '', notesForNextCook: ''})

    const [addLogOpen, setAddLogOpen] = useState(false)
    const [cookLog, setCookLog] = useState({ time: '', currentCookerTemp: 0, currentMeatTemp: 0, airTemp: 0, tempUnits: 'Fahrenheit', ventPercent: 0, addedFuel: false, addedWood: false, addedWater: false, comment: ''})

    const { data: cook, error } = useSWR(`/api/cooks/${router.query.id}`, fetcher, { initialData: props.cook})
    

    async function postData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return await response.json()
    }

    const saveLog = (e) => {
        e.preventDefault();
        const data = {
            time: cookLog.time,
            currentCookerTemp: cookLog.currentCookerTemp,
            currentMeatTemp: cookLog.currentMeatTemp,
            airTemp: cookLog.airTemp,
            tempUnits: cookLog.tempUnits,
            ventPercent: cookLog.ventPercent,
            addedFuel: cookLog.addedFuel,
            addedWood: cookLog.addedWood,
            addedWater: cookLog.addedWater,
            comment: cookLog.comment
        }
        const newLog = cook.cookLog.push(data)
        mutate(`/api/cooks/${router.query.id}`, {...cook, cooklog: newLog}, false)
        postData(`/api/cooks/${router.query.id}/addlog`, data)
            .then((data) => {
                mutate(`/api/cooks/${router.query.id}`)
                handleLogClose()
            }).catch((error) => {
                console.log(error)
            })
    }

    // const saveResults = (e) => {
    //     e.preventDefault();
    //     const data = {
    //         appearance: results.appearance,
    //         smokeRing: results.smokeRing,
    //         tenderness: results.tenderness,
    //         flavor: results.flavor,
    //         postCookComments: results.postCookComments,
    //         notesForNextCook: results.notesForNextCook
    //     }
    //     postData(`/api/cooks/${id}/edit`, data)
    //         .then((data) => {
    //             fetch(`/cooks/${id}`)
    //                 .then(res => res.json())
    //                 .then(setCook)
    //             handleResultsClose()
    //         }).catch((error) => {
    //             console.log(error)
    //         })
    // }


    const saveResults = (e) => {
        return null
    }

    const handleTabChange = (event, newTabValue) => {
        setTabValue(newTabValue)
    }

    const handleLogOpen = () => {
        setAddLogOpen(true)
    }

    const handleLogClose = () => {
        setAddLogOpen(false)
        setCookLog({ time: '', currentCookerTemp: 0, currentMeatTemp: 0, airTemp: 0, tempUnits: 'Fahrenheit', ventPercent: 0, addedFuel: false, addedWood: false, addedWater: false, comment: '' })
    }

    const handleResultsOpen = () => {
        setAddResultsOpen(true)
    }

    const handleResultsClose = () => {
        setAddResultsOpen(false)
        setResults({ appearance: '', smokeRing: '', tenderness: '', flavor: '', postCookComments: '', notesForNextCook: '' })
    }

    const onChange = (e) => {
        e.persist()
        setCookLog({ ...cookLog, [e.target.name]: e.target.value })
    }

    const onResultChange = (e) => {
        e.persist()
        setResults({ ...results, [e.target.name]: e.target.value })
    }

    const handleCheckedChange = event => {
        setCookLog({ ...cookLog, [event.target.name]: event.target.checked });
    };

    return (
        <div className={classes.root}>
            <Container>
                <Card variant="outlined" className={classes.mainCard}>
                    <CardHeader
                        title={`${cook.meatType} - ${new Intl.DateTimeFormat('en-US', { timeZone: "America/New_York" }).format(new Date(cook.date))}`} />
                    <CardContent>
                        <AppBar position="static" color="default" variant="outlined">
                            <Tabs
                                value={tabValue}
                                onChange={handleTabChange}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                            >
                                <Tab label="Details">
                                </Tab>
                                <Tab label="Cooker Log">
                                    Stuff goes here
                            </Tab>
                                <Tab label="Results">
                                    Some other Stuff
                            </Tab>
                            </Tabs>
                        </AppBar>
                        <TabPanel value={tabValue} index={0}>
                            <Grid container>
                                <Grid item xs={12} sm={6}>
                                    <p><strong>Brand:</strong> {cook.brand}</p>
                                    <p><strong>Weight:</strong> {cook.weight}lbs</p>
                                    <p><strong>Rub(s):</strong> {cook.rubs}</p>
                                    <p><strong>Sauce/Glaze:</strong> {cook.sauceGlaze}</p>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <p><strong>Wood/Pellets:</strong> {cook.woodPellets}</p>
                                    <p><strong>Target Cooker Temp:</strong> {cook.cookerTemp}</p>
                                    <p><strong>Target Meat Temp:</strong> {cook.meatTemp}</p>
                                </Grid>
                                <Grid item xs={12}>
                                    <p><strong>Prep: </strong></p><p>{cook.prep}</p>
                                </Grid>
                                <Grid item xs={12}>
                                    <p><strong>Pre Cook Comments: </strong></p><p>{cook.preCookComments}</p>
                                </Grid>
                                <Grid item xs={12}>
                                    <p><strong>Weather: </strong></p><p>{cook.weather}</p>
                                </Grid>
                            </Grid>
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            <TableContainer className={classes.tableContainer} component={Paper} variant="outlined">
                                <Typography variant="h4" style={{ padding: '16px' }}>
                                    Cooker Log
                                    <Button variant="outlined" className={classes.addCookButton} onClick={handleLogOpen}>
                                        Add Cook Log
                                    </Button>
                                </Typography>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Time</TableCell>
                                            <TableCell>Cooker Temp</TableCell>
                                            <TableCell>Meat Temp</TableCell>
                                            <TableCell>Air Temp</TableCell>
                                            <TableCell>Vent Open %</TableCell>
                                            <TableCell>Added Fuel</TableCell>
                                            <TableCell>Added Wood</TableCell>
                                            <TableCell>Added Water</TableCell>
                                            <TableCell>Comments</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cook.cookLog?.map(logItem => (
                                            <TableRow key={logItem._id}>
                                                <TableCell component="th" scope="row">{logItem.time}</TableCell>
                                                <TableCell>{logItem.currentCookerTemp}</TableCell>
                                                <TableCell>{logItem.currentMeatTemp}</TableCell>
                                                <TableCell>{logItem.airTemp}</TableCell>
                                                <TableCell>{logItem.ventPercent}</TableCell>
                                                <TableCell>{logItem.addedFuel.toString()}</TableCell>
                                                <TableCell>{logItem.addedWood.toString()}</TableCell>
                                                <TableCell>{logItem.addedWater.toString()}</TableCell>
                                                <TableCell>{logItem.comment}</TableCell>
                                            </TableRow>
                                        ))
                                        }

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </TabPanel>
                        <TabPanel value={tabValue} index={2}>
                            <Typography variant="h4" style={{ }}>
                                Cook Results
                                    <Button variant="outlined" className={classes.addCookButton} onClick={handleResultsOpen}>
                                    Add Results
                                    </Button>
                            </Typography>
                                                        <Grid container>
                                <Grid item xs={12}>
                                    <p><strong>Appearance:</strong> {cook.appearance}</p>
                                    <p><strong>Smoke Ring:</strong> {cook.smokeRing}</p>
                                    <p><strong>Tenderness:</strong> {cook.tenderness}</p>
                                    <p><strong>Flavor:</strong> {cook.flavor}</p>
                                    <p><strong>Post Cook Comments:</strong> {cook.postCookComments}</p>
                                    <p><strong>Notes For Next Cook:</strong> {cook.notesForNextCook}</p>
                                </Grid>
                            </Grid>
                        </TabPanel>

                    </CardContent>
                </Card>
            </Container>
            <Dialog open={addLogOpen} onClose={handleLogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Cooker Log Item</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add log entry for cook.
                    </DialogContentText>
                    <TextField className={classes.textFields} fullWidth variant="filled" label="Time" name="time" onChange={onChange}/>
                    <TextField className={classes.textFields} fullWidth variant="filled" label="Cooker Temp" name="currentCookerTemp" onChange={onChange}/>
                    <TextField className={classes.textFields} fullWidth variant="filled" label="Meat Temp" name="currentMeatTemp" onChange={onChange}/>
                    <TextField className={classes.textFields} fullWidth variant="filled" label="Air Temp" name="airTemp" onChange={onChange}/>
                    <TextField className={classes.textFields} fullWidth variant="filled" label="Vent Percent" name="ventPercent" onChange={onChange} />
                    <FormControlLabel
                        control={
                            <Checkbox inputProps={{ 'aria-label': 'Added Fuel' }} name="addedFuel" onChange={handleCheckedChange} />
                        }
                        label="Added Fuel"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox inputProps={{ 'aria-label': 'Added Wood' }} name="addedWood" onChange={handleCheckedChange} />
                        }
                        label="Added Wood"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox inputProps={{ 'aria-label': 'Added Water' }} name="addedWater" onChange={handleCheckedChange} />
                        }
                        label="Added Water"
                        />
                    <TextField className={classes.textFields} fullWidth multiline rows="3" variant="filled" label="Comment" name="comment" onChange={onChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLogClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={saveLog} color="primary">
                        Add Log
          </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={addResultsOpen} onClose={handleResultsClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Cook Results</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Various results of the cook.
                    </DialogContentText>
                    <TextField className={classes.textFields} fullWidth variant="filled" multiline rows="3" label="Appearance" name="appearance" onChange={onResultChange}/>
                    <TextField className={classes.textFields} fullWidth variant="filled" multiline rows="3" label="Smoke Ring" name="smokeRing" onChange={onResultChange}/>
                    <TextField className={classes.textFields} fullWidth variant="filled" multiline rows="3" label="Tenderness" name="tenderness" onChange={onResultChange}/>
                    <TextField className={classes.textFields} fullWidth variant="filled" multiline rows="3" label="Flavor" name="flavor" onChange={onResultChange}/>
                    <TextField className={classes.textFields} fullWidth variant="filled" multiline rows="3" label="Post Cook Comments" name="postCookComments" onChange={onResultChange}/>
                    <TextField className={classes.textFields} fullWidth variant="filled" multiline rows="3" label="Notes For Next Cook" name="notesForNextCook" onChange={onResultChange}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleResultsClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={saveResults} color="primary">
                        Add Results
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export async function getServerSideProps(context){
    await dbConnect()
    const { id } = context.params

    const result = await Cook.findById(id)
    const cook = JSON.parse(JSON.stringify(result))

    return {props: {cook}}

}

export default CookDetail;
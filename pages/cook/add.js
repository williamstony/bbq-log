import { useState, useEffect } from 'react';
import { makeStyles, Typography, Button, Container, TableContainer, TableBody, TableHead, TableRow, TableCell, Paper, Table, useTheme, TextField, Grid } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import {useRouter} from 'next/router'
import useSWR, { mutate } from 'swr';

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
        background: theme.palette.primary[700],
    },
    saveCookButton: {
        color: theme.palette.primary[300],
        border: `1px solid ${theme.palette.primary[300]}`
    }
}))

function AddCook() {
    const theme = useTheme()
    const classes = useStyles();
    const router = useRouter()

    const [cookInfo, setCookInfo ] = useState({meat_type: '', brand: '', weight: 0, prep: '', rub: '', glaze: '', wood_pellets: '', cooker_temp: 0, meat_temp: 0, pre_cook_comments: '', starting_weather: '' })

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

    const saveCook = (e) => {
        e.preventDefault();
        const data = {
            meatType: cookInfo.meat_type,
            brand: cookInfo.brand,
            weight: cookInfo.weight,
            prep: cookInfo.prep,
            rubs: cookInfo.rub,
            sauceGlaze: cookInfo.glaze,
            woodPellets: cookInfo.wood_pellets,
            cookerTemp: cookInfo.cooker_temp,
            meatTemp: cookInfo.meat_temp,
            preCookComments: cookInfo.pre_cook_comments,
            weather: cookInfo.starting_weather
        }
        postData(`/api/cooks`, data)
        .then((data) => {
            console.log(data)
            router.push(`/cook/${data._id}`)
        }).catch((error) => {
            console.log(error)
        })
    }

    const onChange = (e) => {
        e.persist()
        setCookInfo({...cookInfo, [e.target.name]: e.target.value})
    }

    return (
        <div className={classes.root}>
            <Container>
            <form noValidate autoComplete="off" onSubmit={saveCook} >
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h3" className={classes.pageHeader}>
                        Add Cook
                    </Typography>
                </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth variant="filled" id="meat-type" label="Meat Type" name="meat_type" onChange={onChange} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth variant="filled" id="brand" label="Brand" name="brand" onChange={onChange} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth variant="filled" id="weight" label="Weight" name="weight" onChange={onChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth variant="filled" multiline rows="3" id="prep" label="Prep" name="prep" onChange={onChange} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth variant="filled" id="rub" label="Rub(s)" name="rub" onChange={onChange} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth variant="filled" id="glaze" label="Sauce/Glaze" name="glaze" onChange={onChange} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth variant="filled" id="smoke-wood" label="Wood/Pellets Used" name="wood_pellets" onChange={onChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth variant="filled" id="cooker-temp" label="Target Cooker Temp" name="cooker_temp" onChange={onChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth variant="filled" id="meat-temp" label="Target Meat Temp" name="meat_temp" onChange={onChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth variant="filled" multiline rows="3" id="pre-cook-comments" label="Pre Cook Comments" name="pre_cook_comments" onChange={onChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth variant="filled" multiline rows="3" id="starting-weather" label="Weather Conditions" name="starting_weather" onChange={onChange} />
                    </Grid>
                    <Grid item xs={12} justify="flex-end" container>
                        <Button variant="outlined" type="submit" className={classes.saveCookButton}>Save</Button>
                    </Grid>
            </Grid>
            </form>
            </Container>
        </div>
    );
}

export default AddCook;
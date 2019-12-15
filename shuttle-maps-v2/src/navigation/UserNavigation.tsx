import React, { useState } from 'react';
import { Checkbox, FormControlLabel, makeStyles, Theme, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(3, 2),
        minHeight: "100%"
    },
}),
);

interface Props {
    onRouteSelectionChanged: (value: string) => void;
}

function UserNavigation({onRouteSelectionChanged}: Props) {
    const classes = useStyles();

    const [selected, setSelected] = useState("all");

    //TODO: make sure one of options is selected
    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => { 
        onRouteSelectionChanged(event.target.value);
        setSelected(event.target.value);
    };

    return (
        <Paper className={classes.root}>
            <FormControlLabel
                control={<Checkbox disabled checked={selected === "all"} onChange={handleChange} value="all" />}
                label="Show all routes"
            />
        </Paper>
    );
}

export default UserNavigation;
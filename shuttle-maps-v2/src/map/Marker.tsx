import React from 'react';
import RoomIcon from '@material-ui/icons/Room';
import { Point } from '../types';

interface Props extends Point {}

export function Marker({location, title} : Props) {

    return (
        <RoomIcon/>
    )
}
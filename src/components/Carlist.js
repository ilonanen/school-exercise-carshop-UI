import React, { useState, useEffect } from 'react'

import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Snackbar from '@material-ui/core/Snackbar'

import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'

import AddCar from './AddCar'
import EditCar from './EditCar'

function Carlist() {
    const [cars, setCars] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        getCars()
    }, []) // tyhjä taulukko, jotta suoritetaan vain 1. renderöinnin jälkeen

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const getCars = () => {
        fetch('http://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err))
    }

    const deleteCar = (params) => {
        if (window.confirm('Are you sure?')) {
            fetch(params.value, {
                method: 'DELETE'
            })
            .then(_ => getCars()) // alaviiva kertoo, että tiedetään, että tulee parametreja (response) mutta niitä ei käytetä
            .then(_ => handleOpen())
            .catch(err => console.error(err))
        }
    }

    const addCar = (newCar) => {
        fetch('http://carstockrest.herokuapp.com/cars', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newCar)
        })
        .then(response => getCars()) // kannattaa tehdä if (response.ok)
        .catch(err => console.error(err))
    }

    const updateCar = (link, car) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(response => getCars())
        .catch(err => console.error(err))
    }

    const columns = [
        {field: 'brand', sortable: true, filter: true}, 
        {field: 'model', sortable: true, filter: true},
        {field: 'color', sortable: true, filter: true},
        {field: 'fuel', sortable: true, filter: true},
        {field: 'year', width: 100, sortable: true, filter: true},
        {field: 'price', width: 100, sortable: true, filter: true},
        {
            headerName: '',
            field: '_links.self.href',
            width: 90,
            cellRendererFramework: params => <EditCar updateCar = {updateCar} params = {params} />
        },
        {
            headerName: '',
            field: '_links.self.href',
            width: 90,
            cellRendererFramework: params => 
                <IconButton color = 'secondary' onClick = {() => deleteCar(params)}>
                    <DeleteIcon />
                </IconButton>
        }
    ]

    return(
        <div>
            <AddCar addCar = {addCar} />
            <div className = 'ag-theme-material' style = {{height: 720, width: '80%', margin: 'auto'}}>
                <AgGridReact
                rowData = {cars}
                columnDefs = {columns}
                pagination = 'true'
                paginationPageSize = '12'>
                </AgGridReact>
            </div>
            <Snackbar
            open = {open}
            onClose = {handleClose}
            autoHideDuration = {2500}
            message = 'Car deleted successfully'
            />
        </div>
    )
}

export default Carlist
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


function EditCar(props) {

    const [open, setOpen] = useState(false)
    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        year: '',
        price: ''
    })

    const handleClickOpen = () => {
        setCar({
            brand: props.params.data.brand,
            model: props.params.data.model,
            color: props.params.data.color,
            fuel: props.params.data.fuel,
            year: props.params.data.year,
            price: props.params.data.price
        })
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setCar({
            brand: '',
            model: '',
            color: '',
            fuel: '',
            year: '',
            price: ''
        })
    }

    const handleSave = () => {
        props.updateCar(props.params.value, car) // value sisältää tässä linkin
        handleClose()
    }

    const inputChanged = (event) => {
        setCar({...car, [event.target.name]: event.target.value})
    }

    return (
        <div>
            <Button size = 'small' color="primary" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open = {open} onClose = {handleClose}>
                <DialogTitle>Update car</DialogTitle>
                <DialogContent>
                <TextField
                    margin = "dense"
                    label = "Brand"
                    name = 'brand'
                    value = {car.brand}
                    onChange = {inputChanged}
                    fullWidth
                />
                <TextField
                    margin = "dense"
                    label = "Model"
                    name = 'model'
                    value = {car.model}
                    onChange = {inputChanged}
                    fullWidth
                />
                <TextField
                    margin = "dense"
                    label = "Color"
                    name = 'color'
                    value = {car.color}
                    onChange = {inputChanged}
                    fullWidth
                />
                <TextField
                    margin = "dense"
                    label = "Fuel"
                    name = 'fuel'
                    value = {car.fuel}
                    onChange = {inputChanged}
                    fullWidth
                />
                <TextField
                    margin = "dense"
                    label = "Year"
                    name = 'year'
                    value = {car.year}
                    onChange = {inputChanged}
                    fullWidth
                />
                <TextField
                    margin = "dense"
                    label = "Price"
                    name = 'price'
                    value = {car.price}
                    onChange = {inputChanged}
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditCar
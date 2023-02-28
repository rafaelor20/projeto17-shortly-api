import { Router } from 'express'
import { rentalSchemaValidation } from '../middlewares/rental.middleware.js'
import { registerRental, returnRental, listRentals, deleteRental } from '../controllers/rental.controller.js'

const routerRentals = Router()


routerRentals.post("/rentals", rentalSchemaValidation, registerRental) 
routerRentals.get("/rentals", listRentals)
routerRentals.post("/rentals/:id/return", returnRental)
routerRentals.delete("/rentals/:id", deleteRental)


export default routerRentals
import { Router } from 'express';
import {createCustomer, removeCustomer, editCustomer, getCustomer, getAllCustomers
} from '../controllers/customer';

const router = Router();

router.post('/createCustomer', createCustomer);
router.delete('/removeCustomer/:id', removeCustomer);
router.put('/editCustomer/:id', editCustomer);
router.get('/getCustomer/:id', getCustomer);
router.get('/', getAllCustomers);

export default router;

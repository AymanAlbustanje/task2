import { Request, Response } from 'express';
import { Customer } from '../db/entities/customer';

const createCustomer = async (req: Request, res: Response) => {

    const { name, mobilePhone, balance } = req.body;
    const newCustomer = Customer.create({ name, mobilePhone, balance });
    await newCustomer.save();
    res.status(201).send(newCustomer);
};

const removeCustomer = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    const customer = await Customer.findOneBy({ id });
    if (customer) {
        await customer.remove();
        res.status(204).send();
    } else {
        res.status(404).send('Customer not found');
    }
};

const editCustomer = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    const { name, mobilePhone, balance } = req.body;
    const customer = await Customer.findOneBy({ id });
    if (customer) {
        customer.name = name;
        customer.mobilePhone = mobilePhone;
        customer.balance = balance;
        await customer.save();
        res.status(200).send(customer);
    } else {
        res.status(404).send('Customer not found');
    }
};

const getCustomer = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    const customer = await Customer.findOneBy({ id });
    if (customer) {
        res.status(200).send(customer);
    } else {
        res.status(404).send('Customer not found');
    }
};

const getAllCustomers = async (req: Request, res: Response) => {

    const customers = await Customer.find();
    res.status(200).send(customers);
};

export { createCustomer, removeCustomer, editCustomer, getCustomer, getAllCustomers };
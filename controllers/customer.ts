import { Request, Response, NextFunction } from 'express';
import { Customer } from '../db/entities/customer';
import { AppError } from '../errors/AppError';

const createCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, mobilePhone, balance } = req.body;
        const existingCustomer = await Customer.findOneBy({ mobilePhone });

        if (existingCustomer) {
            throw new AppError('Customer with this mobile phone already exists', 409, true);
        }

        const newCustomer = Customer.create({ name, mobilePhone, balance });
        await newCustomer.save();
        res.status(201).send(newCustomer);
    } catch (error) {
        next(error);
    }
};

const removeCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const customer = await Customer.findOneBy({ id });

        if (!customer) {
            throw new AppError('Customer not found', 404, true);
        }

        await customer.remove();
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const editCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const { name, mobilePhone, balance } = req.body;
        const customer = await Customer.findOneBy({ id });

        if (!customer) {
            throw new AppError('Customer not found', 404, true);
        }

        customer.name = name;
        customer.mobilePhone = mobilePhone;
        customer.balance = balance;
        await customer.save();
        res.status(200).send(customer);
        
    } catch (error) {
        next(error);
    }
};

const getCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const customer = await Customer.findOneBy({ id });

        if (!customer) {
            throw new AppError('Customer not found', 404, true);
        }

        res.status(200).send(customer);
    } catch (error) {
        next(error);
    }
};

const getAllCustomers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customers = await Customer.find();
        res.status(200).send(customers);
    } catch (error) {
        next(error);
    }
};

export { createCustomer, removeCustomer, editCustomer, getCustomer, getAllCustomers };

import { getDnsRecords } from "@layered/dns-records";
import domainModel from "../Schema/domainModel.js";
import NewError from "../utils/NewError.js";

export const uploadDomain = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) {
            return next(new NewError('Name is required', 400));
        }

        const domainExists = await domainModel.findOne({ name });
        if (domainExists) {
            return next(new NewError('Domain Already Exists. Please Choose another name for domain', 400));
        }

        const domain = await domainModel.create({
            name,
            type: 'undefined',
            ttl: 0,
            data: 'undefined'
        });
        if (!domain) {
            return next(new NewError('Domain Registartion Failed', 400));
        }

        const record1 = await getDnsRecords(name);
        if (record1) {
            domain.name = record1[0].name;
            domain.type = record1[0].type;
            domain.ttl = record1[0].ttl;
            domain.data = record1[0].data;
        }
        await domain.save();
        res.status(201).json({
            success: true,
            message: 'Domain Registartion Successfull',
            domain
        })
    } catch (error) {
        console.log(error.message);
    }
}

export const uploadDomainManually = async (req, res, next) => {
    const { name, type, ttl, data } = req.body;
    if (!name || !type || !ttl || !data) {
        return next(new NewError('All fields are required', 400));
    }

    const domainExists = await domainModel.findOne({ name });
    if (domainExists) {
        return next(new NewError('Domain already exists', 400));
    }

    const domain = await domainModel.create({
        name,
        type,
        ttl,
        data
    });
    if (!domain) {
        return next(new NewError('Domain Registration Failed', 400));
    }
    await domain.save();
    res.status(201).json({
        success: true,
        message: 'Domain Registartion Successfull',
        domain
    })
}

export const getAllDomains = async (req, res, next) => {
    const domains = await domainModel.find({});
    res.status(200).json({
        success: true,
        message: 'All Domains',
        domains
    })
};

export const updateDomain = async (req, res, next) => {
    const { name, type, ttl, data } = req.body;
    const { id } = req.params;

    const domain = await domainModel.findById(id);

    if (!domain) {
        return next(new NewError('Invalid Domain id or domain does not exits'));
    }

    if (name) {
        domain.name = name;
    }
    if (type) {
        domain.type = type;
    }
    if (ttl) {
        domain.ttl = ttl;
    }
    if (data) {
        domain.data = data;
    }

    await domain.save();
    res.status(200).json({
        success: true,
        message: 'Domain Details Updated Successfully'
    });
};

export const deleteDomain = async (req, res, next) => {
    const {id} = req.params;
    const domain = await domainModel.findById(id);

    if (!domain) {
        return next(new NewError('Domain does not exist', 404));
    }

    await domain.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Domain deleted successfully'
    });
};
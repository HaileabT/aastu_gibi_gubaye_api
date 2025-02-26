import 'reflect-metadata';
import {AppDataSource} from '../data_source';
import {Service} from '../models/serviceModel';
import {catchAsync} from '../shared/utils/catchAsync.utils';
import {Request, Response, NextFunction} from 'express';
import {customError} from '../shared/utils/customError';

const serviceRepo = AppDataSource.getRepository(Service);
export const createService = catchAsync(async (req: Request, res: Response) => {
  const reqBody = req.body;
  const service = await serviceRepo.save(reqBody);

  res.status(201).json({
    status: 'success',
    data: {
      service,
    },
  });
});

export const getServices = catchAsync(async (req: Request, res: Response) => {
  const services = await serviceRepo.find();

  res.status(200).json({
    status: 'success',
    data: services,
  });
});

export const updateService = catchAsync(async (req: Request, res: Response) => {
  const serviceId = req.params.id;
  const reqBody = req.body;

  const service = await serviceRepo.findOne({where: {id: serviceId}});
  if (!service) {
    throw new customError('there is no service in this id', 404);
  }

  await serviceRepo.update(serviceId, reqBody);
  const updatedService = await serviceRepo.findOne({where: {id: serviceId}});

  res.status(200).json({
    status: 'success',
    data: {
      updatedService,
    },
  });
});

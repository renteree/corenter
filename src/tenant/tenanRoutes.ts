import { Express } from 'express';
import { celebrate } from 'celebrate';
import Joi from 'joi';
import listTenantAction from './listTenantAction';

export default function userRoutes(app: Express) {
  app.get(
    '/tenants',
    celebrate({
      query: Joi.object({
        offset: Joi.number().integer().min(0).max(1000),
        limit: Joi.number().integer().min(1).max(1000),
      }).required(),
    }),
    listTenantAction,
  );
}
import { Express } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import listTenantController from '../controllers/listTenantController';
import createTenantController from '../controllers/createTenantController';
import getTenantController from '../controllers/getTenantController';

export default function tenantRoutes(app: Express) {
  app.get(
    '/tenants',
    celebrate({
      [Segments.QUERY]: Joi.object({
        offset: Joi.number().integer().min(0).max(1000),
        limit: Joi.number().integer().min(1).max(1000),
      }).required(),
    }),
    listTenantController,
  );

  app.get(
    '/tenant/:tenantId',
    celebrate({
      [Segments.PARAMS]: {
        tenantId: Joi.number().integer().positive().required(),
      },
    }),
    getTenantController,
  );

  app.post(
    '/tenants',
    celebrate({
      [Segments.BODY]: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().allow(null, ''),
        name: Joi.string().required(),
        phone: Joi.string().required(),
        social: Joi.string().allow(null, ''),
        country: Joi.string().required(),
        city: Joi.string().required(),
        cityId: Joi.string().required(),
        tenantsDescription: Joi.string().allow(null, ''),
        minBudget: Joi.string().required(),
        maxBudget: Joi.string().required(),
        willPayFee: Joi.string().required(),
        housingType: Joi.string().required(),
        currency: Joi.string().required(),
      }).required(),
    }),
    createTenantController,
  );
}

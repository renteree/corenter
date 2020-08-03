import { Response, Request } from 'express';
import { Tenant } from '../models/TenantModel';
import createTenant from "../services/createTenant";

export default async function createTenantController(req: Request, res: Response) {
  try {
    const result: Tenant = await createTenant(req.body);
    res.send(result);
  } catch (e) {
    res.send(`Error: ${e}`);
  }
}

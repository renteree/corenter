import { Response, Request } from 'express';
import { Tenant } from '../models/TenantModel';

export default async function listTenantController(req: Request, res: Response) {
  try {
    const result: Tenant[] = await Tenant.findAll();
    res.send(result);
  } catch (e) {
    res.send('Error');
  }
}

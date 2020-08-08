import { Response, Request } from 'express';
import { Tenant } from '../models/TenantModel';
import normalizeTenant from '../normalization/normalizeTenant';

export default async function listTenantController(req: Request, res: Response) {
  try {
    const searchOptions = {
      include: [
        Tenant.associations.user,
        Tenant.associations.location,
      ],
    };

    const result: Tenant[] = await Tenant.findAll(searchOptions);
    const count: Number = await Tenant.count(searchOptions);

    const normalizedTenants = await Promise.all(result.map(normalizeTenant));

    const resData = {
      count,
      tenants: normalizedTenants,
    };

    return res.send(resData);
  } catch (e) {
    return res.send('Error');
  }
}

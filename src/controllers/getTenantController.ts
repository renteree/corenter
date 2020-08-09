import { Response, Request } from 'express';
import { Tenant } from '../models/TenantModel';
import normalizeTenant from '../normalization/normalizeTenant';

export default async function getTenantController(req: Request, res: Response) {
  const { tenantId } = req.params;

  try {
    const result: Tenant | null = await Tenant.findByPk(tenantId, {
      include: [
        Tenant.associations.user,
        Tenant.associations.location,
      ],
    });
    if (!result) {
      return res.sendStatus(404);
    }

    const normalizedTenant = await normalizeTenant(result);

    return res.send(normalizedTenant);
  } catch (e) {
    return res.sendStatus(404);
  }
}

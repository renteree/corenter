import { Response, Request } from 'express';
import { Tenant } from '../models/TenantModel';
import { User } from '../models/UserModel';
import { Location } from '../models/LocationModel';
import createTenant from '../services/createTenant';
import createUser from '../services/createUser';
import createLocation from '../services/createLocation';
import normalizeTenant from '../normalization/normalizeTenant';

export default async function createTenantController(req: Request, res: Response) {
  try {
    const {
      phone,
      name,
      social,
      country,
      city,
      title,
      description,
      tenantsDescription,
      minBudget,
      maxBudget,
      willPayFee,
      housingType,
      currency,
    } = req.body;

    const searchOptions = {
      include: [
        Tenant.associations.user,
        Tenant.associations.location,
      ],
    };

    const user: User = await createUser({ phone, name, social });
    const location: Location = await createLocation({ country, city });
    const createdTenant: Tenant = await createTenant({
      userId: user.id,
      locationId: location.id,
      title,
      description,
      tenantsDescription,
      minBudget,
      maxBudget,
      willPayFee,
      housingType,
      currency,
    });

    const tenant: Tenant | null = await Tenant.findByPk(createdTenant.id, searchOptions);

    if (!tenant) throw Error('tenant not found');

    return res.send(normalizeTenant(tenant));
  } catch (e) {
    return res.send(`Error: ${e}`);
  }
}

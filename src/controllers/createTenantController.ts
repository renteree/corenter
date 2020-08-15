import { Response, Request } from 'express';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { Tenant } from '../models/TenantModel';
import { User } from '../models/UserModel';
import { Location } from '../models/LocationModel';
import createTenant from '../services/createTenant';
import createUser from '../services/createUser';
import createLocation from '../services/createLocation';
import normalizeTenant from '../normalization/normalizeTenant';
import uploadImage from '../common/uploadFile';


export default async function createTenantController(req: Request, res: Response) {
  try {
    const {
      phone,
      name,
      social,
      country,
      city,
      cityId,
      title,
      description,
      tenantsDescription,
      minBudget,
      maxBudget,
      willPayFee,
      housingType,
      currency,
    } = req.body;

    const { file } = req;

    const searchOptions = {
      include: [
        Tenant.associations.user,
        Tenant.associations.location,
      ],
    };

    const user: User = await createUser({ phone, name, social });

    let imageUrl = null;

    if (file) {
      const buffer = await sharp(file.buffer)
        .toFormat('jpeg')
        .resize(400)
        .withMetadata() // Keeps initial rotate state
        .toBuffer();

      imageUrl = await uploadImage({
        fileName: `${user.id}-${uuidv4()}.jpeg`,
        buffer,
      });
    }

    const location: Location = await createLocation({ country, city, cityId });
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
      avatar: imageUrl,
    });

    const tenant: Tenant | null = await Tenant.findByPk(createdTenant.id, searchOptions);

    if (!tenant) throw Error('tenant not found');

    const normalizedTenant = await normalizeTenant(tenant);

    return res.send(normalizedTenant);
  } catch (e) {
    return res.send(`Error: ${e}`);
  }
}

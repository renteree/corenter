import { Tenant, TenantAttributes } from '../models/TenantModel';
import { UserAttributes } from '../models/UserModel';
import { LocationAttributes } from '../models/LocationModel';

interface NormalizedTenant extends Omit<TenantAttributes, 'userId'|'locationId'> {
  user?: Omit<UserAttributes, 'createdAt'>,
  location?: LocationAttributes,
}

export default function normalizeTenant({
  id,
  title,
  description,
  user,
  location,
  tenantsDescription,
  minBudget,
  maxBudget,
  willPayFee,
  housingType,
  currency,
  createdAt,
}: Tenant): NormalizedTenant {
  const { id: userId, phone, name } = user;

  return {
    id,
    title,
    description,
    user: {
      id: userId,
      phone,
      name,
    },
    location,
    tenantsDescription,
    minBudget,
    maxBudget,
    willPayFee,
    housingType,
    currency,
    createdAt,
  };
}

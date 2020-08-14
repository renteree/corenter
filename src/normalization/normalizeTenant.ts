import { Tenant, TenantAttributes } from '../models/TenantModel';
import { UserAttributes } from '../models/UserModel';
import { LocationAttributes } from '../models/LocationModel';

type Image = {
  url: string;
  width: string;
  height: string;
  type: string;
}

interface NormalizedTenant extends Omit<TenantAttributes, 'userId'|'locationId'> {
  user: Omit<UserAttributes, 'createdAt'>,
  location: LocationAttributes,
}

export default async function normalizeTenant({
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
  avatar,
  createdAt,
}: Tenant): Promise<NormalizedTenant> {
  const {
    id: userId,
    phone,
    name,
    social,
  } = user;

  return {
    id,
    title,
    description,
    user: {
      id: userId,
      phone,
      name,
      social,
    },
    location,
    tenantsDescription,
    minBudget,
    maxBudget,
    willPayFee,
    housingType,
    currency,
    createdAt,
    avatar,
  };
}

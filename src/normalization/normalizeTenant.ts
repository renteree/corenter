import ogs from 'open-graph-scraper';
import { Tenant, TenantAttributes } from '../models/TenantModel';
import { UserAttributes } from '../models/UserModel';
import { LocationAttributes } from '../models/LocationModel';
import reportError from '../common/reportError';

type imageType = {
  url: string;
  width: string;
  height: string;
  type: string;
}

interface NormalizedTenant extends Omit<TenantAttributes, 'userId'|'locationId'> {
  user: Omit<UserAttributes, 'createdAt'>,
  location: LocationAttributes,
  image: imageType | null
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
  createdAt,
}: Tenant): Promise<NormalizedTenant> {
  const {
    id: userId,
    phone,
    name,
    social,
  } = user;
  let image = null;
  if (social) {
    try {
      const { result } = await ogs({ url: social });
      if (result.success) {
        image = result.ogImage || null;
      }
    } catch (e) {
      reportError(e);
    }
  }

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
    image,
  };
}

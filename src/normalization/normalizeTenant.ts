import { Tenant } from '../models/TenantModel';

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
}: Tenant) {
  return {
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
  };
}

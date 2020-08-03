import { Tenant, TenantCreationAttributes } from '../models/TenantModel';

export default async function createTenant(tenant: TenantCreationAttributes): Promise<Tenant> {
  return Tenant.create(tenant);
}

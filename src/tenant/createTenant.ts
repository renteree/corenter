// @ts-ignore
import db from '../common/db';

export default async function createTenant(tenant: { title: String; }) {
  const {
    title,
  } = tenant;
  return db.tenant.create({
    title,
  });
}

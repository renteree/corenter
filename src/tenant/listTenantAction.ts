import { Response } from 'express';
import db from '../common/db';

export default async function listTenantAction(res: Response) {
  const result = await db.tenant.findAll();
  res.send(result);
}

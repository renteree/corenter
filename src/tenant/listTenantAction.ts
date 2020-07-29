import { Response, Request } from 'express';
import db from '../common/db';

export default async function listTenantAction(req: Request, res: Response) {
  const result = await db.tenant.findAll();
  res.send(result);
}

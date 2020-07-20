import { Response, Request } from 'express';

export default async function listTenantAction(req: Request, res: Response) {
  res.send([]);
}

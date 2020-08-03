import { Location, LocationCreationAttributes } from '../models/LocationModel';

export default async function createLocation(
  location: LocationCreationAttributes,
):Promise<Location> {
  return Location.create(location);
}

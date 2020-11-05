import {Type} from './Type';
import {DeviceAttributes} from './DeviceAttributes';

export class Device {

  id?: string;
  name: string;
  type : Type;
  status: boolean;
  attributes: DeviceAttributes[];
}

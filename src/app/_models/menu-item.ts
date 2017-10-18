import { FileDescriptor } from './file-descriptor';

export class MenuItem {
  id: string;
  image: FileDescriptor;
  name: string;
  weight: number;
  price: number;
}

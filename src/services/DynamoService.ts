import { EntityInstance } from '@typedorm/common';
import IDynamoService from './IDynamoService';

export default abstract class DynamoService<T extends EntityInstance> implements IDynamoService<T> {}

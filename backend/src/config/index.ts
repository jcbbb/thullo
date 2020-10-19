import { NODE_ENV } from './secrets';

import configs, { EnvType } from './configs';
const env = (NODE_ENV || 'development') as EnvType;

export default configs[env];


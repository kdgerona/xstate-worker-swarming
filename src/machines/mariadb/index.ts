import { Machine } from 'xstate'
import config from './config'
import implementation from './implementation'

export default Machine<any,any,any>(config, implementation)
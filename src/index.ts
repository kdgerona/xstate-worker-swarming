import { interpret } from 'xstate'

import ParentMachine from './machines/parent'

const clientService = interpret(ParentMachine)
clientService.start()
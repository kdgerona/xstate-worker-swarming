import SocketClientMachine from '../socket-client'
import MariaDBMachine from '../mariadb'
import { send } from 'xstate'

const implementation = {
    actions: {
        parentStartedLog: () => console.log('Parent machine started'),
        queryTooDB: send((_: any, event: any) => ({
            type: 'QUERY_REQUEST',
            payload: event.payload
        }), {to: 'startMariaDB'}),
        emitResponse: send((_: any, event: any) => ({
            type: 'EMIT_REQUEST_RESULT',
            payload: event.payload
        }), {to: 'startSocketClient'}),
    },
    services: {
        startSocketClient: SocketClientMachine,
        startMariaDB: MariaDBMachine,
    },
    guards: {},
    activities: {},
    delays: {}
}

export default implementation
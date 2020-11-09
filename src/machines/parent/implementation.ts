import SocketClientMachine from '../socket-client'
import MariaDBMachine from '../mariadb'

const implementation = {
    actions: {
        parentStartedLog: () => console.log('Parent machine started'),
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
const context = {
    host: process.env.SOCKET_SERVER_HOST || 'localhost:5000',
    socket: undefined
}

const config = {
    id: 'socket-client',
    context,
    initial: 'initialization',
    states: {
        initialization: {
            entry: 'initializationLog',
            invoke: {
                id:'initializedSocketClient',
                src: 'initializeSocketCLient',
            },
            on: {
                SOCKET_CONNECTED: {
                    actions: ['assignSocketInstance'],
                    target: 'running'
                },
            }
        },
        running: {
            entry: 'socketCLientStartedLog',
            invoke: {
                id: 'socketClientListeners',
                src: 'socketClientListeners',
            },
            on: {
                RECIEVED_TASK: {
                    actions: ['sendToParent']
                }
            }
        }
    }
}

export default config
import io from 'socket.io-client'
import { assign, sendParent } from 'xstate'

const worker_name = process.env.WORKER_NAME || 'Worker'

const implementation = {
    actions: {
        initializationLog: () => console.log(`${worker_name} is initializing`),
        socketCLientStartedLog: () => console.log(`${worker_name} started`),
        assignSocketInstance: assign({socket: (_: any,event: any) => event.payload}),
        // sendToParent: sendParent(''),
    },
    services: {
        initializeSocketCLient: (context: any) => (send: any) => {
            const socket = io('http://localhost:5000')

            console.log('im here')

            socket.on('connect', () => {
                send({type: 'SOCKET_CONNECTED', payload: socket})
            })

            socket.on('connect_error' , (error: any) => {
                console.log('errorxxx')
            })

            socket.on('reconnect' , () => {
                console.log('reconnectingxxx')
            })
        },
        socketClientListeners: (context: any) => (send: any) => {
            const { socket } = context

            socket.on('task', (data: any) => {
                socket.emit('task_acknowledge')

                send({type: 'RECIEVED_TASK', payload: data})
            })
        } 
    },
    guards: {},
    activities: {},
    delays: {}
}

export default implementation
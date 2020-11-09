import io from 'socket.io-client'
import { assign, sendParent } from 'xstate'

const worker_name = process.env.WORKER_NAME || 'Worker'

const implementation = {
    actions: {
        initializationLog: () => console.log(`${worker_name} is initializing`),
        socketCLientStartedLog: () => console.log(`${worker_name} started`),
        assignSocketInstance: assign({socket: (_: any,event: any) => event.payload}),
        sendToParent: sendParent((_, event: any) => ({
            type: 'QUERY_TO_DB',
            payload: event.payload
        })),
        emitRequestResult: (context: any, event: any) => {
            const { socket } = context;
            socket.emit('REQUEST_RESPONSE', event.payload)
            // This serve as acknowledgement
            socket.emit('worker_status', {
                payload: {
                    worker_name,
                    status: 'ready'
                }
            })
        }
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

            socket.on('request', (data: any) => {
                send({type: 'RECIEVED_REQUEST', payload: data})
                // This serves as the acknowledgement
                socket.emit('worker_status', {
                    payload: {
                        worker_name,
                        status: 'working'
                    }
                })
            })
        } 
    },
    guards: {},
    activities: {},
    delays: {}
}

export default implementation
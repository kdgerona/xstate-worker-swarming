import mariadb from 'mariadb'
import { assign, send, sendParent } from 'xstate'

const worker_name = process.env.WORKER_NAME || 'Worker'

const implementation = {
    actions: {
        initializationLog: () => console.log(`${worker_name} initializing mariadb database`),
        assignConnection: assign({mariadb_conn: (_:any, event: any) => event.payload}),
        mariadbStartedLog: () => console.log('databaseStartedLog'),
        errorLog: () => console.log('im mria error'),
        doneLog: () => console.log('im mria done'),
        queryRequest: send((_: any,event: any) => event, {to: 'databaseQuery'}),
        sendToParent: sendParent((_, event: any) => ({
            type: 'EMIT_RESPONSE',
            payload: event.payload
        })),
    },
    services: {
        initializeDatabase: (context: any) => async (send: any) => {
            // try{
            const { db_host, db_port, db_user, db_pass, db_name } = context
            const pool = mariadb.createPool({
                host: db_host,
                port: db_port,
                user: db_user,
                password: db_pass,
                database: db_name,
            })

            const conn = await pool.getConnection()

            send({type: 'ASSIGN_CONNECTION', payload: conn})
            
            // try{
            //     const res = await conn.query(`CREATE DATABASE test (
            //         id int primary key auto_increment,
            //         name varchar(255) not null
            //     )`);
            //     console.log('Testing', res)
            // }catch(e){
            //     console.log('happy', e.message)
            // }
        // }catch(e){
        //     console.log('***', e)
        // }
        },
        // databaseQuery: (context: any) => (send: any, onEvent: any) => {
        //     const { mariadb_conn } = context
            
        //     // const query = () => console.log('** imere querying ....')

        //     const query = async (event: any) => {
        //         const { query_type, payload } = event.payload

        //         switch(query_type){
        //             case 'LOGIN_USER':
        //                 // USER DATA = name, email, username, password
        //                 // LOGIN = username, password
        //                 const user_exist = await mariadb_conn.query(`SELECT * FROM users WHERE username=${payload.username}`)

        //                 if (!user_exist) return

        //                 break
        //             default: break
        //         }
        //     }

        //     onEvent(query)
        // }
        databaseQuery: (context: any) => async (send: any, onEvent: any) => {
            const { mariadb_conn } = context

            const [user_exist] = await mariadb_conn.query(`SELECT * FROM test_tbl WHERE name='Kevin Dave'`)

            if(!user_exist) console.log("User doesn't exists")

            // *** COMMENTED FOR NOW ***
            // send({type: 'QUERY_RESPONSE', payload: user_exist})
            console.log('*** user', user_exist)
        }
    },
    guards: {},
    activities: {},
    delays: {}
}

export default implementation
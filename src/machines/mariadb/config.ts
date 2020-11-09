const context = {
    db_host: process.env.DB_HOST || '127.0.0.1',
    db_port: process.env.DB_PORT || 9001,
    db_user: process.env.DB_USER || 'root',
    db_pass: process.env.DB_PASSWORD || 'admin101',
    db_name: process.env.DB_NAME || 'test',
    mariadb_conn: undefined
}

const config = {
    id: 'mariadb',
    context,
    initial: 'initialization',
    states: {
        initialization: {
            entry: 'initializationLog',
            invoke: {
                id: 'initializeDatabase',
                src: 'initializeDatabase',
                onDone: {
                    target: 'running',
                    actions: ['doneLog']
                },
                onError: {
                    actions: ['errorLog']
                }
            },
            on: {
                ASSIGN_CONNECTION: {
                    actions: ['assignConnection']
                }
            }
        },
        running: {
            entry: 'databaseStartedLog',
            invoke: {
                id: 'databaseQuery',
                src: 'databaseQuery',
            }
        },
    }
}

export default config
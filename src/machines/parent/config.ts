const context = {}

const config = {
    id: 'parent',
    context,
    initial: 'start',
    states: {
        start: {
            entry: 'parentStartedLog',
            invoke: [
                {
                    id: 'startSocketClient',
                    src: 'startSocketClient'
                },
                {
                    id: 'startMariaDB',
                    src: 'startMariaDB'
                }
            ],
            on: {
                QUERY_TO_DB: {
                    actions: ['queryTooDB']
                },
                EMIT_RESPONSE: {
                    actions: ['emitResponse']
                }
            }
        }
    }
}

export default config
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
            ]
        }
    }
}

export default config
export default class HyEventBus {
    private listeners: { [key: string]: { scope: unknown, callback: callback, args: unknown[] }[] }

    constructor() {
        this.listeners = {}
    }

    addEventListener(event: string, callback: callback, scope: unknown, ...args: unknown[]) {
        if (typeof this.listeners[event] !== 'undefined') {
            this.listeners[event].push({ scope, callback, args })
        } else {
            this.listeners[event] = [{ scope, callback, args }]
        }
    }

    removeEventListener(event: string, callback: callback, scope: unknown) {
        if (typeof this.listeners[event] === 'undefined') return

        const numOfCallbacks = this.listeners[event].length
        const listeners = []

        for (let i = 0; i < numOfCallbacks; i++) {
            const listener = this.listeners[event][i]

            if (listener.scope === scope &&
                listener.callback === callback) continue

            listeners.push(listener)
        }

        this.listeners[event] = listeners
    }

    dispatch(event: string, ...args: unknown[]) {
        if (typeof this.listeners[event] === 'undefined') return

        const listeners = this.listeners[event]
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i]
            if (listener && listener.callback) {
                const concatArgs = args.concat(listener.args)
                listener.callback.apply(listener.scope, concatArgs)
            }
        }
    }

    hasEventListener(event: string, callback: callback, scope: unknown) {
        if (typeof this.listeners[event] !== 'undefined') {
            const numOfCallbacks = this.listeners[event].length

            if (callback === undefined && scope === undefined) {
                return numOfCallbacks > 0
            }

            for (let i = 0; i < numOfCallbacks; i++) {
                const listener = this.listeners[event][i]
                if ((scope ? listener.scope === scope : true) && listener.callback === callback) {
                    return true
                }
            }
        }

        return false
    }
}
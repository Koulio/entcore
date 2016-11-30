import * as components from './components'
import * as routing from './routing'
import * as services from './services'

export let declarations = []
export let providers = []

for(let component in components) {
    declarations.push(components[component])
}
for(let routingService in routing) {
    if(routingService !== 'routes') {
        providers.push(routing[routingService])
    }
}
for(let service in services) {
    providers.push(services[service])
}
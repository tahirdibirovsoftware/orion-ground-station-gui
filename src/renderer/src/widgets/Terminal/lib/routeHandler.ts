import { Location, NavigateFunction } from 'react-router-dom'

const routeHandler = (location: Location<unknown>, navigate: NavigateFunction):void=> {
    if(location.pathname==='/flight') navigate('/terminal')
    if(location.pathname==='/terminal') navigate('/flight')
}

export {routeHandler}
import { Logo } from '../../../entities/Logo';
import { MenuToggler } from '../../../features/MenuToggler';
import { themeSetter } from '../../../shared/config/theme/themeSetter';
import style from './Header.module.scss';
import BatteryGauge from 'react-battery-gauge';

const localStyles: React.CSSProperties = {
    ...themeSetter('dark'),
    borderTop: 'unset',
    borderRight: 'unset',
    borderLeft: 'unset',
}

const Header = ():JSX.Element => {
    return(
        <div style={localStyles} className={style.Header}>
            <MenuToggler/>
            <Logo size={2} title='Orion'/>
            <BatteryGauge size={80} value={30}/>
        </div>
    )
}

export {Header}
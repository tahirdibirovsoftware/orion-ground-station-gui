import { DataController } from '@renderer/widgets/DataController';
import { Logo } from '../../../entities/Logo';
import { MenuToggler } from '../../../features/MenuToggler';
import { themeSetter } from '../../../shared/config/theme/themeSetter';
import style from './Header.module.scss';

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
            <DataController/>
        </div>
    )
}

export {Header}
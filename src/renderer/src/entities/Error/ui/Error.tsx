import { FC } from 'react';
import style from './Error.module.scss';
import { IError } from '../model/types';
import { WarningOutlined } from '@ant-design/icons';


const Error:FC<IError> = ({content}):JSX.Element => {
    return(
        <div className={style.Error}>
            <WarningOutlined />
            <span>{content}</span>
        </div>
    )
}

export {Error}
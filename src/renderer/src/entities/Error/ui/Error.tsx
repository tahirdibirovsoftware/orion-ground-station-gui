import { FC } from 'react';
import style from './Error.module.scss';
import { IError } from '../model/types';
import { WarningOutlined } from '@ant-design/icons';
import { Trans, useTranslation } from 'react-i18next';


const Error:FC<IError> = ({content}):JSX.Element => {
    useTranslation()
    return(
        <div className={style.Error}>
            <WarningOutlined />
            <span><Trans>{content}</Trans></span>
        </div>
    )
}

export {Error}
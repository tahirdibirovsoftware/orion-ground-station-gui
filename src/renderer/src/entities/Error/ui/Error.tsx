import React from 'react';
import style from './Error.module.scss';
import { IError } from '../model/types';
import { WarningOutlined } from '@ant-design/icons';
import { Trans, useTranslation } from 'react-i18next';

export const Error: React.FC<IError> = ({ content }) => {
  const { t } = useTranslation();

  // Ensure content is a string to avoid potential crashes
  const safeContent = typeof content === 'string' ? content : '';

  return (
    <div className={style.Error}>
      <WarningOutlined />
      <span>
        <Trans>{t(safeContent)}</Trans>
      </span>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const MemoizedError = React.memo(Error);
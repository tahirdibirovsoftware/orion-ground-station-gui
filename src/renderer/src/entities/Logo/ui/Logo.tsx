import { FC } from 'react'
import style from './Logo.module.scss'

interface ILogo {
    size: number,
    color: string
}

const Logo:FC<ILogo> = ({size, color}):JSX.Element => {
    return(
            <span style={{fontSize: size+'rem', color}} className={style.text}>ORION<span>&#8482;</span></span>
    )
}

export {Logo}
import style from './Terminal.module.scss'


const Terminal  = ():JSX.Element => {
    return(
        <div className={style.Terminal}>
            <h1>Terminal Mode</h1>
        </div>
    )
}


export {Terminal}
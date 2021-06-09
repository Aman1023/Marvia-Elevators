import './ElevatorButton.scss'

interface IElevatorButton {
    direction?: number,     //0 = down, 1 = up, 2 = undefined/stationery
    disabled?: boolean,
    callBack?: CallableFunction
}

const ElevatorButton = ({direction, callBack, disabled = false}: IElevatorButton) => {
    return <button 
        onClick={e => {
            e.preventDefault()
            !disabled && callBack && callBack(direction)
        }}
        className={`
            elevator-button__container 
            elevator-button__button-${direction ? 'up' : 'down'}
            elevator-button__container--${disabled ? 'disabled' : 'enabled'}
        `}
    />
}

export default ElevatorButton
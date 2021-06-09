import ElevatorButton from '../ElevatorButton/ElevatorButton'
import './ElevatorRoom.scss'

interface IElevatorProps {
    isActive?: boolean
    isUpDisabled?: boolean
    isDownDisabled?: boolean
    callBack: CallableFunction
}

const ElevatorRoom = ({isActive, isUpDisabled, isDownDisabled, callBack}: IElevatorProps) => {
    return <div className="elevator-room__container">
        <div className="elevator-room__doors" style={{gridGap: isActive ? '90%' : '2%'}}>
            <div className="elevator-room__door" />
            <div className="elevator-room__door" />
        </div>
        <div className="elevator-room__buttons">
            <ElevatorButton direction={1} disabled={isUpDisabled} callBack={callBack}/>
            <ElevatorButton direction={0} disabled={isDownDisabled} callBack={callBack}/>
        </div>
    </div>
}

export default ElevatorRoom
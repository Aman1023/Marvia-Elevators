import { useEffect, useState } from "react"
import ElevatorControls from "../ElevatorControls/ElevatorControls"
import ElevatorShaft from "../ElevatorShaft/ElevatorShaft"

import './Elevator.scss'

const Elevator = () => {
    const [elevatorState, setElevatorState] = useState({
        floors: 6,
        activeFloor: 0,
        direction: 2,
    })

    const [elevatorOrder, setElevatorOrder] = useState<number[]>([])

    useEffect(() => {

        let timeout = setTimeout(() => {
            let elevatorDelay

            if(elevatorOrder.length){
                elevatorDelay = setTimeout(() => {
                    setElevatorState({...elevatorState, activeFloor: elevatorOrder[0]})
                    setElevatorOrder([...elevatorOrder.slice(1)])
                }, (elevatorState.activeFloor - (elevatorOrder[0] ?? 1)) * 1000)

                setElevatorState({...elevatorState})
            } else {
                setElevatorState({...elevatorState, direction: 2})
                clearTimeout(elevatorDelay)
            }
            
        }, 1000)

        return () =>clearTimeout(timeout)
    }, [elevatorOrder])

    const ElevatorPosition = (index: number) => {
        FloorSelector(elevatorState.direction, index)
    }

const FloorSelector = (direction: number, index: number) => {
    //Set direction
    setElevatorState({...elevatorState, direction: direction})

    //Create variable of elevatorOrder
    let newElevatorOrder = [...elevatorOrder, index]

    //Map the elevatorOrder and use the correct calculation to sort dependent on the value of direction
    let orderArray = newElevatorOrder.map(order => {
        return {floor: order, order: direction === 0 ? elevatorState.activeFloor - order : order - elevatorState.activeFloor}
    })

    //Sort array by closest number to active floor
    orderArray.sort((a, b) => a.order - b.order)
    console.log(orderArray)

    // Create final array
    let sortedOrder = orderArray.map(order => order.floor)

    setElevatorOrder(sortedOrder)
}

    return <div className="elevator__container">
        <ElevatorShaft 
            callBack={FloorSelector} 
            activeFloor={elevatorState.activeFloor}
            floors={elevatorState.floors} 
        />
        <ElevatorControls 
            activeFloor={elevatorState.activeFloor}
            floors={elevatorState.floors} 
            direction={elevatorState.direction}
            sequence={elevatorOrder.toString().replaceAll(",", " - ")}
            callBack={ElevatorPosition}
        />
    </div>
}

export default Elevator
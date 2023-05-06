import { useEffect, useState, useRef } from 'react'
import '../style/form.css'
import Label from './ui/Label'
import { useAppDispatch, useAppSelector } from '../hooks/customHookQuery'
import { defaultText, titleEnd, titleFloor, titleMeeting, titleStart, titleTower } from '../const/const'
import { sliceValidationReset } from '../store/sliceValidationReset'
import Calendar from './calendar/Calendar'

export default function Form() {
    const { validation, validationFloor, validationMeeting, validationStart, validationDate } = useAppSelector(state => state.sliceValidationReset)
    const [resetBtn, setResetBtn] = useState(false)
    const resRef = useRef<HTMLTextAreaElement>(null)
    const dispatch = useAppDispatch()

    const [activeCalendar, setActiveCalendar] = useState(false)
    const [getDate, setGetDate] = useState('')

    const [tower, setTower] = useState(defaultText)
    const [towerFlag, setTowerFlag] = useState(false)
    const [towerActive, setTowerActive] = useState(true)
    const towerOptions = ['Башня А', 'Башня Б']

    const [floor, setFloor] = useState(defaultText)
    const [floorActive, setFloorActive] = useState(true)
    const [floorFlag, setFloorFlag] = useState(false)
    const floorOptions = ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27']

    const [meetingRoom, setMeetingRoom] = useState(defaultText)
    const [meetingRoomActive, setMeetingRoomActive] = useState(true)
    const [meetingRoomFlag, setMeetingRoomFlag] = useState(false)
    const meetingOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

    const [timeStart, setTimeStart] = useState(defaultText)
    const [timeStartActive, setTimeStartActive] = useState(true)
    const [timeStartFlag, setTimeStartFlag] = useState(false)
    const timeStartOptions = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30']

    const [timeEnd, setTimeEnd] = useState(defaultText)
    const [timeEndActive, setTimeEndActive] = useState(true)
    const [timeEndFlag, setTimeEndFlag] = useState(false)
    const timeEndOptions = ['8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00']

    const [message, setMessage] = useState('')

    function handleMessage(e: any) {
        setMessage(e.target.value)
    }

    function handleReset(e: any) {
        e.preventDefault()
        setResetBtn(!resetBtn)
        if (resRef.current) {
            resRef.current.value = ''
        }
    }

    function submit(e: any) {
        e.preventDefault()
        if (tower !== defaultText && floor !== defaultText && meetingRoom !== defaultText && timeStart !== defaultText && timeEnd !== defaultText) {
            const data = {
                getDate: new Date(getDate),
                tower,
                floor,
                meetingRoom,
                timeStart,
                timeEnd,
                message
            }
            console.log(JSON.stringify(data))
        } else {
            console.log('Ошибка!')
            if (tower === defaultText) {
                setTowerFlag(true)
            } else if (floor === defaultText) {
                setFloorFlag(true)
            } else if (meetingRoom === defaultText) {
                setMeetingRoomFlag(true)
            } else if (timeStart === defaultText) {
                setTimeStartFlag(true)
            } else if (timeEnd === defaultText) {
                setTimeEndFlag(true)
            }
        }
    }

    function handleDate(e: any) {
        e.preventDefault()
        setActiveCalendar(!activeCalendar)
    }

    useEffect(() => {
        setTowerActive(true)
        setFloorActive(true)
        setMeetingRoomActive(true)
        setTimeStartActive(true)
        setTimeEndActive(true)
        setGetDate('')
        setTower(defaultText)
        setFloor(defaultText)
        setMeetingRoom(defaultText)
        setTimeStart(defaultText)
        setTimeEnd(defaultText)
        setMessage('')
        // Сбрасываем массив
        dispatch(sliceValidationReset.actions.resetDate())
        dispatch(sliceValidationReset.actions.resetTower())
        dispatch(sliceValidationReset.actions.resetFloor())
        dispatch(sliceValidationReset.actions.resetMeeting())
        dispatch(sliceValidationReset.actions.resetStart())
        dispatch(sliceValidationReset.actions.resetEnd())
    }, [resetBtn])

    useEffect(() => {
        if (getDate) {
            setTowerActive(false)
            if (validationDate[validationDate.length - 1] !== validationDate[validationDate.length - 2]) {
                setFloorActive(true)
                setMeetingRoomActive(true)
                setTimeStartActive(true)
                setTimeEndActive(true)
                setTower(defaultText)
                setFloor(defaultText)
                setMeetingRoom(defaultText)
                setTimeStart(defaultText)
                setTimeEnd(defaultText)
            }
        } else {
            setFloorActive(true)
            setMeetingRoomActive(true)
            setTimeStartActive(true)
            setTimeEndActive(true)
            setTower(defaultText)
            setFloor(defaultText)
            setMeetingRoom(defaultText)
            setTimeStart(defaultText)
            setTimeEnd(defaultText)
        }
    }, [getDate, validationDate])

    useEffect(() => {
        if (tower !== defaultText) {
            setFloorActive(false)
            if (validation[validation.length - 1] !== validation[validation.length - 2]) {
                setMeetingRoomActive(true)
                setTimeStartActive(true)
                setTimeEndActive(true)
                setFloor(defaultText)
                setMeetingRoom(defaultText)
                setTimeStart(defaultText)
                setTimeEnd(defaultText)
            }
        } else {
            setMeetingRoomActive(true)
            setTimeStartActive(true)
            setTimeEndActive(true)
            setFloor(defaultText)
            setMeetingRoom(defaultText)
            setTimeStart(defaultText)
            setTimeEnd(defaultText)
        }
    }, [tower, validation])

    useEffect(() => {
        if (floor !== defaultText) {
            setMeetingRoomActive(false)
            if (validationFloor[validationFloor.length - 1] !== validationFloor[validationFloor.length - 2]) {
                setTimeStartActive(true)
                setTimeEndActive(true)
                setMeetingRoom(defaultText)
                setTimeStart(defaultText)
                setTimeEnd(defaultText)
            }
        } else {
            setTimeStartActive(true)
            setTimeEndActive(true)
            setMeetingRoom(defaultText)
            setTimeStart(defaultText)
            setTimeEnd(defaultText)
        }
    }, [floor, validationFloor])

    useEffect(() => {
        if (meetingRoom !== defaultText) {
            setTimeStartActive(false)
            if (validationMeeting[validationMeeting.length - 1] !== validationMeeting[validationMeeting.length - 2]) {
                setTimeEndActive(true)
                setTimeStart(defaultText)
                setTimeEnd(defaultText)
            }
        } else {
            setTimeEndActive(true)
            setTimeStart(defaultText)
            setTimeEnd(defaultText)
        }
    }, [meetingRoom, validationMeeting])

    useEffect(() => {
        if (timeStart !== defaultText) {
            setTimeEndActive(false)
            if (validationStart[validationStart.length - 1] !== validationStart[validationStart.length - 2]) {
                setTimeEnd(defaultText)
            }
        } else {
            setTimeEnd(defaultText)
        }
    }, [timeStart, validationStart])

    const day = new Date(getDate).getDate()
    const month = new Date(getDate).getMonth()
    const year = new Date(getDate).getFullYear()

    return (
        <form className='form'>
            <div className='form__block'>
                <div className='form__date'>
                    <p className='form__date-title'>Выбрать дату</p>
                    <div className={getDate ? 'form__date-window-visible' : 'form__date-window-unvisible'}>{day.toString()} - {month.toString()} - {year.toString()}</div>
                    <button className='form__date-btn' onClick={(e) => handleDate(e)}>Выбрать дату</button>
                    {activeCalendar && <Calendar activeCalendar={activeCalendar} setActiveCalendar={setActiveCalendar} setGetDate={setGetDate} />}
                </div>
                <Label title={titleTower} error={towerFlag} selected={tower} setSelected={setTower} options={towerOptions} setFlag={setTowerFlag} >
                    <div className={towerActive ? 'noActiveSelect' : ''}></div>
                </Label>
                <Label title={titleFloor} error={floorFlag} selected={floor} setSelected={setFloor} options={floorOptions} setFlag={setFloorFlag} >
                    <div className={floorActive ? 'noActiveSelect' : ''}></div>
                </Label>
                <Label title={titleMeeting} error={meetingRoomFlag} selected={meetingRoom} setSelected={setMeetingRoom} options={meetingOptions} setFlag={setMeetingRoomFlag} >
                    <div className={meetingRoomActive ? 'noActiveSelect' : ''}></div>
                </Label>
                <Label title={titleStart} error={timeStartFlag} selected={timeStart} setSelected={setTimeStart} options={timeStartOptions} setFlag={setTimeStartFlag} >
                    <div className={timeStartActive ? 'noActiveSelect' : ''}></div>
                </Label>
                <Label title={titleEnd} error={timeEndFlag} selected={timeEnd} setSelected={setTimeEnd} options={timeEndOptions} setFlag={setTimeEndFlag} >
                    <div className={timeEndActive ? 'noActiveSelect' : ''}></div>
                </Label>
            </div>
            <textarea ref={resRef} onChange={(e) => handleMessage(e)} name="message" id="message" className='form__message' placeholder='Оставьте комментарий'></textarea>
            <input type="submit" value='Отправить' className='form__submit' onClick={(e) => submit(e)} />
            <button className='form__reset' onClick={(e) => handleReset(e)}>Сбросить</button>
        </form>
    )
}

import { useEffect, useState, useRef, useMemo } from 'react'
import '../style/form.css'
import Label from './ui/Label'
import { useAppDispatch, useAppSelector } from '../hooks/customHookQuery'
import { defaultText, titleDate, titleEnd, titleFloor, titleMeeting, titleStart, titleTower } from '../const/const'
import { sliceValidationReset } from '../store/sliceValidationReset'
import LabelCalendar from './ui/LabelCalendar'

export default function Form() {
    const { validation, validationFloor, validationMeeting, validationStart, validationDate } = useAppSelector(state => state.sliceValidationReset)
    const [resetBtn, setResetBtn] = useState<boolean>(false)
    const resRef = useRef<HTMLTextAreaElement>(null)
    const dispatch = useAppDispatch()
    const defaultArrayTime: Array<string> = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00']

    const [activeCalendar, setActiveCalendar] = useState(false)
    const [getDate, setGetDate] = useState<string>('')
    const [dateFlag, setDateFlag] = useState<boolean>(false)

    const [tower, setTower] = useState<string>(defaultText)
    const [towerFlag, setTowerFlag] = useState<boolean>(false)
    const [towerActive, setTowerActive] = useState<boolean>(true)
    const towerOptions: Array<string> = ['Башня А', 'Башня Б']

    const [floor, setFloor] = useState<string>(defaultText)
    const [floorActive, setFloorActive] = useState<boolean>(true)
    const [floorFlag, setFloorFlag] = useState<boolean>(false)
    const floorOptions: Array<string> = ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27']

    const [meetingRoom, setMeetingRoom] = useState<string>(defaultText)
    const [meetingRoomActive, setMeetingRoomActive] = useState<boolean>(true)
    const [meetingRoomFlag, setMeetingRoomFlag] = useState<boolean>(false)
    const meetingOptions: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

    const [timeStart, setTimeStart] = useState<string>(defaultText)
    const [timeStartActive, setTimeStartActive] = useState<boolean>(true)
    const [timeStartFlag, setTimeStartFlag] = useState<boolean>(false)
    const timeStartOptions: Array<string> = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30']

    const [timeEnd, setTimeEnd] = useState<string>(defaultText)
    const [timeEndActive, setTimeEndActive] = useState<boolean>(true)
    const [timeEndFlag, setTimeEndFlag] = useState<boolean>(false)
    const [timeEndOptions, setTimeEndOptions] = useState<Array<string>>(defaultArrayTime)

    const [message, setMessage] = useState<string>('')

    function handleMessage(e: React.ChangeEvent<HTMLTextAreaElement>): void {
        setMessage(e.target.value)
    }

    // меняем flag отправки, по нему будет отрабатывтаь useEffect
    function handleReset(e: React.MouseEvent): void {
        e.preventDefault()
        setResetBtn(!resetBtn)
        if (resRef.current) {
            resRef.current.value = ''
        }
    }

    // при отправке формф
    function submit(e: React.MouseEvent): void | boolean {
        e.preventDefault()
        // если обязательные поля все заполнены(все, кроме textarea)
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
            // если нашел незаполненное поле
            console.log('Ошибка!')
            if (!getDate) {
                return setDateFlag(true)
            } else if (tower === defaultText) {
                return setTowerFlag(true)
            } else if (floor === defaultText) {
                return setFloorFlag(true)
            } else if (meetingRoom === defaultText) {
                return setMeetingRoomFlag(true)
            } else if (timeStart === defaultText) {
                return setTimeStartFlag(true)
            } else if (timeEnd === defaultText) {
                return setTimeEndFlag(true)
            }
        }
    }

    // при клике на 'Сбросить' обнуляем форму(приводим значения к дефолтным + блокируем поля)
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
        setTimeEndFlag(false)
        setMessage('')
        // Сбрасываем массив
        dispatch(sliceValidationReset.actions.resetDate())
        dispatch(sliceValidationReset.actions.resetTower())
        dispatch(sliceValidationReset.actions.resetFloor())
        dispatch(sliceValidationReset.actions.resetMeeting())
        dispatch(sliceValidationReset.actions.resetStart())
        dispatch(sliceValidationReset.actions.resetEnd())
        // Сбрасываем ошибки
        setDateFlag(false)
        setTowerFlag(false)
        setFloorFlag(false)
        setMeetingRoomFlag(false)
        setTimeStartFlag(false)
        setTimeEndFlag(false)
    }, [resetBtn])

    // следующие useEffcet'ы отрабатывают при изменении состояния, каждый useEffect смотрит за своим единственным полем, к которому они привязаны, если поле изменило состояние из дефолтного
    // в пользовательское, то открывается следующие поле для заполнения, если меняется поле при условии непоследнего действующего значения по списку, то все последюущие поля(кроме следующего)
    // сбросятся к дефолтным и заблокируются
    // такое решение можно обяъснить, при выборе комнаты изменение в данных не последовательно, может привести к ошибке
    // за полем Date
    useEffect(() => {
        if (getDate) {
            setTowerActive(false)
            // если не кликнули на то же значение, что было и до него
            if (validationDate[validationDate.length - 1] !== validationDate[validationDate.length - 2]) {
                // блокируем поля
                setFloorActive(true)
                setMeetingRoomActive(true)
                setTimeStartActive(true)
                setTimeEndActive(true)
                // приводим к дефолтному тексту
                setTower(defaultText)
                setFloor(defaultText)
                setMeetingRoom(defaultText)
                setTimeStart(defaultText)
                setTimeEnd(defaultText)
                // сбрасываем ошибки
                setTowerFlag(false)
                setFloorFlag(false)
                setMeetingRoomFlag(false)
                setTimeStartFlag(false)
                setTimeEndFlag(false)
            }
        } else {
            // если кликнули на то же значение, что было и до него
            // блокируем поля
            setFloorActive(true)
            setMeetingRoomActive(true)
            setTimeStartActive(true)
            setTimeEndActive(true)
            // приводим к дефолтному тексту
            setTower(defaultText)
            setFloor(defaultText)
            setMeetingRoom(defaultText)
            setTimeStart(defaultText)
            setTimeEnd(defaultText)
        }
    }, [getDate, validationDate])

    // за полем Выбора Башни
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
                setFloorFlag(false)
                setMeetingRoomFlag(false)
                setTimeStartFlag(false)
                setTimeEndFlag(false)
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

    // за полем Выбора Этажа
    useEffect(() => {
        if (floor !== defaultText) {
            setMeetingRoomActive(false)
            if (validationFloor[validationFloor.length - 1] !== validationFloor[validationFloor.length - 2]) {
                setTimeStartActive(true)
                setTimeEndActive(true)
                setMeetingRoom(defaultText)
                setTimeStart(defaultText)
                setTimeEnd(defaultText)
                setMeetingRoomFlag(false)
                setTimeStartFlag(false)
                setTimeEndFlag(false)
            }
        } else {
            setTimeStartActive(true)
            setTimeEndActive(true)
            setMeetingRoom(defaultText)
            setTimeStart(defaultText)
            setTimeEnd(defaultText)
        }
    }, [floor, validationFloor])

    // за полем Выбора Переговорной комнаты
    useEffect(() => {
        if (meetingRoom !== defaultText) {
            setTimeStartActive(false)
            if (validationMeeting[validationMeeting.length - 1] !== validationMeeting[validationMeeting.length - 2]) {
                setTimeEndActive(true)
                setTimeStart(defaultText)
                setTimeEnd(defaultText)
                setTimeStartFlag(false)
                setTimeEndFlag(false)
            }
        } else {
            setTimeEndActive(true)
            setTimeStart(defaultText)
            setTimeEnd(defaultText)
        }
    }, [meetingRoom, validationMeeting])

    // Приводим массив Окончания Времени к дефолтному при изменении настройки Начала Времени
    useMemo(() => {
        setTimeEndOptions(defaultArrayTime)
    }, [timeStart])

    // за полем Выбора начала врмени
    useEffect(() => {
        if (timeStart !== defaultText) {
            // валидируем поле Выбора Конца Времени(массив будет обрезаться в зависимости от выбранного зхзанчения в поле Выбора Начала Времени)
            const index = timeStartOptions.indexOf(timeStart)
            const validationTimeEndOptions = timeEndOptions.slice(index + 1)

            setTimeEndActive(false)
            if (validationStart[validationStart.length - 1] !== validationStart[validationStart.length - 2]) {
                setTimeEnd(defaultText)
                setTimeEndOptions(validationTimeEndOptions)
            }
        } else {
            setTimeEnd(defaultText)
        }
    }, [timeStart, validationStart])

    return (
        <form className='form'>
            <div className='form__block'>
                <LabelCalendar titleDate={titleDate} dateFlag={dateFlag} activeCalendar={activeCalendar} setActiveCalendar={setActiveCalendar} setGetDate={setGetDate} getDate={getDate} setDateFlag={setDateFlag} />
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

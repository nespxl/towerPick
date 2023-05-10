import { ILabelCalendar } from "../../interface/app.interface";
import Calendar from "../calendar/Calendar";

export default function LabelCalendar({titleDate, dateFlag, activeCalendar, setActiveCalendar, setGetDate, getDate, setDateFlag}: ILabelCalendar) {
    const day = new Date(getDate).getDate()
    const month = Number(new Date(getDate).getMonth()) + 1
    const year = new Date(getDate).getFullYear()

    const fullDateClick = `${day.toString()} - ${month.toString()} - ${year.toString()}`

    // открываем по клику кнопки календарь
    function handleDate(e: React.MouseEvent): void {
        e.preventDefault()
        setActiveCalendar(!activeCalendar)
    }

    return (
        <div className='form__date'>
            <p className='form__date-title'>{titleDate}</p>
            {dateFlag &&
                <div className='form__error'>
                    Поле не может быть пустым
                </div>
            }
            <div className={getDate ? 'form__date-window-visible' : 'form__date-window-unvisible'}>{fullDateClick}</div>
            <button className='form__date-btn' onClick={(e) => handleDate(e)}>{titleDate}</button>
            {activeCalendar && <Calendar activeCalendar={activeCalendar} setActiveCalendar={setActiveCalendar} setGetDate={setGetDate} getDate={getDate} setDateFlag={setDateFlag} />}
        </div>
    )
}

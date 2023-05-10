import { useEffect, useRef, useState } from 'react';
import '../../style/ui/select.css'
import { ISelect } from '../../interface/app.interface';
import { useAppDispatch } from '../../hooks/customHookQuery';
import { sliceValidationReset } from '../../store/sliceValidationReset';
import { defaultText, titleEnd, titleFloor, titleMeeting, titleStart, titleTower } from '../../const/const';

export default function Select({ title, selected, options, setSelected, setFlag }: ISelect) {
    const [isActiveSelect, setIsActiveSelect] = useState<boolean>(false)
    const list = useRef(null)
    const dispatch = useAppDispatch()

    // отслеживаем клики пользователя по документу и в зависимости от клика производим действие(закрыть - выбрать дату)
    function handleClick(e: any): void {
        const withinBoundaries = e.composedPath().includes(list.current);

        if (!withinBoundaries) {
            setIsActiveSelect(false)
        } else {
            if(selected === defaultText) {
                setFlag(true)
            } else {
                setFlag(false)
            }
        }
    }

    function handleClickMainField(): void {
        setIsActiveSelect(!isActiveSelect)
        if(selected === defaultText) {
            setFlag(true)
        } else {
            setFlag(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [isActiveSelect])

    return (
        <div className='dropdown' ref={list}>
            <div className={isActiveSelect ? "dropdown-btn dropdown-btn-active" : "dropdown-btn"} onClick={() => handleClickMainField()}>
                <div className={isActiveSelect ? 'dropdown-content-arrow-bottom' : 'dropdown-content-arrow-top'}></div>
                <div>{selected}</div>
                <div className={isActiveSelect ? 'dropdown-content-arrow-bottom' : 'dropdown-content-arrow-top'}></div>
            </div>
            {isActiveSelect && (
                <div className="dropdown-content">
                    {options.map((option, i) => (
                        <div
                            key={i}
                            className="dropdown-item"
                            onClick={() => {
                                setIsActiveSelect(false)
                                setSelected(option)
                                if(title === titleTower) {
                                    dispatch(sliceValidationReset.actions.validationReset(option))
                                } else if(title === titleFloor) {
                                    dispatch(sliceValidationReset.actions.validationResetFloor(option))
                                } else if(title === titleMeeting) {
                                    dispatch(sliceValidationReset.actions.validationResetMeeting(option))
                                } else if(title === titleStart) {
                                    dispatch(sliceValidationReset.actions.validationResetStart(option))
                                } else if(title === titleEnd) {
                                    dispatch(sliceValidationReset.actions.validationResetEnd(option))
                                }
                            }}>
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

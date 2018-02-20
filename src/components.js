import React from 'react';

//           props здесь содержат onClick, glyph и id
const IconButton = (props) => (
    <span id={props.id}
        className={`oi ${props.id} sortbutton`}
        data-glyph={props.glyph}
        title={props.glyph}
        aria-hidden="true"
        onClick={props.onClick}
    />
)
// ==================ИЛИ========================
// const IconButton = ({ onClick, glyph, id}) => (
//     <span id={id}
//         className={`oi ${id} sortbutton`}
//         data-glyph={glyph}
//         title={glyph}
//         aria-hidden="true"
//         onClick={handleSort}
//     />
// )

//        const { handleSort } = props; <-- деструктуризация
export const Header = ({ handleSort }) => (
    <div className='header'>
        <IconButton id="ur" glyph="clock" onClick={handleSort} />
        <IconButton id="im" glyph="star" onClick={handleSort} />

        {/* <span id='ur'
            className="oi ur sortbutton"
            data-glyph="clock"
            title="clock"
            aria-hidden="true"
            onClick={handleSort}
        />

        <span id='im'
            className="oi im sortbutton"
            data-glyph="star"
            title="star"
            aria-hidden="true"
            onClick={handleSort}
        /> */}
    </div>
)


export const Checkbox = ({ value, name, status, handleCheck }) => (
    <section title={value === 'ur' ? 'urgent' : 'important'}>
        <div className="squaredThree">
            <input type='checkbox'
                defaultChecked={status}
                id={name.toString() + value}
                value={value} name={name.toString() + value}
                onChange={handleCheck}
            />
            {/* <label htmlFor={name.toString() + value}></label> */}
        </div>
    </section>
)

export const Buttons = ({ task, handleCheck, handleDelete }) => (
    <div className="buttons">
        <Checkbox value="ur" name={task.text} status={task.ur} handleCheck={handleCheck} />
        <Checkbox value="im" name={task.text} status={task.im} handleCheck={handleCheck} />
        {/* 
            {this.makeCheck('ur', task.text, task.ur)}
            {this.makeCheck('im', task.text, task.im)} 
        */}
        <button className='delete'
            name={task.text.toString()}
            onClick={handleDelete}
            // type='button' <-- необязательно
            children="×" //<-- подобные мелкие элементы лучше указывать как-то так или вообще в стилях 
                        // через псевдоэлемент :before
        />
    </div>
)

export const Status = ({ task }) => (
    <div className="status">
        <section title="done">
            <div className="squaredThree">
                <input type="checkbox" value="None" id={task.text + 'done'} name={task.text + 'done'} />
                <label htmlFor={task.text + 'done'}></label>
            </div>
        </section>
    </div>
)
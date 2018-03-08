import React from 'react';

const IconButton = (props) => (
    <span id={props.id}
        className={`oi ${props.id} sortbutton`}
        data-glyph={props.glyph}
        title={props.title}
        aria-hidden="true"
        onClick={props.onClick}
    />
)


export const Header = ({ handleSort }) => (
    <div className='header'>
        <IconButton id="ur" glyph="clock" title = "sort by urgency" onClick={handleSort} />
        <IconButton id="im" glyph="star" title = "sort by importance" onClick={handleSort} />
    </div>
)


const Checkbox = ({ title, value, name, status, handleCheck }) => (
    <section title = {title}>
        <div className="squaredThree">
            <input type='checkbox'
                defaultChecked={status}
                id={name.toString() + value}
                value={value} name={name.toString() + value}
                onChange={handleCheck}
            />
            <label htmlFor={name.toString() + value} />
        </div>
    </section>
)

export const Buttons = ({ task, handleCheck, handleDelete }) => (
    <div className="buttons">
        <Checkbox title = "urgent" value="ur" name={task.text} status={task.ur} handleCheck={handleCheck} />
        <Checkbox title = "important" value="im" name={task.text} status={task.im} handleCheck={handleCheck} />

        {/* <button className='delete'
            name={task.text.toString()}
            onClick={handleDelete}
            children="×" 
        /> */}
        <Del name={task.text.toString()} onClick={handleDelete} />
    </div>
)

export const DateButtons = ({ date, handleDelete, handleReload }) => (
    <div className = 'date'>
        {date.substring(0, 20)}
        <Del name={date} onClick={handleDelete} />
        {/* <span className="oi " data-glyph="reload" aria-hidden="true"></span> */}
        <span id={date}
        className={`oi reload`}
        data-glyph='reload'
        title='reload'
        aria-hidden="true"
        onClick={handleReload}
    />
    </div>
)

const Del = ({ name, onClick }) => (
    <button className='delete'
            name={name}
            onClick={onClick}
            children="×" 
        />
)

export const Status = ({ task, handleDone }) => (
    <div className="status">
        <Checkbox title = "done" value = "done" name = {task.text}  status = {false} handleCheck = {handleDone} />
    </div>
)

export const Tabs = ({ handleTab }) => (
    <div className = 'tabs'>
		<input id="todo" type="radio" name="tabs" onClick = {handleTab} defaultChecked = 'true' />
		<label htmlFor="tab1">ToDo</label>
		<input id="history" type="radio" name="tabs" onClick = {handleTab} />
  		<label htmlFor="tab2">History</label>
	</div>
)
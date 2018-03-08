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

export const Buttons = ({ task, handleCheck, handleDelete, showHistory }) => (
    <div className="buttons">
    {showHistory
    ?   <div class = 'date'>{task.date}</div>
    :   <div>
            <Checkbox title = "urgent" value="ur" name={task.text} status={task.ur} handleCheck={handleCheck} />
            <Checkbox title = "important" value="im" name={task.text} status={task.im} handleCheck={handleCheck} />
        </div>
    }

        <button className='delete'
            name={task.text.toString()}
            onClick={handleDelete}
            children="×" 
        />
    </div>
)

export const Status = ({ task, handleDone }) => (
    <div className="status">
        <Checkbox title = "done" value = "done" name = {task.text + 'done'}  status = {false} handleCheck = {handleDone} />
    </div>
)

export const Tabs = ({ handleTab }) => (
    <div className = 'tabs'>
		<input id="tab1" type="radio" name="tabs" onClick = {handleTab} defaultChecked = 'true' />
		<label htmlFor="tab1">ToDo</label>
		<input id="tab2" type="radio" name="tabs" onClick = {handleTab} />
  		<label htmlFor="tab2">History</label>
	</div>
)
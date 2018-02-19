import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './App.css';

class ToDoList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: '', tasks: props.tasks}; 

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.delTask = this.delTask.bind(this);
		this.handleCheckbox = this.handleCheckbox.bind(this)
		this.handleSort = this.handleSort.bind(this)
	}
	
	viewList() {
		return this.state.tasks.map(
		  (tasks) => 
		  <div className = 'row' 
			 key = {tasks.text.toString()} id = {tasks.text.toString()}>
			<div className = 'status'>
			  <section title="done">
				<div className="squaredThree">
				<input type="checkbox" value="None" id={tasks.text + 'done'} name={tasks.text + 'done'} />
				 <label htmlFor={tasks.text + 'done'}></label>
				</div>
			   </section>
			  
			</div>
			<div className = {'task' + (tasks.ur == true ? ' ur' : '') + (tasks.im == true ? ' im' : '')}>
			  {tasks.ur == tasks.im && tasks.ur == false ? <div className = 'o1 o2'><s>{tasks.text}</s>
            <div><i>{tasks.o1}</i></div></div> : <div className = 'o1'>{tasks.text}</div> }
			</div>
			<div className = 'buttons'>
			  {this.makeCheck('ur', tasks.text, tasks.ur)}
			  {this.makeCheck('im', tasks.text, tasks.im)}
			  <button name = {tasks.text.toString()} onClick = {this.delTask} type = 'button' className = 'delete'>
			   ×
			  </button>
			</div>
		  </div>
		);
	};
  
	makeCheck(value, name, status) {
		var title = value == 'ur' ? 'urgent' : 'important'
		return <section title={title}>
             <div className="squaredThree">
              <input type = 'checkbox' 
                defaultChecked = {status} 
                id={name.toString()+value}
            value = {value} name = {name.toString()+value}
            onChange = {this.handleCheckbox}/>
               <label htmlFor={name.toString()+value}></label>
             </div>
            </section>
    }
      
	handleCheckbox(event) {
		var t = this.state.tasks.slice();
		var name = event.target.name.substring(0, event.target.name.length - 2);
		var i = t.indexOf(t.filter((task) => task.text == name)[0]);
		t[i][event.target.value] = t[i][event.target.value] ? false : true;
		if (t[i]['im'] == t[i]['ur'] && t[i]['ur'] == false) {
			
			this.autodel(i)
       
		this.setState({tasks: [{'text': 'task4', 'im': false, 'ur': true}]})
		console.log(this.state.tasks)
		}
		this.setState({tasks: t});
    }
	
	autodel(i) {
		var t = this.state.tasks.slice();
		t[i]['o1'] = reasonList[Math.floor(Math.random()*8)];
		setTimeout(function() {
			if (t[i]['im'] == t[i]['ur'] && t[i]['ur'] == false) {
				this.delByName(t[i]['text'])
				}
		}.bind(this), 8000)
	}
	
	delByName(name) {
		var t = this.state.tasks.filter((task) => task.text != name)
		this.setState({tasks: t})
	}
    
	delTask(e) {
		this.delByName(e.target.name)
    }
      
	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		if (this.state.tasks.filter((task) => task.text == this.state.value).length == 0 &&
			this.state.value.length != 0) {
			this.setState({tasks: this.state.tasks.concat({'text': this.state.value, 'im': true, 'ur': false})})
		}
		event.preventDefault();
	}
                                     
	handleSort(event) {
		var t = this.state.tasks.slice()
		t.sort((task1, task2) => 
          {if (!task1[event.target.id] && task2[event.target.id]) { return 1 }
		else if (task1[event.target.id] && !task2[event.target.id]) { return -1 }
		else { return 0 }})
		this.setState({tasks: t})
	} 
                                     
                                     
	render() {
		return (
		  <div className = 'wrapper'>
			<div className = 'taskslist'>
			  <div className = 'header'>
				<span className="oi ur sortbutton" data-glyph="clock" title="clock" aria-hidden="true" onClick = {this.handleSort} id = 'ur'></span>

				<span className="oi im sortbutton" data-glyph="star" title="star" aria-hidden="true" onClick = {this.handleSort} id = 'im'></span>
			  </div>
			  {this.viewList()}
			</div>
		  
		  <form onSubmit={this.handleSubmit}>
			<label>
			  New task:
			  <input type="text" value={this.state.value} onChange={this.handleChange} className = 'newTask' />
			</label>
			<input type="submit" value="Add" />
		  </form>
		  </div>
		  );
	}
}

// const todo = [['task1', false, true], ['task2', true, true], ['task3', false, true]]
const todo = [{'text': 'task1', 'im': false, 'ur': true}, 
              {'text': 'task2', 'im': true, 'ur': true},
              {'text': 'task3', 'im': false, 'ur': true}];
const reasonList = ['Are you sure that you have so much time?', 'Life is too short for this.', 'Do you have no other things to spend your life on them?', 'If I were you, I\'d rather play games.', 'How about watching the new sitcom instead?', 'Can it is better just to sleep?', 'This is not the best idea.', 'You\'re already pretty busy.']
ReactDOM.render(
<ToDoList tasks = {todo} />, 
document.getElementById('root')
)

export default ToDoList;

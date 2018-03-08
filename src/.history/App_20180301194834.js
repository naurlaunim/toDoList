import React, { Component } from 'react';

import { Header, Buttons, Status, Tabs } from "./components";
import { sortByPropertyName, names } from './utils';

class ToDoList extends Component {
	constructor(props) {
		super(props);

		const tasks = [
			{ 'text': 'task1', 'im': false, 'ur': true },
			{ 'text': 'task2', 'im': true, 'ur': true },
			{ 'text': 'task3', 'im': false, 'ur': true }
		];

		this.state = { 
			showHistory: false,
			value: '', 
			history: [],
			tasks 
		};
	}

	handleCheck = (event) => {
		const name = event.target.name.substring(0, event.target.name.length - 2);
		const type = event.target.value;
		const prevTask = this.state.tasks.find(t => t.text === name);
		const task = {
			...prevTask,
			[type]: !prevTask[type]
		}
		
		if (!task.im && !task.ur) {
			this.autodel(task);
		}

		const tasks = this.state.tasks.map(t => t.text === name ? task : t)

		this.setState({ tasks })
	}

	handleDone = (event) => {
		const name = event.target.name.substring(0, event.target.name.length - 4);
		const task = this.state.tasks.find(t => t.text === name);
		const date = new Date().toLocaleString()
		const { history } = this.state
		this.setState({
			history: history.concat(Object.assign({}, task, {date: date}))
		})
		this.delByName(name)
	}

	handleDelete = (e) => {
		this.delByName(e.target.name)
	}

	autodel = (task) => {
		task['o1'] = reasonList[Math.floor(Math.random() * 8)];

		setTimeout(() => {
			const newTask = this.state.tasks.find(t => t.text === task.text);
			if (newTask && !newTask.im && !newTask.ur) {
				this.delByName(task['text'])
			}
		}, 8000)
	}

	delByName = (name) => {
		const tasks = this.state.tasks.filter(task => task.text !== name);

		this.setState({ tasks })
	}

	handleChange = (event) => {
		this.setState({ value: event.target.value });
	}

	handleSubmit = (event) => {
		event.preventDefault();
		
		const { tasks } = this.state;
		const taskExists = tasks.filter(task => task.text === this.state.value).length !== 0;

		if (!taskExists && this.state.value.length !== 0) {
			this.setState({
				tasks: tasks.concat({
					'text': this.state.value,
					im: true,
					ur: false
				})
			})
		}
	}

	handleSort = (event) => {
		const tasks = this.state.tasks.sort(sortByPropertyName(event.target.id, (a, b) =>
			a === b ? 0 : b ? 1 : -1
		))

		this.setState({ tasks })
	}

	getList = () => {
		if (this.state.showHistory) return this.state.history;

		return this.state.tasks;
	}

	handleTab = (event) => {
		console.log(1)
		event.target.id == 'tab2'
		?	this.setState({showHistory: true})
		:	this.setState({showHistory: false})
	}


	render() {
		return (
			<div>
				<Tabs handleTab = {this.handleTab}/>
				<div className='wrapper'>
					<div className='taskslist'>
						<Header handleSort={this.handleSort} />
						{
							this.getList().map(task =>
								<div className='row' key={task.text.toString()} id={task.text.toString()}>
									{!this.state.showHistory
									?	<Status task={task} handleDone={this.handleDone} />
									}
									<div className={names("task", task.ur && "ur", task.im && "im")}>
										{
											!task.ur && !task.im
												? (
													<div className='o1 o2'>
														<s>{task.text} </s>
														<div> <i>{task.o1} </i></div>
													</div>
												)
												: <div className='o1'> {task.text} </div>
										}
									</div> 
									{this.state.showHistory
									?	<div className = 'buttons'>{task.date}</div>
									:	<Buttons task={task}
											handleCheck={this.handleCheck}
											handleDelete={this.handleDelete}
											showHistory = {this.state.showHistory}
										/>
									}
								</div>
							)
						}
					</div>

					<form onSubmit={this.handleSubmit}>
						<label>
							New task:
							<input type="text" value={this.state.value} onChange={this.handleChange} className='newTask' />
						</label>
						<input type="submit" value="Add" />
					</form>
				</div>
			</div>
		);
	}
}


const reasonList = ['Are you sure that you have so much time?', 'Life is too short for this.', 'Do you have no other things to spend your life on them?', 'If I were you, I\'d rather play games.', 'How about watching the new sitcom instead?', 'Can it is better just to sleep?', 'This is not the best idea.', 'You\'re already pretty busy.']


export default ToDoList;

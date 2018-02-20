import React, { Component } from 'react';

import { Header, Buttons, Status } from "./components";

import logo from './logo.svg';
import './App.css';
import { deepSort, updateArrayElement, names } from './utils';

class ToDoList extends Component {
	constructor(props) {
		super(props);

		const tasks = [
			{ 'text': 'task1', 'im': false, 'ur': true },
			{ 'text': 'task2', 'im': true, 'ur': true },
			{ 'text': 'task3', 'im': false, 'ur': true }
		];

		this.state = { value: '', tasks };

		/* 
			Вместо .bind(this) лучше юзать () => {} в декларировании методов. Это нужно делать потому, 
			что стандартные методы классов создают свою область видимости, то есть, ведут себя как function () {},
 			а метод .bind привязывает контекст (область видимости) метода к контексту класса.
			Стрелочные функции не имеют своего контекста, 
			а потому при вызове this в () => {} возвращается контекст выше по иерархии.
		*/
		// this.handleChange = this.handleChange.bind(this);
		// this.handleSubmit = this.handleSubmit.bind(this);
		// this.delTask = this.delTask.bind(this);
		// this.handleCheckbox = this.handleCheckbox.bind(this)
		// this.handleSort = this.handleSort.bind(this)
	}



	// viewList() { --> render()

	// Подобное лучше выносить в отдельные компоненты
	// makeCheck = (value, name, status) => { --> components.js/Checkbox
	// 	var title = value == 'ur' ? 'urgent' : 'important'
	// 	return <section title={title}>
	// 		<div className="squaredThree">
	// 			<input type='checkbox'
	// 				defaultChecked={status}
	// 				id={name.toString() + value}
	// 				value={value} name={name.toString() + value}
	// 				onChange={this.handleCheckbox} />
	// 			<label htmlFor={name.toString() + value}></label>
	// 		</div>
	// 	</section>
	// }

	// handleCheckbox = (event) => { <-- handleCheck, ведь это относится скорее к действию, а не элементу.
	handleCheck = (event) => {
		const name = event.target.name.substring(0, event.target.name.length - 2);
		const type = event.target.value;

		// var i = t.indexOf(t.filter((task) => task.text == name)[0]);
		const task = this.state.tasks.find(t => t.text === name);

		// const tasks = this.state.tasks.slice();

		// нет необходимости в таких конструкциях, лучше использовать оператор отрицания "!"
		// для переключения между двумя состояниями
		// task[event.target.value] = task[event.target.value] ? false : true;

		if (!task.im && !task.ur /*task['im'] === task['ur'] && task['ur'] === false */ /* можно упростить до !task.im && !task.ur */) {

			this.autodel(task);

			return this.setState({
				tasks: [{ 'text': 'task4', 'im': false, 'ur': true }]
			})
		}

		const tasks = updateArrayElement(this.state.tasks, t => t.text === name, {
			[type]: !task[type]
		})

		// const tasks = this.state.tasks.map(task =>
		// 	task.text === name ? {
		// 		...task,
		// 		[type]: !task[type],
		// 	} : task
		// )

		this.setState({ tasks })
	}

	// delTask = (e) => { <-- подобные действия лучше приводить к похожим названиям
	handleDelete = (e) => {
		this.delByName(e.target.name)
	}

	// autodel = (i) => { <-- лучше передавать таску целиком, для большей целостности
	autodel = (task) => {
		//ничего не делает?
		// task['o1'] = reasonList[Math.floor(Math.random() * 8)];

		// setTimeout(function () {
		setTimeout(() => {
			if (task['im'] === task['ur'] && task['ur'] === false /* можно упростить до !task.im && !task.ur */) { //(task.ur === false) то же, что и !task.ur
				this.delByName(task['text'])
			}
		}, 8000)
		// }.bind(this), 8000)

	}

	delByName = (name) => {
		const tasks = this.state.tasks.filter(task => task.text !== name);

		this.setState({ tasks })
	}



	handleChange = (event) => {
		this.setState({ value: event.target.value });
	}

	// можно ещё так    -->	деструктуризация <--
	// handleChange = ({ target: { value } }) => this.setState({ value });

	handleSubmit = (event) => {
		//preventDefault и другие действия с ивентами, вроде stopPropagation, 
		//принято ставить в самом начале
		event.preventDefault();
		// выводим в переменную
		// if (this.state.tasks.filter((task) => task.text == this.state.value).length == 0 
		// 		&& this.state.value.length != 0) {
		const { tasks } = this.state;
		const taskExists = tasks.filter(task => task.text === this.state.value).length !== 0;

		if (!taskExists && this.state.value.length !== 0) {
			this.setState({
				tasks: tasks.concat({
					'text': this.state.value, //кавычки в названиях свойств объектов необязательны
					im: true,
					ur: false
				})
			})
		}
	}

	handleSort = (event) => {
		// Array.sort() не мутирует массив, а возвращает отсортированный массив на месте вызова,
		// то есть this.state.tasks как объект никак не изменится и смысл копирования отпадает
		// var t = this.state.tasks.slice();
		// t.sort((task1, task2) => {

		const tasks = this.state.tasks.sort(deepSort(event.target.id, (a, b) =>
			a === b ? 0 : a ? 1 : -1
		))

		// const tasks = this.state.tasks.sort(resort((a, b) =>
		// 	a === b ? 0 : a ? 1 : -1
		// ))

		// const tasksold = this.state.tasks.sort((task1, task2) => {
		// 	// в else нет необходимости т.к. в любом случае что-то вернётся
		// 	// if (!task1[event.target.id] && task2[event.target.id]) { return 1 }
		// 	// else if (task1[event.target.id] && !task2[event.target.id]) { return -1 }
		// 	// else { return 0 } 

		// 	const status1 = task1[event.target.id];
		// 	const status2 = task2[event.target.id];

		// 	if (!status1 && status2) return 1
		// 	// s1 true 
		// 	if (status1 && !status2) return -1

		// 	return 0
		// })

		this.setState({ tasks })
	}


	render() {
		return (
			<div className='wrapper'>
				<div className='taskslist'>
					<Header handleSort={this.handleSort} />
					{/* {		this.state.tasks.map(tasks => <-- одиночные элементы массивов нужно употреблять в единственном числе */}
					{
						this.state.tasks.map(task =>
							<div className='row' key={task.text.toString()} id={task.text.toString()}>
								<Status task={task} />
								{/*
																		здесь нет необходимости в сравнении т.к. ur и im уже boolean
								<div className={'task' + (task.ur == true ? ' ur' : '') + (task.im == true ? ' im' : '')}> 
									Плюс лучше юзать шаблонные строки как внизу, в них код выполняется внутри ${} 
							*/}
								{/* <div className={`task ${task.ur ? "ur" : ""} ${task.im ? "im" : ""}`}> */}
								<div className={names("task", task.ur && "ur", task.im && "im")}>
									{
										!task.ur && !task.im  // <-- task.ur === task.im && task.ur === false
											? (
												<div className='o1 o2'>
													<s>{task.text} </s>
													<div> <i>{task.o1} </i></div>
												</div>
											)
											: <div className='o1'> {task.text} </div>
									}
									{/* 
									{task.ur == task.im && task.ur == false ? <div className='o1 o2'><s>{task.text}</s>
									<div><i>{task.o1}</i></div></div> : <div className='o1'>{task.text}</div>} 
								*/}
								</div>
								<Buttons task={task}
									handleCheck={this.handleCheck}
									handleDelete={this.handleDelete}
								/>
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
		);
	}
}

// const todo = [['task1', false, true], ['task2', true, true], ['task3', false, true]]
const todo = [{ 'text': 'task1', 'im': false, 'ur': true },
{ 'text': 'task2', 'im': true, 'ur': true },
{ 'text': 'task3', 'im': false, 'ur': true }];
const reasonList = ['Are you sure that you have so much time?', 'Life is too short for this.', 'Do you have no other things to spend your life on them?', 'If I were you, I\'d rather play games.', 'How about watching the new sitcom instead?', 'Can it is better just to sleep?', 'This is not the best idea.', 'You\'re already pretty busy.']

// render выполняется только один раз на корневом элементе (./index.js)
// ReactDOM.render(
// 	<ToDoList tasks={todo} />,
// 	document.getElementById('root')
// )

export default ToDoList;

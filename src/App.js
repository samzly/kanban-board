import React from "react";
import './App.css';
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import List from "./List/List";
import AddItem from "./AddForms/AddItem";
import MoveItem from "./AddForms/MoveItem";
import Task from "./Task/Task";
import {Routes, Route} from "react-router-dom";
import { disableBodyScroll } from 'body-scroll-lock';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            backlog: [],
            ready: [],
            progress: [],
            finished: [],
            count: 0,
        }
        this.addDescription = this.addDescription.bind(this)
    }

//                                                                                             добавляет новый элемент в backlog

    addItem = (id, name, count) => {
        this.setState(state => (
            {backlog: [...state.backlog, {id: id, name: name, description: ''}], count: count}
        ));
        count++
    }

    //                                                                                             добавляет описание

    addDescription = (stage, id, description) => {
        this.setState(state => (
            {[stage]: state[stage].map(task => task.id == id ? {...task, description: description} : task)}
        ))
    }

//                                                                                             перемещает элемент в следующий список и удаляет из старого

    moveItem = (prevStage, currStage, id, i) => {
        const el = this.state[prevStage][i];
        this.setState(state => (
            {[currStage]: [...state[currStage], {id: el.id, name: el.name, description: el.description}]}));
        this.setState(state => ({[prevStage]: state[prevStage].filter(task => task.id !== id)}));
    }

//                                                                                                   работа с localStorage

    setLocalStorage = (value) => {
        localStorage.setItem('State', JSON.stringify(value));
    };

//                                                                                                      lifecycles

    componentDidMount() {
        this.setState(JSON.parse(localStorage.getItem('State')));
        disableBodyScroll(document.querySelector('.App'));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.setLocalStorage(this.state);
    }

    render() {
        return (
            <div className='App'>
                <Header />
                <main className='main'>
                    <div className='stage'>
                        <h1>Backlog</h1>
                        <div className='stage__content'>
                            <List tasks={this.state.backlog} path='backlog'/>
                            <AddItem addItem={this.addItem} count={this.state.count}/>
                        </div>
                    </div>
                    <div className='stage'>
                        <h1>Ready</h1>
                        <div className='stage__content'>
                            <List tasks={this.state.ready} path='ready' />
                            <MoveItem moveItem={this.moveItem} prevStage='backlog' currStage='ready' prevTasks={this.state.backlog}/>
                        </div>
                    </div>
                    <div className='stage'>
                        <h1>In Progress</h1>
                        <div className='stage__content'>
                            <List tasks={this.state.progress} path='progress'/>
                            <MoveItem moveItem={this.moveItem} prevStage='ready' currStage='progress' prevTasks={this.state.ready}/>
                        </div>
                    </div>
                    <div className='stage'>
                        <h1>Finished</h1>
                        <div className='stage__content'>
                            <List tasks={this.state.finished} path='finished'/>
                            <MoveItem moveItem={this.moveItem} prevStage='progress' currStage='finished' prevTasks={this.state.progress}/>
                        </div>
                    </div>
                        <Routes>
                            <Route path='/' element={null}/>
                            <Route path=':stage/:id' element={<Task addDescription={this.addDescription} tasks={this.state}/>} />
                        </Routes>
                </main>
                <Footer count={this.state.backlog.length} finished={this.state.finished.length} />
            </div>
        )
    }
}

export default App;
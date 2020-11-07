import React, { Component } from 'react'
import './css/style.css'
import axios from 'axios'

 class Template extends Component {
    state = {
        data:[],
        weather:[],
        main:{},
        sys:{},
        url:'',
        city:'',
        link:''
    }


    handleChange = (event) => {
        this.setState({
            city:event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&appid=f36cb4ea6488e901f8a7de7969c7f179`)
        .then(res => {
        this.setState({
            data:res.data,
            weather:res.data.weather,
            main:res.data.main,
            url:`http://openweathermap.org/img/w/${res.data.weather.map(i => i.icon)}.png`,
            sys:res.data.sys
        })})
        .catch(err => alert('please enter a valid city name'))


    }

    render() {
        return (
            <div>
                <nav className="navbar">
                    <h1>Live Weather</h1>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <input type="text" className="input" placeholder="city" onChange={this.handleChange}/>
                        <input type="submit" className="btn" value="Search"/>
                    </form>
                </nav>
                {(this.state.data.length!=0) ? <div className="box">
                    <div className="box-inner">
                    <h1 className="large">{this.state.data.name}, {this.state.sys.country}</h1>
                        <img className="img" src={this.state.url} alt=''/>
                        <h1 className="x-large">{this.state.main.temp } °C</h1>
                        <h1 className="lead">Max: {this.state.main.temp_max } °C</h1>
                        <h1 className="lead">Min: {this.state.main.temp_min } °C</h1>
                        <h2 className="lead">{this.state.weather.map(i => i.main)}</h2>
                        <h2 className="lead">{this.state.weather.map(i => i.description)}</h2>
                    </div>
                </div> : <h2 className="large" style={{paddingTop:"15rem", paddingLeft:"22rem"}}>welcome! to live weather</h2>}
            </div>
        )
    }
}

export default Template

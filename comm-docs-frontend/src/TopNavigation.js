import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function NavLink(props){

	return( <li className = "nav-item"><Link className = "nav-link px-2 text-dark" to = {props.link}>{props.name}</Link></li>);
}


function TopNavigation(props){

	return(
		<Router>

		<nav className = "navbar navbar-expand-sm pt-1 navbar-light bg-light">
			<a className = "navbar-brand" href = "#">Gabozon</a>

			<ul className = "navbar-nav ml-auto">
				<NavLink name = "Log in" link ="/log-in" />
				<NavLink name = "Sign In" link ="/sign-in" />
			</ul>

		</nav>

		<Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/log-in">
            <LogIn />
          </Route>
          <Route path="/sign-in">
            <SignIn />
          </Route>
    </Switch>

		</Router>
		);
}

function Home(){

	return <h1>This is home bitch</h1>;
}

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', name: ''};

    this.changePassword = this.changePassword.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changeName = this.changeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeName(event){
    this.setState({name: event.target.value});
  }

  changePassword(event) {
    this.setState({password: event.target.value});
  }

  changeEmail(event) {
    this.setState({email: event.target.value});
  }

  handleSubmit(event) {
    const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: this.state.email, password: this.state.password, name: this.state.name})};

    fetch('http://127.0.0.1:5235/sign-up', requestOptions);

    alert('it is done');
    event.preventDefault();
  }

  render() {
    return (

      <form onSubmit={this.handleSubmit} className = "p-3">

        <div className ="mb-3">

          <label className ="form-label">
            Username
            <input type="text" className="form-control" aria-describedby="textHelp" value={this.state.name} onChange={this.changeName} />
          </label>
          </div>

        <div className ="mb-3">

          <label className ="form-label">
            Email
            <input type="email" className="form-control" aria-describedby="emailHelp" value={this.state.email} onChange={this.changeEmail} />
          </label>
          <div id="emailHelp" className="form-text">We will never share your email with anyone else.</div>
          </div>

        <div className ="mb-3">

          <label className ="form-label">
            Password
            <input type="password" className="form-control" aria-describedby="passwordText" value={this.state.password} onChange={this.changePassword} />
          </label>
          <div id="passwordText" className="form-text">You password will be encrypted with argon2</div>
          </div>

        <input type="submit" className ="btn btn-primary" value="Submit" />


      </form>

    );
  }
}

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};

    this.changePassword = this.changePassword.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changePassword(event) {
    this.setState({password: event.target.value});
  }

  changeEmail(event) {
    this.setState({email: event.target.value});
  }

  handleSubmit(event) {
    const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: this.state.email, password: this.state.password})};

    fetch('http://127.0.0.1:5235/', requestOptions);

    alert('it is done');
    event.preventDefault();
      }

  render() {
    return (

      <form onSubmit={this.handleSubmit} className = "p-3">

        <div className ="mb-3">

        <label className ="form-label">
          Email
          <input type="email" className="form-control" aria-describedby="emailHelp" value={this.state.email} onChange={this.changeEmail} />
        </label>
        <div id="emailHelp" className="form-text">We will never share your email with anyone else.</div>
        </div>

        <div className ="mb-3">

        <label className ="form-label">
          Password
          <input type="password" className="form-control" aria-describedby="passwordText" value={this.state.password} onChange={this.changePassword} />
        </label>
        <div id="passwordText" className="form-text">You password will be encrypted with argon2</div>
        </div>

        <input type="submit" className ="btn btn-primary" value="Submit" />


      </form>

    );
  }
}

export default TopNavigation;

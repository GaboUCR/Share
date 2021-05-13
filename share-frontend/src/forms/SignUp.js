import React from "react";

class SignUp extends React.Component {
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
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify({email: this.state.email, password: this.state.password, name: this.state.name})};

    fetch('http://127.0.0.1:5000/sign-up', requestOptions).then(response => response.json())
    .then(data => console.log(data));
    alert("you are registered")
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className = "space-y-4">
        <div className ="">
          <label className ="" htmlFor="username">Username</label>
          <div>
            <input type="text" className="border" id="username" value={this.state.name} onChange={this.changeName} />
          </div>
        </div>

        <div className ="">
          <label className =""  htmlFor="email">Email</label>
          <div>
            <input type="email" className="border" id="email" value={this.state.email} onChange={this.changeEmail} />
          </div>
          <div>We will never share your email with anyone else.</div>
        </div>

        <div className ="">
          <label className ="" htmlFor="password">Password</label>
          <div>
            <input type="password" className="border" id="password" value={this.state.password} onChange={this.changePassword} />
          </div>
          <div>You password will be encrypted with argon2</div>
        </div>

        <input type="submit" className ="" value="Submit" />

      </form>
    );
  }
}

export default SignUp;

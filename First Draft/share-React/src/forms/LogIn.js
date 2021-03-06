import React from "react";

class LogIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {name: '', password: ''};

    this.changePassword = this.changePassword.bind(this);
    this.changeName = this.changeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changePassword(event) {
    this.setState({password: event.target.value});
  }

  changeName(event) {
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({user: this.state.name, password: this.state.password})};

    fetch('http://127.0.0.1:5000/log-in', requestOptions).then(response => response.json())
    .then((data) => {

      if (data.success === true){
        console.log(data.user_id)
        this.props.setId(data.user_id)
      }

      else if(data.error === 'wrong credential'){
        alert('user not found')
      }
  });
    event.preventDefault();
    // window.location.reload(false);
    }

  render() {
    return (
      <div className="grid justify-items-center">
        <form onSubmit={this.handleSubmit} className = "my-5 space-y-4">

          <div className ="">

            <label className ="" htmlFor="username">Username or email</label>
              <div>
              <input type="text" className="border" id="username" value={this.state.name} onChange={this.changeName} />
              </div>
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
      </div>

    );
  }
}
export default LogIn;

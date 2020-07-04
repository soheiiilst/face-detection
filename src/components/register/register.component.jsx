import React from 'react';
import FormInput from '../formInput/formInput.component';
import CustomButton from '../customButton/customButton.component';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: '',
    };
  }

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();

    try {
      await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state),
      })
        .then(response => response.json())
        .then(user => {
          if (user.id) {
            this.props.loadUser(user);
            this.props.onRouteChange('home');
          } else {
            alert('Please fill all input fields!');
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
        <main className='pa4 black-80'>
          <form className='measure' onSubmit={this.handleSubmit}>
            <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
              <legend className='f2 fw6 ph0 mh0'>Register</legend>
              <FormInput
                label='Name'
                type='text'
                name='name'
                id='name'
                value={this.state.name}
                handleChange={this.handleChange}
                required
              />
              <FormInput
                label='Email'
                type='email'
                name='email'
                id='email'
                value={this.state.email}
                handleChange={this.handleChange}
                required
              />
              <FormInput
                label='Password'
                type='password'
                name='password'
                id='password'
                value={this.state.password}
                handleChange={this.handleChange}
                required
              />
            </fieldset>
            <div className=''>
              <CustomButton type='submit'>Register</CustomButton>
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default Register;

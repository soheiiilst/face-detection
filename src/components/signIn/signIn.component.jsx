import React from 'react';
import FormInput from '../formInput/formInput.component';
import CustomButton from '../customButton/customButton.component';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();

    try {
      await fetch('https://scenic-dry-tortugas-00988.herokuapp.com/signin', {
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
            alert('username or password is incorrect!');
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
        <main className='pa4 black-80'>
          <form className='measure' onSubmit={this.handleSubmit}>
            <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
              <legend className='f2 fw6 ph0 mh0'>Sign In</legend>
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
              <CustomButton type='submit'>Sign in</CustomButton>
            </div>
            <div className='lh-copy mt3'>
              <p
                onClick={() => onRouteChange('register')}
                className='f6 link dim black db pointer'
              >
                Register
              </p>
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default SignIn;

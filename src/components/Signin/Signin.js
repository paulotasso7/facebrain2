import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      checkedRecaptcha: false,
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = () => {
    fetch("https://blooming-anchorage-07854.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        } else {
          alert("Dados incorretos");
        }
      });
  };

  onRecaptchaChange = () => {
    this.setState({ checkedRecaptcha: true });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 br3 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={this.onEmailChange}
                  className="pa2 input-reset br2 ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={this.onPasswordChange}
                  className="b pa2 input-reset br2 ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div className="">
              <ReCAPTCHA
                style={{ marginTop: "-15px" }}
                sitekey="6Lc5fFUgAAAAAOhWhbI9g-wg5P8h89z02ckXScIG"
                onChange={this.onRecaptchaChange}
              />
              <input
                onClick={() => {
                  if (!this.state.checkedRecaptcha)
                    return alert("Please, check the recaptcha checkbox");
                  this.onSubmitSignIn();
                }}
                className=" mt3 b ph3 pv2 input-reset br2 ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange("register")}
                className="f6 link dim black  pointer db"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;

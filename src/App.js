import { useState } from 'react';
import './App.css';

function App() {
  const initialValues = {username: "", mailAdress: "", password: ""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [isSubmit, setSubmit] = useState(false);

  const handleChange = (e)  => {
      const {name, value} = e.target;
      setFormValues({...formValues, [name]: value});
      console.log(formValues);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setSubmit(true);
  }

  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    if(!values.username){
      errors.username = "ユーザー名を入力してください。";
    }

    if(!values.mailAdress){
      errors.mailAdress = "メールアドレスを入力してください。";
    } else if(!regex.test(values.mailAdress)){
      errors.mailAdress = "正しいメールアドレスを入力してください";
    }

    if(!values.password){
      errors.password = "パスワードを入力してください。";
    } else if(values.password.length < 4) {
      errors.password = "4文字以上15文字以下のパスワードを入力してください";
    } else if(values.password.length > 15) {
      errors.password = "4文字以上15文字以下のパスワードを入力してください";
    }

    return errors;
  }
  return (
    <div className="formContainer">
      <form onSubmit = {(e) => handleSubmit(e)}>
        <h1>ログインフォーム</h1>
        <hr/>
        <div className='uiForm'>

          <div className='formField'>
            <label>ユーザー名</label>
            <input type = 'text' 
            placeholder='ユーザー名' 
            name='username'
            onChange={(e) => handleChange(e)}
            />
          </div>
          <p className='errorMsg'>{formErrors.username}</p>

          <div className='formField'>
            <label>メールアドレス</label>
            <input type = 'text' 
            placeholder='メールアドレス' 
            name='mailAdress'
            onChange={(e) => handleChange(e)}
            />
          </div>
          <p className='errorMsg'>{formErrors.mailAdress}</p>

          <div className='formField'>
            <label>パスワード</label>
            <input type = 'text' 
            placeholder='パスワード' 
            name='password'
            onChange={(e) => handleChange(e)}
            />
          </div>
          <p className='errorMsg'>{formErrors.password}</p>
          <button className='submitButton'>ログイン</button>
          {Object.keys(formErrors).length === 0 && isSubmit && (
            <div className='AllowSubmit'>ログインに成功しました</div>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;

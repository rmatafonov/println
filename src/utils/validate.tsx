class Validation {
  public by(type: string, value: string) {
    if (type === 'login') {
      return this._login(value)
    }
    if (type === 'password') {
      return this._password(value)
    }
    if (type === 'email') {
      return this._email(value);
    }
    if (type === 'name' || type === 'lastName' || type === 'first_name' || type === 'second_name') {
      return this._name(value);
    }
    if (type === 'phone') {
      return this._phone(value);
    }
    return null;
  }

  private _login(value: string) {
    let result = this._general(value);
    if (!result) {
      result = this._validateLength(value, 3, 20);
    }
    return result;
  }

  private _password(value: string) {
    let result = this._general(value);
    if (!result) {
      result = this._validateLength(value, 8, 40);
    }
    return result;
  }

  private _email(value: string) {
    let result = this._general(value);
    if (!result) {
      const isValid = value.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
      if (!isValid) {
        result = 'Email должен быть формата "something@email.com"';
      }
    }
    return result;
  }

  private _name(value: string) {
    let result = this._general(value);
    if (!result) {
      const isInvalidLetters = /[^A-Za-z|А-Яа-я]+/g.test(value);
      if (isInvalidLetters) {
        result = 'Должны быть только буквы'
      }
    }
    return result
  }

  private _phone(value: string) {
    let result = this._general(value);
    if (!result) {
      const isValid = /^([+]|\d)([0-9])+$/.test(value);
      if (!isValid) {
        result = 'Должны быть только цифры'
      }
      if (!result) {
        result = this._validateLength(value, 10, 15);
      }
    }
    return result;
  }

  private _general(value: string) {
    if (!value.length) {
      return 'Поле не может быть пустым'
    }
    return null
  }

  private _validateLength(value: string, less: number, more: number) {
    if (value.length < less) {
      return `Количество символов должно быть больше ${less}`;
    }
    if (value.length > more) {
      return `Количество символов должно быть меньше ${more}`;
    }
    return null;
  }
}

export default Validation;

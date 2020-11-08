const Password = {
  verify(password) {
    if (password.length >= 8) {
      if (/[a-z]/.test(password)) {
        if (/[A-Z]/.test(password)) {
          if (/[0-9]/.test(password)) {
            if (/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(password)){
              return (true);
            } else
              return (false);
          } else
            return (false);
        } else
          return (false);
      } else
        return (false);
    }
    else
      return (false);
  }
}

export default Password;
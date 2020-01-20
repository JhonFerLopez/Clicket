//Metodo Enrutador
export function goToSection(context, component, props = {}, animationStyle = 'slideLeft', history = false) {

  console.log("ayudas");
  context.$navigateTo(component, {
    props,
    animated: true,
    clearHistory: history,
    transition: {
      name: animationStyle,
      duration: 300,
      curve: "easeIn"
    }
  });
}

//Metodo de autenticacion de Token
export function AuthAxiosToken(axios, context) {

  axios.defaults.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': context.$store.getters.getToken
  }

};

//Metodo para Cierre de Sesion y Token
export function LogOut(axios, context, route) {
  axios.post(`${context.$store.getters.getServerPath}/auth/logout`)
    .then( () => {
      context.$store.dispatch("logOut");
      goToSection(context, route, {}, "fade", true);
    })
    .catch(err => console.log(err))

};

//Metodo para verificacion de Objetos
export function isEmpty(obj) {
  for(var key in obj) {
    if(obj[key] == "") {
      return true
   }
  }
  return false;
}

export function excerpt(str) {
  return (str.substring(0,80) + '...')
}

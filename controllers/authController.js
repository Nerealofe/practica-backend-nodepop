import User from "../models/user.js";

// muestro formulario de login
export function loginPage(req, res) {
  res.render("login");
}

// procesamos loginAction
export async function loginAction(req, res) {
  // recogemos datos del formulario
  const { email, password } = req.body;
  // buscamos usuario por mail
  const user = await User.findOne({ email });
  // si no existe usuario error
  if (!user) {
    return res.send("Usuario no existe");
  }
  // si la contraseña no coinicde error
  if (user.password !== password) {
    return res.send("Contraseña incorrecta");
  }
  // si todo ok guardamos id usuario para saber quien esta logueado
  req.session.userId = user._id;
  res.redirect("/products");
}

// cerrar sesion usuario
export function logout(req, res) {
  req.session.destroy(() => {
    res.redirect("/login");
  });
}

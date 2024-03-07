import User from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";


//create user

export const register = async (req, res) => {
  const { name, email, password, lastName, location } = req.body;
  console.log(name, email, password, lastName, location);

  // Criptarea parolei
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Crearea utilizatorului cu parola criptată
  const user = await User.create({
    name,
    email,
    password: hashedPassword, // Salvăm parola criptată
    lastName,
    location,
  });
  res.status(StatusCodes.CREATED).json({ user });
}


// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Găsim utilizatorul cu adresa de email specificată
//     const user = await User.findOne({ email });

//     // Verificăm dacă utilizatorul a fost găsit
//     if (!user) {
//       return res.status(401).json({ msg: "User not found" });
//     }

//     // Comparam parola trimisă cu parola hash a utilizatorului
//     const isPasswordCorrect = await bcrypt.compare(password, user.password);

//     // Verificăm dacă parola este corectă
//     if (!isPasswordCorrect) {
//       return res.status(401).json({ msg: "Wrong password" });
//     }

//     // Răspunsul dacă autentificarea este reușită
//     res.status(StatusCodes.OK).json({ msg: "User logged in" });
//   } catch (error) {
//     // Tratarea erorilor interne
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ msg: "Internal server error" });
//   }
// };

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Găsim utilizatorul cu adresa de email specificată
    const user = await User.findOne({ email });

    // Verificăm dacă utilizatorul a fost găsit
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    // Comparam parola trimisă cu parola hash stocată în baza de date
    if (password !== user.password) {
      return res.status(401).json({ msg: "Wrong password" });
    }

    // Răspunsul dacă autentificarea este reușită
    res.status(StatusCodes.OK).json({ msg: "User logged in" });
  } catch (error) {
    // Tratarea erorilor interne
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};



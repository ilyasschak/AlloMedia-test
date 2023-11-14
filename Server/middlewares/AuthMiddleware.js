const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Role = require("../models/Role");

async function verifyLocalToken(req, res, next) {
  const accessToken = req.cookies["accessToken"];
  const refreshToken = req.cookies["refreshToken"];

  if (!accessToken && !refreshToken) {
    return res.status(401).json({ message: "Action denied" });
  }

  try {
    let user;

    if (accessToken) {
      try {
        user = jwt.verify(accessToken, process.env.JWT_SECRET);
      } catch (error) {
        console.log(error.message, "first");
        user = jwt.verify(refreshToken, process.env.JWT_REFRESH);
      }
    } else {
      user = jwt.verify(refreshToken, process.env.JWT_REFRESH);
    }

    const {
      id,
      email,
      full_name,
      phone_number,
      address,
      role,
      verified,
      approved,
    } = user;
    const newAccessToken = jwt.sign(
      { id, email, full_name, phone_number, address, role, verified, approved },
      process.env.JWT_SECRET,
      { expiresIn: 900 }
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    req.user = user;
    return next();
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ message: "Invalid access and refresh tokens" });
  }
}

async function verifyMailedToken(req, res, next) {
  let token = req.query.token;
  try {
    if (!token) return res.status(403).json({ message: "Action denied" });
    else {
      let data = jwt.verify(token, process.env.JWT_SECRET);
      if (!data)
        return res.status(403).json({ message: "Action denied (no token)" });
      req.user = data;
      return next();
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function isClient(req, res, next) {
  let user = req.user;
  let role = await Role.findById(user.role);
  if (role.name == "Client") return next();
  return res.status(403).send("forbidden");
}
async function isDeliveryMan(req, res, next) {
  let user = req.user;
  let role = await Role.findById(user.role);
  if (role.name == "DeliveryMan") return next();
  return res.status(403).send("forbidden");
}
async function isManager(req, res, next) {
  let user = req.user;
  let role = await Role.findById(user.role);
  if (role.name == "Manager") return next();
  return res.status(403).send("forbidden");
}

async function isLoggedOut(req, res, next) {
  if (req.cookies["accessToken"] || req.cookies["refreshToken"])
    return res
      .status(401)
      .json({ message: "Action denied, you are logged in" });
  return next();
}
module.exports = {
  verifyLocalToken,
  verifyMailedToken,
  isClient,
  isManager,
  isDeliveryMan,
  isLoggedOut,
};

// import jwt from "jsonwebtoken";

// const authenticate = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     const token = authHeader.split(" ")[1];
//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//       if (err) {
//         return res.sendStatus(403);
//       }
//       req.user = user;
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };

// export default authenticate;
import jwt from "jsonwebtoken";
import User from "../schema/auth.db.schema.js";

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.sendStatus(401);
    }

    req.user = user; // ✅ real MongoDB user with _id
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};

export default authenticate;

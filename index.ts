import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export function verifyUserToken(token: string) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  console.log(decoded);
  if (typeof decoded === "string") {
    return "Unauthorized: Invalid token structure";
  }
  return decoded;
}

verifyUserToken(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjg1MDBhMzRlNmE0ODU0MDg3ZTU2MmM5IiwidXm5hbWUiOiJoc2VsaXQiLCJlbWFpbCI6ImhzZWxpdEBnbWFpbC5jb20iLCJwaG9uZSI6IjkwMDM5MjkwMDIiLCJwYXNzd29yZCI6IiQyYiQxMCRWSGVaT1JSUmQ3YnpjNFhYbzZjQy5Pb0laZm93M2RWUzMuc1JqVXQucTk4bC5OckY3M2V5aSIsInJhdGluZyI6MCwiY3JlYXRlZEF0IjoiMjAyNS0wNi0xNlQxMjoxMjozNC44MzZaIiwiaWF0IjoxNzUwMTQ2MTY0fQ.7u7AcwIp4Sb6d7EN8AeVyTNb5oYKMc49NQt_4vj-r-c"
);

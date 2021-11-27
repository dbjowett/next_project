import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const data = JSON.parse(req.body);
    const newEmail = {
      email: data.input
    };

    const filePath = path.join(process.cwd(), 'data', 'emails.json');
    const emailData = fs.readFileSync(filePath);
    const dataArray = JSON.parse(emailData);
    dataArray.push(newEmail);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: 'Success' });
  } else {
    console.log('Please make a POST request to this endpoint');
  }
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    const data = JSON.parse(req.body);
    // const newComment = {
    //   email: data.input
    // };
    console.log(data);
  } else if (req.method === 'GET') {
    res.status(201).json({ Greeting: 'Hello' });
  } else {
    console.log('Please make a POST or GET request to this endpoint');
  }
}

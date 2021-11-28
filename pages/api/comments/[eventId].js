export default function handler(req, res) {
  const eventId = req.query.eventId;

  if (req.method === 'POST') {
    const { email, name, text } = req.body;
    //Validation
    if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
      res.status(422).json({ message: 'Invalid input' });
      return;
    }
    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text
    };
    console.log(newComment);
    res.status(201).json({ message: 'Success!', comment: newComment });
  } else if (req.method === 'GET') {
    const dummyComments = [
      { id: 'c1', name: 'Daniel', text: 'Wow this is gonna be cool' },
      { id: 'c2', name: 'Bill', text: 'Wow this is gonna be interesting' },
      { id: 'c3', name: 'Jean', text: 'Wow this is gonna be fantastic' }
    ];
    res.status(201).json({ comments: dummyComments });
  } else {
    console.log('Please make a POST or GET request to this endpoint');
  }
}

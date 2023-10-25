import sha1 from 'sha1';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) return res.status(400).send({ error: 'Missing email' });

    if (!password) return res.status(400).send({ error: 'Missing password' });

    const emailExists = await dbClient.usersCollection.findOne({ email });

    if (emailExists) return res.status(400).send({ error: 'Already exist' });
    const sha1Password = sha1(password);

    let userProfile;

    try {
      userProfile = await dbClient.usersCollection.insertOne({
        email,
        password: sha1Password,
      });
    } catch (error) {
      res.status(500).send({ error: 'error creating user' });
    }

    const user = { id: userProfile.insertedId, email };
    return res.status(201).send(user);
  }
}

export default UsersController;

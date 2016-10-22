export default async function render (req, res, next) {
  try {
    res.status(200).send('Hello World!!');
  } catch (e) {

  }
}
